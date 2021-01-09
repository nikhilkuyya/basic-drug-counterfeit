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
      // console.log("assets Lists", listOfAssets);
      // console.log("assets inputs", assets);
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
      // console.log("drugs", drugs);
      // console.log("assets Lists", listOfAssets);
      // console.log(
      //   "first asset request",
      //   listOfAssets[0],
      //   listOfAssets[0].length
      // );
      if (drugs && Array.isArray(drugs)) {
        requstedDrugsStateList = drugs
          .filter((drug) => {
            console.log("drug Owner", drug.owner);
            console.log("purchaseOrder ", purchaseOrder.seller);
            return drug.owner === purchaseOrder.seller;
          })
          .filter((drug) => {
            const drugproductID = drug.getDrugProductID().trim();
            console.log("drug productId", drugproductID, drugproductID.length);
            const splitCompKey = ctx.stub.splitCompositeKey(drugproductID);
            const drugPID =
              splitCompKey.objectType + splitCompKey.attributes.join("");
            console.log("split CompKey", splitCompKey);
            console.log("drug productId", drugPID, drugPID.length);

            const isRequested = listOfAssets.includes(drugPID);
            console.log("res of includes", isRequested);
            return isRequested;
          });
      } else {
        requstedDrugsStateList = [];
      }
      console.log("registered drugs", requstedDrugsStateList);
      if (listOfAssets.length !== requstedDrugsStateList.length) {
        throw new Error("invalid assets requests");
      }
      //#endregion

      // #region Update Drug Status
      for (let it = 0; it < requstedDrugsStateList.length; it++) {
        const drugState = requstedDrugsStateList[it];
        console.log("drugState", drugState);
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
        console.log("new Drug State", newDrugState);
        await ctx.drugList.updateDrug(newDrugState);
      }

      //#endregion

      //#region Shipment Creation

      const shipment = Shipment.createInstance(
        buyerCRN,
        drugName,
        listOfAssets,
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
