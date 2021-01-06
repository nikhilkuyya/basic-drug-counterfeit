const {
  disconnect,
  getDrugRegistrationContractInstance,
} = require("../contractHelper");

const manufacturerWalletPath = "./identities/manufacturer";

const constants = require("../constants");

async function fetchDrugs(drugName) {
  try {
    const registrationDrugContract = await getDrugRegistrationContractInstance(
      constants.manufacturer.walletPath,
      constants.manufacturer.fabricUserName,
      constants.manufacturer.connectionProfilePath
    );
    console.log("... Registering the Drug");
    const drugBuffer = await registrationDrugContract.submitTransaction(
      constants.entitySC.getDrugs,
      drugName
    );
    console.log(".... Processing Drug Registration Transaction \n\n ");
    let drugs = JSON.parse(drugBuffer.toString());
    console.log(drugs);
    console.log("\n\n ...Register new Drug Complete! ");
    return drugs;
  } catch (e) {
    console.log(`\n\n ${e} \n\n`);
    throw new Error(e);
  } finally {
    console.log(".... Disconnecting the Fabric GateWay");
    disconnect();
  }
}

module.exports.execute = fetchDrugs;
