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
      "../network/crypto-config/peerOrganizations/manufacturer.pharma-network.com/users/Admin@manufacturer.pharma-network.com/msp/keystore/b96756a80b91b7ed7a439696bca81021e8763cb48bb1395b34876c456c35e2b9_sk",
    walletPath: constants.manufacturer.walletPath,
    identityLabel: constants.manufacturer.fabricUserName,
    identityMSP: constants.manufacturer.identityMSP,
  },
  // {
  //   certificatePath:
  //     "../network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/signcerts/Admin@distributor.pharma-network.com-cert.pem",
  //   privateKeyPath:
  //     "../network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/keystore/44e35eddde5f4642d74674d6829843e201914caaf0661aafa62d9e4fc06fe2f1_sk",
  //   walletPath: "./identities/distributor",
  //   identityLabel: "DISTRIBUTOR_ADMIN",
  //   identityMSP: "distributorMSP",
  // },
  // {
  //   certificatePath:
  //     "../network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/signcerts/Admin@transporter.pharma-network.com-cert.pem",
  //   privateKeyPath:
  //     "../network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/keystore/44e35eddde5f4642d74674d6829843e201914caaf0661aafa62d9e4fc06fe2f1_sk",
  //   walletPath: "./identities/transporter",
  //   identityLabel: "TRANSPORTER_ADMIN",
  //   identityMSP: "transporterMSP",
  // },
  // {
  //   certificatePath:
  //     "../network/crypto-config/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/signcerts/Admin@retailer.pharma-network.com-cert.pem",
  //   privateKeyPath:
  //     "../network/crypto-config/peerOrganizations/retailer.pharma-network.com/users/Admin@retailer.pharma-network.com/msp/keystore/44e35eddde5f4642d74674d6829843e201914caaf0661aafa62d9e4fc06fe2f1_sk",
  //   walletPath: "./identities/retailer",
  //   identityLabel: "RETAILER_ADMIN",
  //   identityMSP: "retailerMSP",
  // },
  // {
  //   certificatePath:
  //     "../network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/signcerts/Admin@consumer.pharma-network.com-cert.pem",
  //   privateKeyPath:
  //     "../network/crypto-config/peerOrganizations/consumer.pharma-network.com/users/Admin@consumer.pharma-network.com/msp/keystore/44e35eddde5f4642d74674d6829843e201914caaf0661aafa62d9e4fc06fe2f1_sk",
  //   walletPath: "./identities/consumer",
  //   identityLabel: "CONSUMER_ADMIN",
  //   identityMSP: "consumerMSP",
  // },
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
