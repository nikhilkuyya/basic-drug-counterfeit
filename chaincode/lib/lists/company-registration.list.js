const StateList = require("../../ledger-api/statelist");
const CompanyRegistration = require("../models/company-registration");

class CompnayRegistrationList extends StateList {
  constructor(ctx) {
    super(ctx, "org.pharma-network.com.companyRegistrationList");
    this.use(CompanyRegistration);
  }

  async getCompany(companyKey) {
    return this.getState(companyKey);
  }

  async addCompany(company) {
    return this.addState(company);
  }
}

module.exports = CompnayRegistrationList;
