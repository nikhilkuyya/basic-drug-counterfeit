const validate = require("aproba");
const { Contract, Context } = require("fabric-contract-api");
const { msp } = require("./constants");
const {
  ShipmentList,
  CompanyList,
  PurchaseOrderList,
  DrugList,
} = require("./lib/lists");
const Drug = require("./lib/models/drug");
const Shipment = require("./lib/models/shipment");

class ShipmentContext extends Context {
  constructor() {
    super();
    this.shipmentList = new ShipmentList(this);
    this.companyList = new CompanyList(this);
    this.drugList = new DrugList(this);
    this.purchaseOrderList = new PurchaseOrderList(this);
  }
}

class CreateShipmentContract extends Contract {
  constructor() {
    super("org.pharma-network.pharmanet.createShipmentContract");
  }

  createContext() {
    return new ShipmentContext();
  }

  async instantiate(ctx) {
    console.log("Create Shipment Contract Instantiated");
  }

  async createShipment(ctx, buyerCRN, drugName, assets, transporterCRN) {
    try {
      //#region  validation
      const listOfAssets = assets.split(",").map((d) => d.trim());
      validate("SSAS", [buyerCRN, drugName, listOfAssets, transporterCRN]);
      if (Array.isArray(listOfAssets) && listOfAssets.length <= 0) {
        throw new Error("invalid length of assets");
      }
      const mspID = ctx.clientIdentity.getMSPID();
      if (!(mspID === msp.manufacturer || mspID === msp.distributor)) {
        throw new Error("Not Valid Credentials");
      }
      const purchaseOrder = await ctx.purchaseOrderList.getPurchaseOrder(
        buyerCRN,
        drugName
      );
      const buyerCompany = await ctx.companyList.getCompanyByCRN(buyerCRN);
      const transporterCompany = await ctx.companyList.getCompanyByCRN(
        transporterCRN
      );

      if (!purchaseOrder || !buyerCompany || !transporterCompany) {
        throw new Error("invalid inputs");
      }
      if (purchaseOrder.buyer !== buyerCompany.getCompanyID()) {
        throw new Error("not authorized to purchase");
      }
      const drugs = await ctx.drugList.getDrugsByName(drugName);
      if (listOfAssets.length !== purchaseOrder.quantity) {
        throw new Error("invalid assets requests count");
      }
      let requstedDrugsStateList;
      if (drugs && Array.isArray(drugs)) {
        requstedDrugsStateList = drugs
          .filter((drug) => {
            return drug.owner === purchaseOrder.seller;
          })
          .filter((drug) => {
            const drugproductID = drug.getDrugProductID().trim();
            const splitCompKey = ctx.stub.splitCompositeKey(drugproductID);
            const drugPID =
              splitCompKey.objectType + splitCompKey.attributes.join("");

            const isRequested = listOfAssets.includes(drugPID);

            return isRequested;
          });
      } else {
        requstedDrugsStateList = [];
      }
      if (listOfAssets.length !== requstedDrugsStateList.length) {
        throw new Error("invalid assets requests");
      }
      //#endregion

      // #region Update Drug Status
      for (let it = 0; it < requstedDrugsStateList.length; it++) {
        const drugState = requstedDrugsStateList[it];
        const newDrugState = Drug.createInstance(
          drugState.getDrugName(),
          drugState.getSerialNumber(),
          drugState.getMfgDate(),
          drugState.getExpDate(),
          drugState.getManufacturer()
        );
        drugState.getShipment().forEach((shipmentID) => {
          newDrugState.updateShipment(shipmentID);
        });
        newDrugState.updateOwner(transporterCompany.getCompanyID());
        newDrugState.setDrugProductID(drugState.getDrugProductID());
        await ctx.drugList.updateDrug(newDrugState);
      }

      //#endregion

      //#region Shipment Creation
      const shipmentAssets = requstedDrugsStateList.map((drug) =>
        drug.getDrugProductID()
      );
      const shipment = Shipment.createInstance(
        buyerCRN,
        drugName,
        shipmentAssets,
        purchaseOrder.seller,
        transporterCompany.getCompanyID()
      );
      shipment.setShipmentID(
        ctx.shipmentList.getShipmentCompositeKey(shipment)
      );
      shipment.setTransitStatus();
      const entityShipment = await ctx.shipmentList.getShipment(
        buyerCRN,
        drugName
      );
      if (entityShipment !== null) {
        throw new Error("Already Shipment Exist");
      }

      await ctx.shipmentList.createShipment(shipment);
      //#endregion

      return shipment;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = CreateShipmentContract;
