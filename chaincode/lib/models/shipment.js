const State = require("../../ledger-api/state");

class Shipment extends State {
  constructor(obj) {
    super(Shipment.getClass(), [obj.buyerCRN, obj.drugName]);
    Object.assign(this, obj);
  }

  setShipmentID(shipmentID) {
    Object.assign(this, { shipmentID: shipmentID });
  }

  getShipmentID() {
    return this.shipmentID;
  }

  setTransitStatus() {
    Object.assign(this, { status: "in-transit" });
  }

  setDeliveredStatus() {
    Object.assign(this, { status: "delivered" });
  }

  static getClass() {
    return "org.pharma-network.com.shipment";
  }

  static fromBuffer(buffer) {
    return Shipment.deserialize(buffer);
  }

  static deserialize(buffer) {
    return State.deserialize(buffer, Shipment);
  }

  static createInstance(
    buyerCRN,
    drugName,
    listOfAssets,
    createrCompositeKey,
    transporterCompositeKey
  ) {
    return new Shipment({
      buyerCRN: buyerCRN,
      drugName: drugName,
      assets: listOfAssets,
      creater: createrCompositeKey,
      transporter: transporterCompositeKey,
    });
  }
}

module.exports = Shipment;
