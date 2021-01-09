const constants = require("../constants");

async function createShipment(
  ShipmentContract,
  buyerCRN,
  drugName,
  listOfAssets,
  transporterCRN
) {
  const shipmentBuffer = await ShipmentContract.submitTransaction(
    constants.entitySC.shipment.createShipment,
    buyerCRN,
    drugName,
    listOfAssets,
    transporterCRN
  );
  console.log(".... Processing Create Shipment \n\n ");
  let shipment = JSON.parse(shipmentBuffer.toString());
  console.log(shipment);
  console.log("\n\n ...Register new Shipment Complete! ");
  return shipment;
}

async function updateShipment(
  ShipmentContract,
  buyerCRN,
  drugName,
  transporterCRN
) {
  const shipmentBuffer = await ShipmentContract.submitTransaction(
    constants.entitySC.shipment.updateShipment,
    buyerCRN,
    drugName,
    transporterCRN
  );
  console.log(".... Processing Update Shipment \n\n ");
  let shipment = JSON.parse(shipmentBuffer.toString());
  console.log(shipment);
  console.log("\n\n ...Update Shipment Complete! ");
  return shipment;
}

module.exports.create = createShipment;
module.exports.update = updateShipment;
