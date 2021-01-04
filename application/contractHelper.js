const fs = require("fs");
const yaml = require("js-yaml");
const { FileSystemWallet, Gateway } = require("fabric-network");
let gateway;

// What is the username of this Client user accessing the network -- MANUFACTURER_ADMIN
// './connection-profiles/manufacturer.yaml'
async function getContractInstance(
  contractName,
  walletPath,
  fabricUserName,
  connectionProfilePath
) {
  // A gateway defines which peer is used to access Fabric network
  // It uses a common connection profile (CCP) to connect to a Fabric Peer
  // A CCP is defined manually in file connection-profile-iit.yaml
  gateway = new Gateway();

  // A wallet is where the credentials to be used for this transaction exist
  // Credentials for user IIT_ADMIN was initially added to this wallet.
  const wallet = new FileSystemWallet(walletPath);

  // Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
  let connectionProfile = yaml.safeLoad(
    fs.readFileSync(connectionProfilePath, "utf8")
  );

  // Set connection options; identity and wallet
  let connectionOptions = {
    wallet: wallet,
    identity: fabricUserName,
    discovery: { enabled: false, asLocalhost: true },
  };

  // Connect to gateway using specified parameters
  console.log(".....Connecting to Fabric Gateway");
  await gateway.connect(connectionProfile, connectionOptions);

  // Access pharma channel
  console.log(".....Connecting to channel - pharmachannel");
  const channel = await gateway.getNetwork("pharmachannel");

  // Get instance of deployed Pharmanet contract
  // @param Name of chaincode
  // @param Name of smart contract
  console.log(".....Connecting to Pharmanet Smart Contract");
  const contract = channel.getContract("pharmanet", contractName);
  return contract;
}

function disconnect() {
  console.log(".....Disconnecting from Fabric Gateway");
  gateway.disconnect();
}

module.exports.getRegistrationContractInstance = getContractInstance.bind(
  null,
  "org.pharma-network.pharmanet.entityRegistrationContract"
);
module.exports.getDrugRegistrationContractInstance = getContractInstance.bind(
  null,
  "org.pharma-network.pharmanet.drugRegistrationContract"
);
module.exports.disconnect = disconnect;
