const StateList = require("../../ledger-api/statelist");
const Company = require("../models/company");

class CompanyList extends StateList {
  constructor(ctx) {
    super(ctx, "org.pharma-network.com.companyList");
    this.use(Company);
  }

  getCompanyRegistrationCompositeKey(company) {
    return this.getCompositeKey(company);
  }

  async getCompanyByCRN(companyCRN) {
    const partialKey = Company.makeKey([companyCRN]);
    console.log(partialKey);

    const list = this.getStateByPartialCompositeKey(partialKey);

    return list;
  }

  async getCompany(companyCRN, companyName) {
    const companyKey = Company.makeKey([companyCRN, companyName]);
    return this.getState(companyKey);
  }

  async addCompany(company) {
    this.addState(company);
  }
}

module.exports = CompanyList;
