const manufacturerRegister = require("./manufacturer");
const distributorRegistration = require("./distributor");
const reatilerRegistration = require("./retailer");
const transporterRegistration = require("./transporter");
const company = require("./company");
const drugRegistration = require("./drug");
const drugs = require("./drugs");

module.exports.company = company;
module.exports.manufacturerRegister = manufacturerRegister;
module.exports.distributorRegistration = distributorRegistration;
module.exports.reatilerRegistration = reatilerRegistration;
module.exports.transporterRegistration = transporterRegistration;
module.exports.drugRegistration = drugRegistration;
module.exports.drugs = drugs;
