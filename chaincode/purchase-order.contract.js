const { Context, Contract } = require("fabric-contract-api");
const validate = require("aproba");
const constants = require("./constants");
const CompanyList = require("./lib/lists/company.list");
const PurchaseOrderList = require("./lib/lists/purchase-order.list");
const Company = require("./lib/models/company");
const PurchaseOrder = require("./lib/models/purchase-order");

/**
 * A Purchase Order Context provides easy way to access the entities
 */
class PurchaseOrderContext extends Context {
  constructor() {
    super();
    this.companyList = new CompanyList(this);
    this.purchaseOrderList = new PurchaseOrderList(this);
  }
}

class PurchaseOrderContract extends Contract {
  constructor() {
    super("org.pharma-network.pharmanet.purchaseOrderContract");
  }

  createContext() {
    return new PurchaseOrderContext();
  }

  async instantiate(ctx) {
    console.log("Instantiated the Purchase Order Contract");
  }

  async createPurchaseOrder(ctx, buyerCRN, sellerCRN, drugName, quantity) {
    validate("SSSS", [buyerCRN, sellerCRN, drugName, quantity]);
    if (Number.isNaN(+quantity)) {
      throw new Error("invalid qunatity inputs");
    }
    const mspID = ctx.clientIdentity.getMSPID();
    if (
      !(mspID === constants.msp.distributor || mspID === constants.msp.retailer)
    ) {
      throw new Error("Not Authorized organization");
    }
    const buyerCompany = await ctx.companyList.getCompanyByCRN(buyerCRN);
    const sellerCompany = await ctx.companyList.getCompanyByCRN(sellerCRN);
    if (!buyerCompany || !sellerCompany) {
      throw new Error("Invalid Company CRN Data");
    }

    if (
      Company.compareHiearchy(
        buyerCompany.getHiearchy(),
        sellerCompany.getHiearchy()
      ) !== 1
    ) {
      throw new Error("Invalid Hiearchy");
    }

    const purchaseOrder = PurchaseOrder.createInstance(
      buyerCRN,
      drugName,
      quantity,
      buyerCompany.getCompanyID(),
      sellerCompany.getCompanyID()
    );
    purchaseOrder.setPurchaseOrderID(
      ctx.purchaseOrderList.getPOCompositeKey(purchaseOrder)
    );

    await ctx.purchaseOrderList.createPurchaseOrder(purchaseOrder);
    return purchaseOrder;
  }

  async getPurchaseOrder(ctx, buyerCRN, drugName) {
    validate("SS", [buyerCRN, drugName]);
    return await ctx.purchaseOrderList.getPurchaseOrder(buyerCRN, drugName);
  }
}

module.exports = PurchaseOrderContract;
