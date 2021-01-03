const State = require("../../ledger-api/state");

const HIERARCHYKEY = {
  Manufacturer: 1,
  Distributor: 2,
  Retailer: 3,
};

class Company extends State {
  constructor(obj) {
    super(Company.getClass(), [obj.companyCRN, obj.companyName]);
    Object.assign(this, obj);
  }

  static getClass() {
    return "org.pharma-network.com.company";
  }

  static fromBuffer(buffer) {
    return Company.deserialize(buffer);
  }

  static deserialize(buffer) {
    return State.deserialize(buffer, Company);
  }

  static createInstance(companyCRN, companyName, location, organizationRole) {
    return new Company({
      companyCRN: companyCRN,
      companyName: companyName,
      location: location,
      organizationRole: organizationRole,
    });
  }

  setHiearchy() {
    const organizationRole = this.organizationRole;
    let hierarchyKey;
    switch (organizationRole) {
    case "Manufacturer":
      hierarchyKey = HIERARCHYKEY.Manufacturer;
      break;
    case "Distributor":
      hierarchyKey = HIERARCHYKEY.Distributor;
      break;
    case "Retailer":
      hierarchyKey = HIERARCHYKEY.Retailer;
      break;
    default:
      hierarchyKey = undefined;
      break;
    }
    Object.assign(this, { hierarchyKey });
  }

  setCompanyID(companyID) {
    Object.assign(this, { companyID });
  }

  getCompanyID() {
    return this.companyID;
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }
}

module.exports = Company;
