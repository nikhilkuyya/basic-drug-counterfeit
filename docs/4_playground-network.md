# Starting Envionment

Please follow the blod commands

## Chaincode and Network Starting.

Prerequistes needed, hope we have all of them.

use cd to change directory to network.

- checking the environments
  command : **docker ps -a**
- we need to be in network folder.
- cleaning the existing docker containers
  **./fabricNetwork.sh down** please press Y instially and y at the end to clean volumes.
- Now starting the network for the application with docker
  command :: **./fabricNetwork.sh up** please press Y at the start, it will take a while.
- By Now we have peers up. we can check by **docker ps -a** which will have up status for all the required peers,ca and orderer nodes.

- Now we need the ssh into chaincode container and run the chaincode.
  command : **docker exec -it chaincode /bin/bash**
- Once we have logged in, run the command **npm run start**
- which will install node_modules in chaincode peer and start the chaincode with all endorsing peers.
- Lets instantiate the chaincode which we have be in our machine.
- go to **should be network folder**.
- run **./fabricNetwork.sh install** please press Y at the start, it will take a few seconds only.

Now have started the environment to invoke from respective peers.

## Starting Applicaton

Lets' also start the application and use the postman to easy use for clients.

- For this run we need go to **application folder** in basic-drug-counterfeit
- run the command **npm install**
- Replace your generated keystore filesnames and paste in files
  for each peer.
- location for keystore :inside the folder network folder and follow arrows marks. example below.
- crypto-config > peerOrganizations > consumer.pharma-network.com > users > Admin@consumer.pharma-netwokr.com > msp > keystore >
- We need to copy the respecitve peer msp keystore file names and paste in **1_addToWallet.js** of application,location of place is highlighted place for the respective peer. ( Refer to Figure: place of replace )

  ![place of replace](docs/blue-highlighed-wallet.png)

- Ensure you have replaced the secret file from network keystore to the **1_addToWallet.js** for all the peerOrganizations.
- Run the application by command **npm run test**
- Now we are running whole application,chaincode with the networkup.
- Launch the Postman.
- Import the collection
  - Initiation
  - Supply Chain
  - View History
- excute collection requests in order kept to work successfully.
