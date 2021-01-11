const { Context, Contract } = require("fabric-contract-api");
const { msp } = require("./constants");
const { CompanyList, DrugList, ShipmentList } = require("./lib/lists");
const Drug = require("./lib/models/drug");
const Shipment = require("./lib/models/shipment");

class ShipmentContext extends Context {
  constructor() {
    super();
    this.shipmentList = new ShipmentList(this);
    this.companyList = new CompanyList(this);
    this.drugList = new DrugList(this);
  }
}

class UpdateShipmentContract extends Contract {
  constructor() {
    super("org.pharma-network.pharmanet.updateShipmentContract");
  }
  createContext() {
    return new ShipmentContext();
  }
  async instantiate(ctx) {
    console.log("Instantiated the UpdateShipment Contract");
  }

  async updateShipment(ctx, buyerCRN, drugName, transporterCRN) {
    try {
      //#region  validation
      const mspID = ctx.clientIdentity.getMSPID();
      if (mspID !== msp.transporter) {
        throw new Error("Not Authorized");
      }
      const shipmentDetails = await ctx.shipmentList.getShipment(
        buyerCRN,
        drugName
      );
      if (shipmentDetails === null) {
        throw new Error("shipment doesn't exists to update");
      }

      const transporterDetails = await ctx.companyList.getCompanyByCRN(
        transporterCRN
      );
      const buyerDetails = await ctx.companyList.getCompanyByCRN(buyerCRN);
      if (transporterDetails === null || buyerDetails === null) {
        throw new Error("check companyCRN Details");
      }

      const assetsList = shipmentDetails.getAssets();

      const drugEntities = [];
      for (let it = 0; it < assetsList.length; it++) {
        const drugCompositeKey = assetsList[it];
        const drugState = await ctx.drugList.getDrugByCompositeKey(
          drugCompositeKey
        );
        if (drugState.getOwner() === transporterDetails.getCompanyID()) {
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
          newDrugState.updateShipment(shipmentDetails.getShipmentID());
          newDrugState.updateOwner(buyerDetails.getCompanyID());
          newDrugState.setDrugProductID(drugState.getDrugProductID());
          drugEntities.push(newDrugState);
        }
      }

      if (assetsList.length !== drugEntities.length) {
        throw new Error("Missing Drug Assests");
      }
      //#endregion

      //#region drug update
      for (let it = 0; it < drugEntities.length; it++) {
        const newDrugState = drugEntities[it];
        await ctx.drugList.updateDrug(newDrugState);
      }
      //#endregion

      //#region update Shipment
      const updateShipment = Shipment.createInstance(
        buyerCRN,
        drugName,
        shipmentDetails.getAssets(),
        shipmentDetails.getInitiator(),
        shipmentDetails.getTransporter()
      );
      updateShipment.setShipmentID(shipmentDetails.getShipmentID());
      updateShipment.setDeliveredStatus();
      await ctx.shipmentList.updateShipment(updateShipment);
      return updateShipment;
      //#endregion
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = UpdateShipmentContract;
