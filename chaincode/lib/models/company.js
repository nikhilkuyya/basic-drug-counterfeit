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

  static compareHiearchy(companyAHiearchy, companyBHiearchy) {
    if (
      Object.values(HIERARCHYKEY).includes(companyAHiearchy) &&
      Object.values(HIERARCHYKEY).includes(companyBHiearchy)
    ) {
      return companyAHiearchy - companyBHiearchy;
    } else {
      return -1;
    }
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

  getHiearchy() {
    return this.hierarchyKey;
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }
}

module.exports = Company;
