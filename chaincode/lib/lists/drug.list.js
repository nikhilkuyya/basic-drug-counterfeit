const StateList = require("../../ledger-api/statelist");
const Drug = require("../models/drug");

class DrugList extends StateList {
  constructor(ctx) {
    super(ctx, "org.pharma-network.com.drugList");
    this.use(Drug);
  }

  async getDrugsByName(drugName) {
    const partialKey = Drug.makeKey([drugName]);
    return await this.getStateByPartialCompositeKey(partialKey);
  }

  getDrugCompositeKey(drug) {
    return this.getCompositeKey(drug);
  }

  async getDrug(drugName, serialNo) {
    const drugKey = Drug.makeKey([drugName, serialNo]);
    return await this.getState(drugKey);
  }

  async addDrug(drug) {
    await this.addState(drug);
  }

  async updateDrug(drug) {
    await this.updateState(drug);
  }
}

module.exports = DrugList;
