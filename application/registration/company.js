const smartcontracts = require("../contractHelper");
const constants = require("../constants");
const { manufacturer } = require("../constants");

async function getCompany(companyCRN, companyName) {
  try {
    const registrationSmartContract = await smartcontracts.getRegistrationContractInstance(
      constants.manufacturer.walletPath,
      constants.manufacturer.fabricUserName,
      manufacturer.connectionProfilePath
    );
    const entityBuffer = await registrationSmartContract.submitTransaction(
      constants.entitySC.getCompany,
      companyCRN,
      companyName
    );

    let entity;
    if (entityBuffer.toString().length) {
      entity = JSON.parse(entityBuffer.toString());
    } else {
      entity = null;
    }
    return entity;
  } catch (e) {
    throw new Error(e);
  } finally {
    console.log("disconnect");
    smartcontracts.disconnect();
  }
}

module.exports.execute = getCompany;
