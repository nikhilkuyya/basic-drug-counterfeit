const { Context, Contract } = require("fabric-contract-api");
const validate = require("aproba");
const constants = require("./constants");
const CompanyList = require("./lib/lists/company.list");
const Company = require("./lib/models/company");
/**
 * A Entity Registration Context provides easy way to access the entities
 */
class EntityContext extends Context {
  constructor() {
    super();
    this.companyList = new CompanyList(this);
  }
}

class EntityRegistrationContract extends Contract {
  constructor() {
    super("org.pharma-network.pharmanet.entityRegistrationContract");
  }

  /**
   * Defines the Context for this Entity Registration.
   */
  createContext() {
    return new EntityContext();
  }

  async instantiate(ctx) {
    console.log(" Instantiated the Entity Registration Contract");
  }

  async registerCompany(
    ctx,
    companyCRN,
    companyName,
    location,
    organizationRole
  ) {
    /**Validation and seting the object */
    validate("SSSS", [companyCRN, companyName, location, organizationRole]);
    if (
      !this._validateOrganizationRole(
        organizationRole,
        ctx.clientIdentity.getMSPID()
      )
    ) {
      throw new Error("Invalid Access");
    }
    const companyWorldState = await ctx.companyList.getCompanyByCRN(companyCRN);
    console.log("current World state", companyWorldState);
    if (companyWorldState !== null) {
      throw new Error("Already Exists");
    }

    const company = Company.createInstance(
      companyCRN,
      companyName,
      location,
      organizationRole
    );
    company.setCompanyID(
      ctx.companyList.getCompanyRegistrationCompositeKey(company)
    );
    company.setHiearchy();
    await ctx.companyList.addCompany(company);
    return company;
  }

  async getCompany(ctx, companyCRN, companyName) {
    validate("SS", [companyCRN, companyName]);
    return await ctx.companyList.getCompany(companyCRN, companyName);
  }

  _validateOrganizationRole(organizationRole, mspID) {
    let isValid = false;
    if (organizationRole) {
      switch (mspID) {
      case constants.msp.manufacturer:
        isValid = organizationRole === "Manufacturer";
        break;
      case constants.msp.retailer:
        isValid = organizationRole === "Retailer";
        break;
      case constants.msp.transporter:
        isValid = organizationRole === "Transporter";
        break;
      case constants.msp.distributor:
        isValid = organizationRole === "Distributor";
        break;
      default:
        isValid = false;
        break;
      }
    }
    return isValid;
  }
}

module.exports = EntityRegistrationContract;
