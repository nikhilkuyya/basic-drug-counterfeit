const { Context, Contract } = require("fabric-contract-api");
const CompnayRegistrationList = require("./lib/lists/company-registration.list");

/**
 * A Entity Registration Context provides easy way to access the entities
 */
class EntityRegistrationContext extends Context {
  constructor() {
    super();
    this.companyRegistrationList = new CompnayRegistrationList(this);
  }
}

class EntityRegistrationContract extends Contract {
  constructor() {
    super("org.pharma-network.com.entityRegistrationContract");
  }

  /**
   * Defines the Context for this Entity Registration.
   */
  createContext() {
    return new EntityRegistrationContext();
  }

  async instantiate(cxt) {
    console.log(" Instantiated the Entity Registration Contract");
  }
}

module.exports = EntityRegistrationContract;
