const StateList = require("../../ledger-api/statelist");
const Drug = require("../models/drug");

class DrugList extends StateList {
  constructor(ctx) {
    super(ctx, "org.pharma-network.com.drugList");
    this.use(Drug);
  }

  getDrugPartialKey(drugName) {
    return this.getPartialCompositeKey(drugName);
  }

  getDrugCompositeKey(drug) {
    return this.getCompositeKey(drug);
  }

  async getDrug(drugName, serialNo) {
    const drugKey = Drug.makeKey([drugName, serialNo]);
    return this.getState(drugKey);
  }

  async addDrug(drug) {
    this.addState(drug);
  }
}

module.exports = DrugList;
