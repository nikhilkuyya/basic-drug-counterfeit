const State = require("../../ledger-api/state");

class PurchaseOrder extends State {
  constructor(obj) {
    super(PurchaseOrder.getClass(), [obj.buyerCRN, obj.drugName]);
    Object.assign(this, obj);
  }
  setPurchaseOrderID(poID) {
    Object.assign(this, { poID: poID });
  }

  static getClass() {
    return "org.pharma-network.com.purchase-order";
  }

  static fromBuffer(buffer) {
    return PurchaseOrder.deserialize(buffer);
  }

  static deserialize(buffer) {
    return State.deserialize(buffer, PurchaseOrder);
  }

  static createInstance(
    buyerCRN,
    drugName,
    quantity,
    buyerCompositKey,
    sellerCompositeKey
  ) {
    return new PurchaseOrder({
      buyerCRN: buyerCRN,
      drugName: drugName,
      buyer: buyerCompositKey,
      seller: sellerCompositeKey,
      quantity: +quantity,
    });
  }
}

module.exports = PurchaseOrder;
