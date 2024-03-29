module.exports = {
  manufacturer: {
    walletPath: "./identities/manufacturer",
    fabricUserName: "MANUFACTURER_ADMIN",
    connectionProfilePath: "./connection-profiles/manufacturer.yaml",
    identityMSP: "manufacturerMSP",
  },
  distributor: {
    walletPath: "./identities/distributor",
    fabricUserName: "DISTRIBUTOR_ADMIN",
    connectionProfilePath: "./connection-profiles/distributor.yaml",
  },
  transporter: {
    walletPath: "./identities/transporter",
    fabricUserName: "TRANSPORTER_ADMIN",
    connectionProfilePath: "./connection-profiles/transporter.yaml",
  },
  retailer: {
    walletPath: "./identities/retailer",
    fabricUserName: "RETAILER_ADMIN",
    connectionProfilePath: "./connection-profiles/retailer.yaml",
  },
  consumer: {
    walletPath: "./identities/consumer",
    fabricUserName: "CONSUMER_ADMIN",
    connectionProfilePath: "./connection-profiles/consumer.yaml",
  },
  entitySC: {
    purchaseOrder: {
      createPO: "createPurchaseOrder",
      fetchPO: "getPurchaseOrder",
      retailDrug: "retailDrug",
    },
    shipment: {
      createShipment: "createShipment",
      updateShipment: "updateShipment",
    },
    registerCompany: "registerCompany",
    getCompany: "getCompany",
    registerDrug: "registerDrug",
    getDrugs: "getDrugs",
    getDrug: "getDrug",
    viewDrugHistory: "viewDrugHistory",
  },
};
