---
title: OPQ Box Updater
sidebar_label: Updater
---

This document contains the technical information for the OPQBox updater. If you are looking for instruction on updating your OPQBox, see the [OPQ Box User Guide](userguide-hardware.md).

## Summary

The OPQBox updater provides a way to update any OPQBox to the latest OPQBox software. Updating an OPQBox involves building an OPQBox image, hosting that image on an application server, downloading that image to a Box, and installing the image on a Box. This document will detail these steps.

All OPQBox updates are completely atomic and independent. That means each update should contain everything needed to stop, erase, and install all required Box services and software. This eliminates the need to track versions and each box can always update directly to the latest version indepdendent of the version it is currently on.

### Building an OPQ Box Image

An OPQ Box update image is a compressed .tar.bz2 archive that contains version information, and install script, and install binaries and scripts.

Updates are named using the template: `opq-box-update-[VERSION]` where version is replaced by the timestamp of when the update was built which represents the number of seconds since the epoch.

Update distributions take the form of `opq-box-update-[VERSION].tar.bz2`.

An update distribution should contain the following layout and files:

* ./VERSION -- a text file containing the reference update version
* ./install_update.sh -- a shell script that performs the update on an OPQ Box
* ./box-configuration-daemon/ -- Updated sources for the OPQ Box Configuration Daemon
* [TODO] -- list layout for triggering, kernels, and firmware

The building of OPQ Box update distributions can be automated by calling the [opq/box/Software/box-updater/build-update.sh](https://github.com/openpowerquality/opq/blob/master/box/Software/box-updater/build_update.sh) script. This script will build an OPQ Box update distribution in the current directory. This distribution can then be transferred to the box-update-server for hosting.

The included [install_update.sh](https://github.com/openpowerquality/opq/blob/master/box/Software/box-updater/install_update.sh) should always stop all Box services, install fresh versions of all services, and then reboot the box.

### box-update-server

The [box-update-server](https://github.com/openpowerquality/opq/tree/master/util/box-update-server) is a pure Python 3 HTTP application server that can be ran as a docker service. The image can be found on dockerhub as [openpowerquality/opqboxupdateserver](https://cloud.docker.com/u/openpowerquality/repository/docker/openpowerquality/opqboxupdateserver).

The application server takes two arguments to start which include a port number for the server to run on and a directory on the host system that contains (or will contain) Box updates. These are currently configured and passed in using the [docker-run.sh](https://github.com/openpowerquality/opq/blob/master/util/box-update-server/docker/docker-run.sh) script. By default, the docker-run.sh file assumes that the update directory `/var/opq/box-updates` exists. If this directory does not exist, you should create it before running the box-update-server. 

The box-update-server provides the following 5 HTTP endpoints:

| Endpoint | Description |
|----------|-------------|
| /        | Returns an empty 200 OK. Useful for health checks. |
| /ls      | Returns a list of available box updates on this server |
| /version | Returns the latest available update version as number of seconds since the epoch |
| /update/[UPDATE] | Returns a file where [UPDATE] is replaced with the update name |
| /latest | Returns a file with the latest box update (by redirecting to /update/[UPDATE] and replacing [UPDATE] with the latest update name) |

These endpoints can be queried to obtain information about updates and to receive the updates themselves.

You can see examples of all of these on the emilia opq update server:

* [http://emilia.ics.hawaii.edu:8151/](http://emilia.ics.hawaii.edu:8151/)
* [http://emilia.ics.hawaii.edu:8151/ls](http://emilia.ics.hawaii.edu:8151/ls)
* [http://emilia.ics.hawaii.edu:8151/version](http://emilia.ics.hawaii.edu:8151/version)
* [http://emilia.ics.hawaii.edu:8151/update/opq-box-update-1547860803.tar.bz2](http://emilia.ics.hawaii.edu:8151/update/opq-box-update-1547860803.tar.bz2)
* [http://emilia.ics.hawaii.edu:8151/latest](http://emilia.ics.hawaii.edu:8151/latest)

When the box-update-server is started, an update_dir is specified. Update distributions should be placed in this directory and the box-update-server will observe changes when files are added or removed without restarting the server.

### Installing an update on an OPQ Box

 Updates are currently triggered when a Box owner opens the OPQ Box Config Daemon interface and clicks the `Update Box` button.
  
 1. The update action is triggered by the GET request generated from the [OPQ Box Config Daemon web interface](https://github.com/openpowerquality/opq/blob/master/box/Software/box-config-daemon/box-config-daemon.html). 
 2. The GET request is handled by the [OPQ Box Config Daemon HTTP Server](https://github.com/openpowerquality/opq/blob/master/box/Software/box-config-daemon/http_server.py).
 3. The GET request handler calls a [Python module](https://github.com/openpowerquality/opq/blob/master/box/Software/box-config-daemon/updater/updater.py) which wraps a [bash script](https://github.com/openpowerquality/opq/blob/master/box/Software/box-config-daemon/updater/updater.sh) that instructs the Box to download the latest update and runs an included install script that stops box services, installs the updates, and reboots the Box.
