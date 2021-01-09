"use strict";

/**
 * This is a Node.JS application to add a new student on the network.
 */

const {
  getUpdateShipmentContractInstance,
  disconnect,
} = require("../contractHelper");

const { update } = require("./service");
const constants = require("../constants");

async function updateShipment(
  buryerCRN,
  drugName,
  listOfAssets,
  transporterCRN
) {
  try {
    const updateShipmentContract = await getUpdateShipmentContractInstance(
      constants.transporter.walletPath,
      constants.transporter.fabricUserName,
      constants.transporter.connectionProfilePath
    );
    return await update(
      updateShipmentContract,
      buryerCRN,
      drugName,
      transporterCRN
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

module.exports.execute = updateShipment;
