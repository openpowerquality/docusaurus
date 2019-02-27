---
title: OPQ Health
sidebar_label: Health
---

The goal of the OPQHealth service is provide a diagnostic facility for determining whether or not the OPQ hardware and software services appear to be running appropriately.  It does this by monitoring aspects of the system and publishing its findings to two sources:

  1. The MongoDB database, in a collection called "health".  By storing its findings in MongoDB, OPQHealth enables OPQView to provide an interface to end-users on the health of the OPQ system. However, this works only as long as both OPQView and MongoDB are healthy.

  2. A log file. OPQ Health also publishes its findings into a text file. This enables system administrators to diagnose the health of the system even when MongoDB and/or OPQView are down.

## Basic operation

When OPQHealth starts up, it reads its configuration file to determine what services it should monitor and how frequently it should monitor them.  

Thereafter, it checks each service at the interval specified in its configuration file, and writes out a line to the logfile and a document to the Health database indicating the status. 

For more details on the logged data, see the [Health Data Model](cloud-datamodel.md#health). 


## Installation

To install OPQHealth, you must first set up the configuration file.  A sample configuration file is in json format and looks like this:

```js
[
    {
        "service": "zeromq",
        "port": "tcp://127.0.0.1:9881"
    },
    {
        "service": "box",
        "interval": 60,
        "boxdata": [
          { "boxID": 1 },
          { "boxID": 2 },
          { "boxID": 3 },
          { "boxID": 4 },
          { "boxID": 5 },
          { "boxID": 6 }
        ]
    },
    {
        "service": "mauka",
        "interval": 60,
        "url": "http://localhost:8911",
        "plugins": [
            "StatusPlugin",
            "IticPlugin",
            "AcquisitionTriggerPlugin",
            "VoltageThresholdPlugin",
            "ThdPlugin",
            "FrequencyThresholdPlugin"
        ]
    },
    {
        "service": "makai",
        "interval": 60,
        "mongo": "mongodb://localhost:27017/",
        "acquisition_port": "tcp://localhost:9884"
    },
    {
        "service": "view",
        "interval": 60,
        "url": "http://emilia.ics.hawaii.edu"
    },
    {
        "service": "mongodb",
        "interval": 60,
        "url": "mongodb://localhost:27017/"
    },
    {
        "service": "health",
        "interval": 86400
    }
]
```

The configuration file is an array of objects.  Every object has a field called "service", which indicates which service the object provides configuration data for.  The remaining fields can vary depending upon the value of the service field.

Most configuration objects have a field called "interval", which specifies the frequency in seconds with which OPQHealth should check on that service. In the example above, most services are checked once a minute, though OPQHealth checks on itself once a day.

To run OPQHealth, cd into the health/ directory and invoke OPQHealth as follows:

```
$ python3 health.py -config configuration.json -log logfile.txt
... reading configuration information from configuration.json
... writing out initial health status to logfile.txt
```

Upon startup, OPQHealth prints out information indicating that it successfully read the configuration file and successfully wrote initial entries to the specified logfile. Afterwards, it does not write anything to the console. Here is an example of the log file after startup:

```
20180318-09:08:21-10:00 service: box, serviceID: 0, status: up, info:
20180318-09:08:21-10:00 service: box, serviceID: 1, status: up, info:   
20180318-09:08:22-10:00 service: box, serviceID: 2, status: down, info:   
20180318-09:08:22-10:00 service: mauka, serviceID:, status: up, info:   
20180318-09:08:22-10:00 service: makai, serviceID:, status: up, info:   
20180318-09:08:22-10:00 service: mongodb, serviceID:, status: up, info:   
20180318-09:08:22-10:00 service: view, serviceID:, status: up, info:   
```

The log file prints out the value of all fields in the data model, comma separated. 

Note that each time an entry is added to the log file, a corresponding document is inserted into the health collection.

## Detecting health

OPQHealth assesses the health of each service in the following way:

*OPQ Box*:  For an OPQBox to have status "up", it must have sent at least one message to the ZeroMQ service within the past 5 minutes.

*Mauka*: For Mauka to have the status up, Mauka's health http endpoint must respond with status code 200 and valid json containing a dict of plugins and a timestamp for each of the plugin's last "heartbeat." Each Mauka plugin will have its own health status, which is considered up if its provided timestamp is within the past 5 minutes. A health status is only provided for plugins specified in the config.json

*Makai*: For Makai to have the status up, three things must happen. (1) Boxes must be sending measurements. (2) Must be able to request events from Makai's acquisition broker. (3) The requested event must appear in mongodb.

*MongoDB*: For MongoDB to have status up, OPQHealth must be able to successfully retrieve a document from the health collection.

*View*: For OPQView to have status "up", OPQHealth must be able to retrieve the landing page with status 200.


## Docker

Note: Make sure you have Docker installed on your system prior to continuing.
Please refer to the official [Docker documentation](https://docs.docker.com/install/) for installation instructions.

At some point during development, you will want to create and publish a new Docker image containing all your latest features and changes.

Health's Docker files can be found in the `opq/health/docker` directory. Of utmost importance are the following two files:
  * `Dockerfile`: Contains the configuration for building the Docker image. Used by the `docker-build.sh` script.
  * `docker-build.sh`: A script for building a new local Health Docker image.

In most cases, creating a new image is simply a matter of invoking the `docker-build.sh` script; it should seldom necessary to modify the `Dockerfile`.

### Creating a new local Health Docker image

  1. Change into the `opq/health/docker` directory.
  2. Invoke the `docker-build.sh` script to begin building the image. This can take up to a few minutes.
  3. Verify that the image was successfully created by invoking the `docker image ls` command. You should see the recently created image named `health` with tag `latest`

### Publishing image to DockerHub

In the previous section, we described the process of building a new local Health Docker image.
In most cases, you will want to follow this up by publishing your newly created image for the world to use on DockerHub.

Note: Before continuing, make sure that your DockerHub account is a member of the official `openpowerquality` DockerHub organization.

#### Determine version number to tag image as

Before publishing a new Health image, you will need to determine what version number you wish to tag the image as.

Visit the official [OPQ Health DockerHub](https://hub.docker.com/r/openpowerquality/health/tags) repository to see the list of previously published Health image version tags.

#### Tag the local Health Docker image

For the sake of example, let's assume that we wish to publish a new Health image with version `1.5.0`.

Recall that in the previous section, we had just created a new local Health image named `health` with tag `latest`.

We must now tag this local image appropriately in a DockerHub-valid format in the form of: `<dockerhub-organization>/<repository-name>:<version-tag>`

Proceed to tag the image by invoking:

```
docker tag health:latest openpowerquality/health:1.5.0
```

You should invoke the `docker image ls` command to verify that the image was correctly tagged.

#### Push image to DockerHub

Now that we have tagged our new image in a DockerHub-valid format, we can go ahead and actually publish the image to DockerHub.

Login to your DockerHub account by invoking the `docker login` command.
If you are unsure which account you are currently logged into, you may invoke `docker logout` first.

```
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: <Your-Username>
Password:
<some lines removed>

Login Succeeded
```

Push the image to DockerHub by invoking `docker push openpowerquality/health:1.5.0`:

```
$ docker push openpowerquality/health:1.5.0
The push refers to repository [docker.io/openpowerquality/health]
274a938dfe74: Pushed
c447352fa851: Pushed
df9fbba33a0d: Pushed
be0fb77bfb1f: Layer already exists
63c810287aa2: Layer already exists
2793dc0607dd: Layer already exists
74800c25aa8c: Layer already exists
ba504a540674: Layer already exists
81101ce649d5: Layer already exists
daf45b2cad9a: Layer already exists
8c466bf4ca6f: Layer already exists
1.5.0: digest: sha256:b0299638d1528390399a43fff74f71f397780e70d5f4432218cb5c12d7cf0d66 size: 2636
```

You're done!
Verify that the image was successfully published by visiting the [OPQ Health DockerHub](https://hub.docker.com/r/openpowerquality/health/tags) repository.
