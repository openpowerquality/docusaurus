---
title: OPQ Cloud Port Map
sidebar_label: Port Map
---

Much of the communication among the OPQ Cloud services occurs by way of unix ports.  This page documents all of the port bindings used by the various services.

Other than the Mongo port, all port communication is implemented using ZMQ.

Listed in order of increasing port number:

| Service | Port Number | Purpose |
| ------- | ----------- | ------- | 
| OPQ Box Updater| 8151 | Updater communication interface |
| Makai Acquisition Broker| 8194 | Box pub interface |
| Makai Acquisition Broker | 8196 | Box pull interface |
| Mauka | 8911 | Plugin interface |
| Makai Triggering Broker | 9880 | Triggering broker interface |
| Makai Triggering Broker | 9881 | Triggering broker interface |
| Mauka | 9882 | Mauka Broker sub interface |
| Mauka | 9883 | Mauka Broker pub interface |
| Makai Triggering Service | 9884 | Makai push/pull interface |
| Makai Triggering Service | 9899 | Makai publication interface |
| Mauka | 12000 | Mauka plugin management interface |
| Mongo | 27017 | Database interface |

For more details, see:

* [Mauka config.json](https://github.com/openpowerquality/opq/blob/master/mauka/config.json)
* [Makai Acquisition Broker config.json](https://github.com/openpowerquality/opq/blob/master/makai/AcquisitionBroker/acquisition_broker_config.json)
* [Makai Triggering Broker config.json](https://github.com/openpowerquality/opq/blob/master/makai/TriggeringBroker/triggering_broker_config.json)
* [Makai Triggering Service makai.json](https://github.com/openpowerquality/opq/blob/master/makai/TriggeringService/makai/makai.json)
* [Health Service config.json](https://github.com/openpowerquality/opq/blob/master/health/config.json)
* [OPQ Box settings.json](https://github.com/openpowerquality/opq/blob/master/box/Software/settings.json)
* [OPQ Box Updater config.json](https://github.com/openpowerquality/opq/blob/master/box/Software/Updater/updater_config.json)
