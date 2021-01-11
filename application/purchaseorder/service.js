const constants = require("../constants");

async function createPO(
  PurchaseOrderContract,
  buyerCRN,
  sellerCRN,
  drugName,
  quantity
) {
  const poBuffer = await PurchaseOrderContract.submitTransaction(
    constants.entitySC.purchaseOrder.createPO,
    buyerCRN,
    sellerCRN,
    drugName,
    quantity
  );
  console.log(".... Processing Create Purchase Order \n\n ");
  let po = JSON.parse(poBuffer.toString());
  console.log("\n\n ...Register new Purchase Order Complete! ");
  return po;
}

module.exports = createPO;
