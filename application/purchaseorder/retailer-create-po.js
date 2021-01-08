"use strict";

/**
 * This is a Node.JS application to add a new student on the network.
 */

const {
  getPurchaseOrderContractInstance,
  disconnect,
} = require("../contractHelper");

const constants = require("../constants");
const createPO = require("./service");
async function createPurchaseOrder(buyerCRN, sellerCRN, drugName, quantity) {
  try {
    const PurchaseOrderContract = await getPurchaseOrderContractInstance(
      constants.retailer.walletPath,
      constants.retailer.fabricUserName,
      constants.retailer.connectionProfilePath
    );
    return await createPO(
      PurchaseOrderContract,
      buyerCRN,
      sellerCRN,
      drugName,
      quantity
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

module.exports.execute = createPurchaseOrder;
