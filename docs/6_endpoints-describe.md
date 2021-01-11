# Endpoints

host: localhost, port : 3000
EndPointDomainName : **http://localhost:3000**

## Initiation

---

name : ManufacturerRegistration
httpverb : **POST**
endpoint: **/manufacturer/registration**
bodyParams : **{ companyCRN ,companyName,location }**
description: this is used by manufacturer to register their company

---

name : DistributorRegistration
httpverb : **POST**
endpoint: **/distributor/registration**
bodyParams: **{companyCRN,companyName,location}**
description: this is used distributor to register their company

---

name : RegtailerRegistration
httpverb : **POST**
endpoint : **/retailer/registration**
bodyParams: **{companyCRN,companyName,location}**
description: this is used by retailer to register their company.

---

name : TransporterRegistration
httpverb : **POST**
endpoint: **/transporter/registration**
bodyParams: **{companyCRN,companyName,location}**
description: this is used by Transporter to register their company

---

name: DrugRegistration
httpverb : **POST**
endpoint: **/drug/registration**
bodyParams : **{drugName,serialNo,mfgDate,expDate,companyCRN}**
description: This is used by manufacturer to register drug after manfufacture

---

name : FetchCompany
httpverb : **GET**
endpoint: **/company**
bodyParams : **{companyCRN,companyName}**
description: there is no restriction to get the view of company information.

---

name : FetchDrugs
httpverb: **GET**
endpoint: **/drugs/**
bodyParams: **{drugName}**
descritption : Get the DrugInformation Collection by name.

---

## SupplyChain PurchaseOrder

name : CreatePurchaseOrderByDistributor
httpverb: **POST**
endpoint: **/distributor/po**
bodyParams: **{buyerCRN,sellerCRN,drugName,quantity}**
description: To create the purchase order from distributor.

---

name : CreatePurchaseOrderByRetailer
httpverb: **POST**
endpoint: **/retailer/po**
bodyParams: **{buyerCRN,sellerCRN,drugName,quantity}**
description: To create the purchase order from Retailer.

---

name : FetchPO
httpverb: **GET**
endpoint: **/po**
bodyParams: **{buyerCRN,drugName}**
description: Get the purchase Order Details.

---

name: RetailerSale
httpverb: **POST**
endpoint: **/retailer/sale**
bodyParams: **{drugName,serialNo,retailerCRN,customerAadhar}**
description: this is invoked by retailer when doing sale.

---

## SupplyChain Shipment

name: ManufacturerShipment
httpVerb: **POST**
endpoint: **/manufacturer/shipment**
bodyParams: **{buyerCRN,drugName,listOfAssets,transporterCRN}**
description: This is invoked when Manufacturer creates the shipment after PO of Distributor

---

name : DistributorShipment
httpVerb: **POST**
endpoint: **/distributor/shipment**
bodyParams: **{buyerCRN,drugName,listOfAssets,transporterCRN}**
description: This is invoked when Distributor creates
shipment after PO of Retailer.

---

name : TransporterShipment
httpVerb: **POST**
endpoint: **/transporter/shipment**
bodyParams: **{buyerCRN,drugName,transporterCRN}**
description: This is invoked by transporter to update the status of Tranport Details.

---

## View Drug Status and History

name: FetchCurrentStatus
http: **GET**
endpoint: **/drug**
bodyParams: **{drugName,serialNo}**
description: THis is invoked to get the current status of the drug

---

name: FetchDrugHistory
http: **GET**
endpoint: **/drug/history**
bodyParams: **{drugName,serialNo}**
description : to get the state of drug from the starting.

---
