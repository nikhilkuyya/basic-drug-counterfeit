"use strict";

/**
 * This is a Node.JS application to add a new student on the network.
 */

const {
  getRetailDrugContractInstance,
  disconnect,
} = require("../contractHelper");

const constants = require("../constants");
async function createRetailSale(
  drugName,
  serialNo,
  retailerCRN,
  customerAadhar
) {
  try {
    const PurchaseOrderContract = await getRetailDrugContractInstance(
      constants.retailer.walletPath,
      constants.retailer.fabricUserName,
      constants.retailer.connectionProfilePath
    );
    console.log("inputs", drugName, serialNo, retailerCRN, customerAadhar);

    const retailSaleBuffer = await PurchaseOrderContract.submitTransaction(
      constants.entitySC.purchaseOrder.retailDrug,
      drugName,
      serialNo,
      retailerCRN,
      customerAadhar
    );
    console.log(".... Processing Retail Sale \n\n ");
    let retailSale = JSON.parse(retailSaleBuffer.toString());
    console.log(retailSale);
    console.log("\n\n ...Register new Retail Sale Complete! ");
    return retailSale;
  } catch (error) {
    console.log(`\n\n ${error} \n\n`);
    throw new Error(error);
  } finally {
    // Disconnect from the fabric gateway
    console.log(".....Disconnecting from Fabric Gateway");
    disconnect();
  }
}

module.exports.execute = createRetailSale;
