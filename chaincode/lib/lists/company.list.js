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

    const companyList = await this.getStateByPartialCompositeKey(partialKey);
    if (companyList && Array.isArray(companyList) && companyList.length === 1) {
      return companyList[0];
    } else {
      return null;
    }
  }

  async getCompany(companyCRN, companyName) {
    const companyKey = Company.makeKey([companyCRN, companyName]);
    return await this.getState(companyKey);
  }

  async addCompany(company) {
    await this.addState(company);
  }
}

module.exports = CompanyList;
