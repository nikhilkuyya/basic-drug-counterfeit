"use strict";

/**
 * This is a Node.JS application to add a new student on the network.
 */

const {
  getRegistrationContractInstance,
  disconnect,
} = require("../contractHelper");

const { registerCompany } = require("./registration.service");

const manufacturerWalletPath = "./identities/transporter";

const constants = require("../constants");

async function registerTransporterCompany(
  companyCRN,
  companyName,
  location,
  organizationRole
) {
  try {
    const registrationCompanyContract = await getRegistrationContractInstance(
      constants.transporter.walletPath,
      constants.transporter.fabricUserName,
      constants.transporter.connectionProfilePath
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

module.exports.execute = registerTransporterCompany;
