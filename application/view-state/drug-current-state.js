const {
  disconnect,
  getDrugRegistrationContractInstance,
} = require("../contractHelper");

const constants = require("../constants");

async function viewDrugCurrentState(drugName, serialNo) {
  try {
    const registrationDrugContract = await getDrugRegistrationContractInstance(
      constants.manufacturer.walletPath,
      constants.manufacturer.fabricUserName,
      constants.manufacturer.connectionProfilePath
    );
    console.log("... Viewing Drug Current State");
    const drugStateBuffer = await registrationDrugContract.submitTransaction(
      constants.entitySC.getDrug,
      drugName,
      serialNo
    );
    console.log(".... Fetching Drug Current State \n\n ");
    let currentState = JSON.parse(drugStateBuffer.toString());
    console.log("\n\n ...Fetching Drug State! ");
    return currentState;
  } catch (e) {
    console.log(`\n\n ${e} \n\n`);
    throw new Error(e);
  } finally {
    console.log(".... Disconnecting the Fabric GateWay");
    disconnect();
  }
}

module.exports.execute = viewDrugCurrentState;
