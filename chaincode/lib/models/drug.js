const State = require("../../ledger-api/state");

class Drug extends State {
  constructor(obj) {
    super(Drug.getClass(), [obj.name, obj.serialNo]);
    Object.assign(this, obj);
  }

  static getClass() {
    return "org.pharma-network.com.drug";
  }

  static fromBuffer(buffer) {
    return Drug.deserialize(buffer);
  }

  static deserialize(buffer) {
    return State.deserialize(buffer, Drug);
  }

  static createInstance(drugName, serialNo, mfgDate, expDate, companyID) {
    return new Drug({
      name: drugName,
      serialNo: serialNo,
      manufacturingDate: mfgDate,
      expiryDate: expDate,
      shipment: [],
      manufacturer: companyID,
      owner: companyID,
    });
  }

  getOwner() {
    return this.owner;
  }

  getDrugName() {
    return this.name;
  }

  getMfgDate() {
    return this.manufacturingDate;
  }

  getExpDate() {
    return this.expiryDate;
  }

  getDrugProductID() {
    return this.productID;
  }

  getManufacturer() {
    return this.manufacturer;
  }

  getSerialNumber() {
    return this.serialNo;
  }

  setDrugProductID(productID) {
    Object.assign(this, { productID });
  }

  getShipment() {
    return this.shipment.map((shipmentId) => shipmentId);
  }

  updateShipment(shipmentID) {
    if (this.shipment && Array.isArray(this.shipment) && shipmentID) {
      this.shipment.push(shipmentID);
    }
  }

  updateOwner(companyID) {
    if (companyID) {
      this.owner = companyID;
    }
  }

  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }
}

module.exports = Drug;
