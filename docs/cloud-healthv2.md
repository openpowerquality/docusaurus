---
title: OPQ Health v2
sidebar_label: Health v2
---

### OPQHealth v2 implements a backend re-design of the original OPQHealth
* OPQView may run with either version of OPQHealth
    * The health documents written to mongo are exactly the same as formatted previously
* Each service (that would like a health check) now becomes responsible for its own health server that returns a health status.
* Health simply queries each service at an interval and writes a health document for the service to MongoDB for OPQView to interpret.

The goal of the OPQHealth service is provide a diagnostic facility for determining whether or not the OPQ hardware and software services appear to be running appropriately.  It does this by monitoring aspects of the system and publishing its findings to two sources:

  1. The MongoDB database, in a collection called "health".  By storing its findings in MongoDB, OPQHealth enables OPQView to provide an interface to end-users on the health of the OPQ system. However, this works only as long as both OPQView and MongoDB are healthy.

  2. A log file. OPQ Health also publishes its findings into a text file. This enables system administrators to diagnose the health of the system even when MongoDB and/or OPQView are down.

## Basic operation

When OPQHealth starts up, it reads a configuration file to determine what services it should monitor and how frequently it should check on them.  

Thereafter, it checks each service at the interval specified in its configuration file, and writes out a line to the logfile and a document to the Health database indicating the status. 

For more details on the logged data, see the [Health Data Model](cloud-datamodel.md#health). 


## Installation

To install OPQHealth, you must first set up the configuration file.  A sample configuration file is in json format and looks like this:

```js
{
  "interval": 20,
  "services": [
    {
      "name": "mongo",
      "url": "http://localhost:28420"
    },
    {
      "name": "view",
      "url": "https://emilia.ics.hawaii.edu/#/"
    },
    ...
    ...
  ]
}
```

The "interval" field specifies the frequency in seconds with which OPQHealth should check on each service.

Every service has a field called "url", which indicates the service's health server address.  

To run OPQHealth, cd into the health/ directory and invoke OPQHealth as follows:

```
$ cargo run
```

The log file prints out the value of all fields in the data model, comma separated. 

Note that each time an entry is added to the log file, a corresponding document is inserted into the health collection.

```
20180318-09:08:21-10:00 service: box, serviceID: 0, status: up, info:
20180318-09:08:21-10:00 service: box, serviceID: 1, status: up, info:   
20180318-09:08:22-10:00 service: box, serviceID: 2, status: down, info:   
20180318-09:08:22-10:00 service: mauka, serviceID:, status: up, info:   
20180318-09:08:22-10:00 service: makai, serviceID:, status: up, info:   
20180318-09:08:22-10:00 service: mongodb, serviceID:, status: up, info:   
20180318-09:08:22-10:00 service: view, serviceID:, status: up, info:   
```

## Detecting health

Each service is responsible for creating and running its own health server that returns a specifically formatted json string. OPQHealth simply parses the response and writes statuses.

The json must follow the form (e.g. from the Makai health server):
```
{  
    "name":"makai",
    "ok":true,
    "timestamp":1553687775,
    "subcomponents":[  
        {  
            "name":"1009",
            "timestamp":1553687774,
            "ok":true
        },
        {  
            "name":"1008",
            "timestamp":1553687774,
            "ok":true
        },
        {  
            "name":"1010",
            "timestamp":1553687774,
            "ok":true
        }
    ]
}
```

## Interpreting Health

The core service has fields:
* "name" (string): The name of the service for which Health will be writing the status
* "ok" (bool): Whether the service is up or not
* "timestamp" (u64): Unix timestamp
* "subcomponents" (list of health documents): ***Optional*** field for if a service provides additional health statuses for subcomponents
    * e.g. OPQBoxes are a subcomponent of Makai
    

Each subcomponent also has its own health document written to MongoDB.

It is up to OPQView to implement how it would like to represent subcomponents - It could even just ignore health documents for services it does not recognize.

## Health service server documentation - WIP

## Docker

Please see [Building, Publishing, and Deploying OPQ Cloud Services with Docker](cloud-docker.html) for information on packaging up this service using Docker. 
