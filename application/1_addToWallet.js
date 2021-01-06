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
      "../network/crypto-config/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/keystore/95649e36d332e5c777d910ee6496eff0aac28e9fe738b9f09ef03a9871269cc2_sk",
    walletPath: constants.manufacturer.walletPath,
    identityLabel: constants.manufacturer.fabricUserName,
    identityMSP: constants.manufacturer.identityMSP,
  },
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/signcerts/Admin@distributor.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/keystore/f5efaad95febf9c5fe42e1255972f10e2cef0a36a5f0c242af0901b11b0b7fd2_sk",
    walletPath: "./identities/distributor",
    identityLabel: "DISTRIBUTOR_ADMIN",
    identityMSP: "distributorMSP",
  },
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/signcerts/Admin@transporter.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/keystore/95768074871d63a1304929cca7c2e31aeb44162e36103d96e3adf60a3a4826f7_sk",
    walletPath: "./identities/transporter",
    identityLabel: "TRANSPORTER_ADMIN",
    identityMSP: "transporterMSP",
  },
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/signcerts/Admin@retailer.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/keystore/8e93ba4ff422a9561f982d2189e50977b860b5a7f6ba41ebba2485ca901fd849_sk",
    walletPath: "./identities/retailer",
    identityLabel: "RETAILER_ADMIN",
    identityMSP: "retailerMSP",
  },
  {
    certificatePath:
      "../network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/signcerts/Admin@consumer.pharma-network.com-cert.pem",
    privateKeyPath:
      "../network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/keystore/19172380cf1092fa8b0dd271ea91af80e6ae4cd82f10b70a98e8eb528408e5de_sk",
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
