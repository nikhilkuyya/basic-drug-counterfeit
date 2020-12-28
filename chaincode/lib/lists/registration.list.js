
const State = require("../../ledger-api/state");

class Registration extends State {

    constructor(obj) {
        super(this.getClass(), [obj.companyCRN, obj.companyName]);
        Object.assign(this, obj);
    }
    //TODO: Neeed to defined naming
    static getClass() {
        return "";
    }

}