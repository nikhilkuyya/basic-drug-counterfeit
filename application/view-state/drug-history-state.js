const {
  disconnect,
  getDrugRegistrationContractInstance,
} = require("../contractHelper");

const constants = require("../constants");

async function fetchDrugHistory(drugName, serialNo) {
  try {
    const registrationDrugContract = await getDrugRegistrationContractInstance(
      constants.manufacturer.walletPath,
      constants.manufacturer.fabricUserName,
      constants.manufacturer.connectionProfilePath
    );
    console.log("... Fetching Drug History...");
    const drugHistoryBuffer = await registrationDrugContract.submitTransaction(
      constants.entitySC.viewDrugHistory,
      drugName,
      serialNo
    );
    console.log(".... Processing Drug Transactions \n\n ");
    let drugHistories = JSON.parse(drugHistoryBuffer.toString());
    console.log(drugHistories);
    console.log("\n\n ... Fetching Drug State History! ");
    return drugHistories;
  } catch (e) {
    console.log(`\n\n ${e} \n\n`);
    throw new Error(e);
  } finally {
    console.log(".... Disconnecting the Fabric GateWay");
    disconnect();
  }
}

module.exports.execute = fetchDrugHistory;
