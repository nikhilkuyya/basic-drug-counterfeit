# Starting

- We will ssh into chaincode environment and start the chaincode.
- ssh into chaincode and run the chaincode
- set up the install chaincode by endorsement of member.
- start the server with peer where are invoking the Transaction.

## Commands to run to test the register entity

`Note`

- peer sshed and also start the chaincode-node
- chaincode peer should be started with that peer pointed

---

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel
-n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0001","Hello1","test place","Manufacturer"]}'

peer chaincode query -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:getCompany","0001","Hello1"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0002","Hello2","test place","Manufacturer"]}'

peer chaincode query -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:getCompany","0002","Hello2"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0004","Hello4","test place","Distributor"]}'

peer chaincode query -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:getCompany","0004","Hello4"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","-99","Hello-99","test place","Consumer"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0005","Hello5","test place","Transporter"]}'

peer chaincode query -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:getCompany","0005","Hello5"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0006","Hello6","test place","Transporter"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0007","Hello7","test place","Retailer"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0008","Hello8","test place","Retailer"]}'

---

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.drugRegistrationContract:registerDrug","P1","1","06-12-2020","06-01-2021","0001","Hello1"]}'

---

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.purchaseOrderContract:createPurchaseOrder","DIST001","MAN001","Paracetamol",4]}'
