const { Context, Contract } = require("fabric-contract-api");
const CompanyList = require("./lib/lists/company.list");
const validate = require("aproba");
const Company = require("./lib/models/company");
/**
 * A Entity Registration Context provides easy way to access the entities
 */
class EntityRegistrationContext extends Context {
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
    return new EntityRegistrationContext();
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
      this._validateOrganizationRole(
        organizationRole,
        ctx.clientIdentity.getMSPID()
      )
    ) {
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
      const companyWorldState = await ctx.companyList.getCompany(
        company.getKey()
      );
      if (companyWorldState === null) {
        await ctx.companyList.addCompany(company);
        return company;
      } else {
        throw new Error("Already Existing Company");
      }
    } else {
      throw new Error("Invalid Access");
    }
  }

  async getCompany(ctx, companyCRN, companyName) {
    validate("SS", [companyCRN, companyName]);
    return await ctx.companyList.getCompany(
      Company.makeKey([companyCRN, companyName])
    );
  }

  _validateOrganizationRole(organizationRole, mspID) {
    let isValid = false;
    if (organizationRole) {
      switch (mspID) {
        case "manufacturerMSP":
          isValid = organizationRole === "Manufacturer";
          break;
        case "retailerMSP":
          isValid = organizationRole === "Retailer";
          break;
        case "transporterMSP":
          isValid = organizationRole === "Transporter";
          break;
        case "distributorMSP":
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
