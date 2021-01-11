# File Structure for Setup the Test Environment

[Back](./README.md)  |  [Home](/README.md)

- crypto-config.yaml :: configuration file for generate the certification material for peers.
- configtx.yaml      :: configuration file for setup the anchor peer data, orderer and genesis block info.
- docker-compse.yaml :: configuration file for setup peers with docker

## Framing of Files

configuration decision documentation.

## Crypto Configuration File

- YAML File for configuration, ***crypto-config.yaml***

> This file constitues the certification generation information for all the running stakeholder machine.
> Generally, there would any process used by organizations or peer for generation of certification for identity.
