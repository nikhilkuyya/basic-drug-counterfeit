const { Context, Contract } = require("fabric-contract-api");
const validate = require("aproba");
const Drug = require("./lib/models/drug");
const CompanyList = require("./lib/lists/company.list");
const DrugList = require("./lib/lists/drug.list");

class DrugContext extends Context {
  constructor() {
    super();
    this.companyList = new CompanyList(this);
    this.drugList = new DrugList(this);
  }
}

class DrugRegistrationContract extends Contract {
  constructor() {
    super("org.pharma-network.pharmanet.drugRegistrationContract");
  }

  createContext() {
    return new DrugContext();
  }

  async instantiate(ctx) {
    console.log("Instantiated the Durg Registration Context");
  }

  async registerDrug(ctx, drugName, serialNo, mfgDate, expDate, companyCRN) {
    validate("SSSSS", [drugName, serialNo, mfgDate, expDate, companyCRN]);
    const clientMSPID = ctx.clientIdentity.getMSPID();
    if (clientMSPID !== "manufacturerMSP") {
      throw new Error("not Authorized");
    }
    const companyData = await ctx.companyList.getCompanyByCRN(companyCRN);
    if (companyData === null) {
      throw new Error("company is not registered");
    }
    console.log("company Data", companyData);
    const drug = await ctx.drugList.getDrug(drugName, serialNo);
    if (drug !== null) {
      throw new Error("Already Manufactured with same data");
    }
    const drugPayLoad = Drug.createInstance(
      drugName,
      serialNo,
      mfgDate,
      expDate,
      companyData.getCompanyID()
    );
    drugPayLoad.setDrugProductID(ctx.drugList.getDrugCompositeKey(drugPayLoad));
    await ctx.drugList.addDrug(drugPayLoad);
    return drugPayLoad;
  }

  async getDrugs(ctx, drugName) {
    validate("S", [drugName]);
    return await ctx.drugList.getDrugsByName(drugName);
  }
}

module.exports = DrugRegistrationContract;
