const StateList = require("../../ledger-api/statelist");
const PurchaseOrder = require("../models/purchase-order");

class PurchaseOrderList extends StateList {
  constructor(ctx) {
    super(ctx, "org.pharma-network.com.purchaseOrderList");
    this.use(PurchaseOrder);
  }

  getPOCompositeKey(purchaseOrder) {
    return this.getCompositeKey(purchaseOrder);
  }

  async getPurchaseOrder(buyerCRN, drugName) {
    const purchaseOrderKey = PurchaseOrder.makeKey([buyerCRN, drugName]);
    return await this.getState(purchaseOrderKey);
  }

  async createPurchaseOrder(purchaseOrder) {
    await this.addState(purchaseOrder);
  }
}
module.exports = PurchaseOrderList;
