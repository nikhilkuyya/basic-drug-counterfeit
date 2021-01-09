const { Context, Contract } = require("fabric-contract-api");
const { msp } = require("./constants");
const { CompanyList, DrugList } = require("./lib/lists");
const Drug = require("./lib/models/drug");

class RetailDrugContext extends Context {
  constructor() {
    super();
    this.companyList = new CompanyList(this);
    this.drugList = new DrugList(this);
  }
}

class RetailDrugContract extends Contract {
  constructor() {
    super("org.pharma-network.pharmanet.retailDrugContract");
  }

  createContext() {
    return new RetailDrugContext();
  }

  async instantiate(ctx) {
    console.log("Retail Drug Contract Instantiated");
  }

  async retailDrug(ctx, drugName, serialNo, reatilCRN, customerAadhar) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID !== msp.retailer) {
      throw new Error("Not Authorized");
    }
    const retailer = await ctx.companyList.getCompanyByCRN(reatilCRN);
    if (retailer === null) {
      throw new Error("not the Valid Retailer");
    }
    const drugDetails = await ctx.drugList.getDrug(drugName, serialNo);
    if (drugDetails === null) {
      throw new Error("not a vaild Drug Sale");
    }
    if (drugDetails.getOwner() !== retailer.getCompanyID()) {
      throw new Error("not valid Sale from retailer");
    }
    console.log("drugState", drugDetails);
    const newDrugState = Drug.createInstance(
      drugDetails.getDrugName(),
      drugDetails.getSerialNumber(),
      drugDetails.getMfgDate(),
      drugDetails.getExpDate(),
      drugDetails.getManufacturer()
    );
    newDrugState.setDrugProductID(drugDetails.getDrugProductID());
    drugDetails.getShipment().forEach((shipmentID) => {
      newDrugState.updateShipment(shipmentID);
    });
    newDrugState.updateOwner(customerAadhar);
    console.log("update Drug State", newDrugState);
    await ctx.drugList.updateDrug(newDrugState);
  }
}

module.exports = RetailDrugContract;
