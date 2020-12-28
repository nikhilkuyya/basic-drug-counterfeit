const State = require("../../ledger-api/state");

const HIERARCHYKEY = {
  Manufacturer: 1,
  Distributor: 2,
  Retailer: 3,
};

class Registration extends State {
  constructor(obj) {
    super(Registration.getClass(), [obj.companyCRN, obj.companyName]);
    Object.assign(this, obj);
  }

  static getClass() {
    return "org.pharma-network.com.companyRegistration";
  }

  static fromBuffer(buffer) {
    return Registration.deserialize(buffer);
  }

  static deserialize(buffer) {
    return State.deserialize(buffer, Registration);
  }

  static createInstance(companyCRN, companyName, location, organizationRole) {
    return new Registration({
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

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }
}

module.exports = Registration;
