"use strict";

/**
 * This is a Node.JS application to add a new student on the network.
 */

const {
  getRegistrationContractInstance,
  disconnect,
} = require("../contractHelper");

const { registerCompany } = require("./registration.service");

const manufacturerWalletPath = "./identities/reatiler";

const constants = require("../constants");

async function registerRetailerCompany(
  companyCRN,
  companyName,
  location,
  organizationRole
) {
  try {
    const registrationCompanyContract = await getRegistrationContractInstance(
      constants.retailer.walletPath,
      constants.retailer.fabricUserName,
      constants.retailer.connectionProfilePath
    );
    return await registerCompany(
      registrationCompanyContract,
      companyCRN,
      companyName,
      location,
      organizationRole
    );
  } catch (error) {
    console.log(`\n\n ${error} \n\n`);
    throw new Error(error);
  } finally {
    // Disconnect from the fabric gateway
    console.log(".....Disconnecting from Fabric Gateway");
    disconnect();
  }
}

module.exports.execute = registerRetailerCompany;
