const DrugRegistrationContract = require("./drug-registration.contract");
const EntityRegistrationContract = require("./entity-registration.contract");
const PurchaseOrderContract = require("./purchase-order.contract");

module.exports.contracts = [
  EntityRegistrationContract,
  DrugRegistrationContract,
  PurchaseOrderContract,
];
