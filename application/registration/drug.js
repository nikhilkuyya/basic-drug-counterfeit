const {
  getRegistrationContractInstance,
  disconnect,
  getDrugRegistrationContractInstance,
} = require("../contractHelper");

const { registerCompany } = require("./registration.service");

const manufacturerWalletPath = "./identities/manufacturer";

const constants = require("../constants");

async function drugRegistration(
  drugName,
  serialNo,
  mfgDate,
  expDate,
  companyCRN
) {
  try {
    const registrationDrugContract = await getDrugRegistrationContractInstance(
      constants.manufacturer.walletPath,
      constants.manufacturer.fabricUserName,
      constants.manufacturer.connectionProfilePath
    );
    console.log("... Registering the Drug");
    const drugBuffer = await registrationDrugContract.submitTransaction(
      "registerDrug",
      drugName,
      serialNo,
      mfgDate,
      expDate,
      companyCRN
    );
    console.log(".... Processing Drug Registration Transaction \n\n ");
    let newDrug = JSON.parse(drugBuffer.toString());
    console.log(newDrug);
    console.log("\n\n ...Register new Drug Complete! ");
    return newDrug;
  } catch (e) {
    console.log(`\n\n ${e} \n\n`);
    throw new Error(e);
  } finally {
    console.log(".... Disconnecting the Fabric GateWay");
    disconnect();
  }
}

module.exports.execute = drugRegistration;
