"use strict";

/**
 * This is a Node.JS application to add a new student on the network.
 */

const {
  getCreateShipmentContractInstance,
  disconnect,
} = require("../contractHelper");

const { create } = require("./service");
const constants = require("../constants");

async function createShipment(
  buryerCRN,
  drugName,
  listOfAssets,
  transporterCRN
) {
  try {
    const createShipmentContract = await getCreateShipmentContractInstance(
      constants.manufacturer.walletPath,
      constants.manufacturer.fabricUserName,
      constants.manufacturer.connectionProfilePath
    );
    return await create(
      createShipmentContract,
      buryerCRN,
      drugName,
      listOfAssets,
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

module.exports.execute = createShipment;
