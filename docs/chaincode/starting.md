# Starting

- We will ssh into chaincode environment and start the chaincode.
- ssh into chaincode and run the chaincode
- set up the install chaincode by endorsement of member.
- start the server with peer where are invoking the Transaction.

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0001","Hello1","test place","Manufacturer"]}'

peer chaincode query -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:getCompany","0001","Hello1"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0002","Hello2","test place","Manufacturer"]}'

peer chaincode query -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:getCompany","0002","Hello2"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0004","Hello4","test place","Distributor"]}'

peer chaincode query -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:getCompany","0004","Hello4"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","-99","Hello-99","test place","Consumer"]}'

peer chaincode invoke -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:registerCompany","0005","Hello5","test place","Transporter"]}'

peer chaincode query -o orderer.pharma-network.com:7050 -C pharmachannel -n pharmanet -c '{"Args":["org.pharma-network.pharmanet.entityRegistrationContract:getCompany","0005","Hello5"]}'
