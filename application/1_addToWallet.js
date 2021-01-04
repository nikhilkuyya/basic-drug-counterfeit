"use strict";

/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: MANUFACTURER_ADMIN
 *  User Organization: MANUFACTURER
 *  User Role: Admin
 *
 */

const fs = require("fs"); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require("fabric-network"); // Wallet Library provided by Fabric
const path = require("path"); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, "../network/crypto-config"); // Directory where all Network artifacts are stored

// A wallet is a filesystem path that stores a collection of Identities
const constants = require("./constants");

async function main(
  certificatePath,
  privateKeyPath,
  walletPath,
  identityLabel,
  identityMSP
) {
  // Main try/catch block
  try {
    const wallet = new FileSystemWallet(walletPath);

    // Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
    const certificate = fs.readFileSync(certificatePath).toString();
    // IMPORTANT: Change the private key name to the key generated on your computer
    const privatekey = fs.readFileSync(privateKeyPath).toString();

    // Load credentials into wallet
    const identity = X509WalletMixin.createIdentity(
      identityMSP,
      certificate,
      privatekey
    );

    await wallet.import(identityLabel, identity);
  } catch (error) {
    console.log(`Error adding to wallet. ${error}`);
    console.log(error.stack);
    throw new Error(error);
  }
}

const walletList = [
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/signcerts/Admin@manufacturer.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/keystore/d8874ee318a3e14872f79ff59a5bd82fb2cdabb2d6ec72e9afbd73ed42aa659f_sk",
    walletPath: constants.manufacturer.walletPath,
    identityLabel: constants.manufacturer.fabricUserName,
    identityMSP: constants.manufacturer.identityMSP,
  },
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/signcerts/Admin@distributor.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/keystore/7a901ec5f53264dfa88f441b0123b8e0c4f427e75c8835d94525ad3fd0645115_sk",
    walletPath: "./identities/distributor",
    identityLabel: "DISTRIBUTOR_ADMIN",
    identityMSP: "distributorMSP",
  },
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/signcerts/Admin@transporter.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/keystore/7522c60a9a4aa47a79e72437cc36863d0c5f9809bccc8a5a0d316cf85d63c9d1_sk",
    walletPath: "./identities/transporter",
    identityLabel: "TRANSPORTER_ADMIN",
    identityMSP: "transporterMSP",
  },
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/signcerts/Admin@retailer.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/keystore/078bdc1a2d3b9ba321d3986a361876fa26e7437883906e7cc77eb9f2b1982560_sk",
    walletPath: "./identities/retailer",
    identityLabel: "RETAILER_ADMIN",
    identityMSP: "retailerMSP",
  },
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/signcerts/Admin@consumer.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/keystore/18097ec9c9c2d4f0ae6807edfaed94addee998d2732ce175da03ea59d9800e76_sk",
    walletPath: "./identities/consumer",
    identityLabel: "CONSUMER_ADMIN",
    identityMSP: "consumerMSP",
  },
];

walletList.forEach((wallet) => {
  main(
    wallet.certificatePath,
    wallet.privateKeyPath,
    wallet.walletPath,
    wallet.identityLabel,
    wallet.identityMSP
  ).then(() => {
    console.log(wallet.identityLabel + " identity added to wallet");
  });
});

module.exports.execute = main;
