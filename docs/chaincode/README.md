# Chaincode

[Back](../architecture.md) | [Home](/README.md)

It is a collection of one or more smart contracts.
Application Developement persective, smart contract along with ledger form the heart of the hyperledger fabric.

Business defines a common set of contracts, which acts like business model are:

- terms
- definitions
- process
- rules
- data

## Smart Contract and Ledger

A Smart Contract defines the different state of business object and govern the process that moves from object from one state to another.

Applications Invoking Smart Contract generates transactions which are recorded in ledger.
Ledger contains both blockchain and world state.

World State is collection of all the states.

## Division of Smart Contracts

We will split the smart contract functionality based on the organizations.

ctx : First parameter in transaction, contains the ifnormation of both the information of contract, transaction and access to ledger.
