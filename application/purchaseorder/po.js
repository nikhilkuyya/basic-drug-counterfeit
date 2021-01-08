const {
  disconnect,
  getPurchaseOrderContractInstance,
} = require("../contractHelper");

const constants = require("../constants");

async function fetchPO(buyerCRN, drugName) {
  try {
    const purchaseOrderContract = await getPurchaseOrderContractInstance(
      constants.manufacturer.walletPath,
      constants.manufacturer.fabricUserName,
      constants.manufacturer.connectionProfilePath
    );
    console.log("... Registering the Drug");
    const purchaseOrderBuffer = await purchaseOrderContract.submitTransaction(
      constants.entitySC.purchaseOrder.fetchPO,
      buyerCRN,
      drugName
    );
    console.log(".... Processing Drug Registration Transaction \n\n ");
    let purchaseOrder = JSON.parse(purchaseOrderBuffer.toString());
    console.log(purchaseOrder);
    console.log("\n\n ...Register new Drug Complete! ");
    return purchaseOrder;
  } catch (e) {
    console.log(`\n\n ${e} \n\n`);
    throw new Error(e);
  } finally {
    console.log(".... Disconnecting the Fabric GateWay");
    disconnect();
  }
}

module.exports.execute = fetchPO;
