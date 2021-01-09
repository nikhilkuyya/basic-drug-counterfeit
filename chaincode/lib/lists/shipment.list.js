const StateList = require("../../ledger-api/statelist");
const Shipment = require("../models/shipment");

class ShipmentList extends StateList {
  constructor(ctx) {
    super(ctx, "org.pharma-network.com.shipmentList");
    this.use(Shipment);
  }

  getShipmentCompositeKey(shipment) {
    return this.getCompositeKey(shipment);
  }

  async getShipment(buyerCRN, drugName) {
    const shipmentKey = Shipment.makeKey([buyerCRN, drugName]);
    return await this.getState(shipmentKey);
  }

  async createShipment(shipment) {
    await this.addState(shipment);
  }

  async updateShipment(shipment) {
    await this.updateShipment(shipment);
  }
}

module.exports = ShipmentList;
