const CreateShipmentContract = require("./create-shipment.contract");
const DrugRegistrationContract = require("./drug-registration.contract");
const EntityRegistrationContract = require("./entity-registration.contract");
const PurchaseOrderContract = require("./purchase-order.contract");
const RetailDrugContract = require("./retail-drug.contract");
const UpdateShipmentContract = require("./update-shipment.contract");

module.exports.contracts = [
  EntityRegistrationContract,
  DrugRegistrationContract,
  PurchaseOrderContract,
  CreateShipmentContract,
  UpdateShipmentContract,
  RetailDrugContract,
];
