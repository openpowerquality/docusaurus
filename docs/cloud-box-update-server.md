---
title: OPQ Box Update Server
sidebar_label: Box Update Server
---

The goal of the OPQ Box Update Server is to provide an HTTP endpoint that hosts updates for OPQBoxes.

The server consists of a single Python file and does not depend on any external dependencies.

The source for the server can be found at [https://github.com/openpowerquality/opq/tree/master/box-update-server](https://github.com/openpowerquality/opq/tree/master/box-update-server).

## Basic Operation

The Box Update Server listens on a specified port and serves updates to OPQ Boxes. 

The server exposes the following endpoints:

| Endpoint | Description | Example |
|----------|-------------|---------|
| /        | Exposes the servers health status to OPQ Health | [https://emilia.ics.hawaii.edu/box-update-server](https://emilia.ics.hawaii.edu/box-update-server) |
| /ls      | Provides a list of available box updates on the server as text separated by newlines | [https://emilia.ics.hawaii.edu/box-update-server/ls](https://emilia.ics.hawaii.edu/box-update-server/ls) |  
| /update/[update_id] | Retrieves the provided update from the server where [update_id] should be replaced with the file name of the update | [https://emilia.ics.hawaii.edu/box-update-server/update/opq-box-update-1550190683.tar.bz2](https://emilia.ics.hawaii.edu/box-update-server/update/opq-box-update-1550190683.tar.bz2) |
| /latest | Retrieves the latest update from the server | [https://emilia.ics.hawaii.edu/box-update-server/latest](https://emilia.ics.hawaii.edu/box-update-server/latest) |

### Building an OPQ Box Image

An OPQ Box update image is a compressed .tar.bz2 archive that contains version information, and install script, and install binaries and scripts.

Updates are named using the template: `opq-box-update-[VERSION]` where version is replaced by the timestamp of when the update was built which represents the number of seconds since the epoch.

Update distributions take the form of `opq-box-update-[VERSION].tar.bz2`.

An update distribution should contain the following layout and files:

* ./VERSION -- a text file containing the reference update version
* ./install_update.sh -- a shell script that performs the update on an OPQ Box
* ./box-configuration-daemon/ -- Updated sources for the OPQ Box Configuration Daemon

The building of OPQ Box update distributions can be automated by calling the [opq/box/Software/box-updater/build-update.sh](https://github.com/openpowerquality/opq/blob/master/box/Software/box-updater/build_update.sh) script. This script will build an OPQ Box update distribution in the current directory. This distribution can then be transferred to the box-update-server for hosting.

The included [install_update.sh](https://github.com/openpowerquality/opq/blob/master/box/Software/box-updater/install_update.sh) should always stop all Box services, install fresh versions of all services, and then reboot the box.

### Providing Updates

Once you've built a new update image, it must be placed in a specified directory of the host machine that the Box Update Server docker service is running on. The Box Update Server docker image creates a volume that is specified in [opq-docker/sample-config/box-update-server/box-update-server.config.json](https://github.com/openpowerquality/opq-docker/blob/master/sample-config/box-update-server/box-update-server.config.json) with the `updates_dir` key. Once the update file has been placed in this directory, you should be able to hit the `/ls` endpoint to make sure it is there.

## Development

The Box Update Server consists of a single Python 3.7 file and does not depend on any external dependencies.

### Obtaining the sources

1. Clone the master branch of the OPQ project at: https://github.com/openpowerquality/opq
2. OPQ Box Update Server sources can be located at opq/box-update-server

### Running in development

First, change into the box-update-server directory.

```
cd opq/box-update-server
```

Then, load the development configuration into an environment variable and run the script.

```
BOX_UPDATE_SERVER_SETTINGS=$(<config/box-update-server.config.json) python3 box_update_server.py 
```

### Static analysis

Static analysis if provided using Coala. To install Coala, run:

```
pip3 install coala-bears
```

Static analysis can be ran from the box-update-server directory with:

```
coala --ci
```

## Docker

Please see [Building, Publishing, and Deploying OPQ Cloud Services with Docker](cloud-docker.html) for information on packaging up this service using Docker.
