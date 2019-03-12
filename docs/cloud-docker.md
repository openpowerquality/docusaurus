---
title: Building, Publishing, and Deploying OPQ Cloud services with Docker
sidebar_label: Docker
---

We utilize [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) to containerize and deploy the OPQ Services: View, Mauka, Makai, Health, and Box Updater.  For Mongo, we use the official Mongo image without modification.  

This page provides documentation on the standard procedures used in OPQ for building and publishing OPQ Cloud services using Docker. This procedure is:

  1. Install Docker and Docker Compose
  2. Build a new Docker Image
  3. Publish the Image to Docker Hub.
  4. Update the OPQ Docker Compose .env file
  5. Create a new opq-docker release
  6. Install your update

The next sections document each of these steps. 

## Install Docker and Docker Compose

Make sure you have Docker and Docker Compose installed on your development and production systems.

Please refer to the official [Docker install documentation](https://docs.docker.com/install/) and [Docker-Compose install documentation](https://docs.docker.com/compose/install/) for installation instructions.  If you are on a Mac, you can install [Docker Desktop](https://www.docker.com/products/docker-desktop).  Note that Windows-based development is not currently supported for OPQ.  

In addition, you will need an account on DockerHub, and your account will need to be a menber of the [DockerHub openpowerquality organization](https://hub.docker.com/u/openpowerquality).

## Build a new Docker Image

Each OPQ Cloud service has a directory called docker containing a script called docker-build.sh. The following table shows the directory in the opq repository containing this file: 

| Service Name | docker-build.sh |
|---------|-----------------------|
| health  | opq/health/docker/  |
| mauka   | opq/mauka/docker/  |
| makai   | opq/makai/docker/  |
| view   | opq/view/docker/  |
| box-update-server    | opq/util/box-update-server/docker/  |

To build a new Docker image for a given OPQ Cloud service:

  1. `cd` into the service's `/docker` subdirectory.
  2. Invoke the `docker-build.sh` script, and wait for the build process to complete.

Each OPQ service's respective `docker-build.sh` script might have varying output due to differences in that service's build process, but the end result will always be the same: a new Docker image named `<opq-service-name>:latest`.

Once the script has finished running, you can confirm that the image has been successfully created by invoking the `docker image ls` command.

## Publish the Image to DockerHub

First, make sure that your DockerHub account is a member of the official `openpowerquality` DockerHub organization.

Second, determine the new version number you'll associate with your image.  Use one of the links in the following table to determine the current DockerHub version number associated with your service:

 | Service Name | DockerHub Tags Page |
 |---------|-----------------------|
 | health  | [https://hub.docker.com/r/openpowerquality/health/tags](https://hub.docker.com/r/openpowerquality/health/tags)  |
 | mauka   | [https://hub.docker.com/r/openpowerquality/mauka/tags](https://hub.docker.com/r/openpowerquality/mauka/tags) |
 | makai   | [https://hub.docker.com/r/openpowerquality/makai/tags](https://hub.docker.com/r/openpowerquality/makai/tags)  |
 | view   | [https://hub.docker.com/r/openpowerquality/view/tags](https://hub.docker.com/r/openpowerquality/view/tags)  |
 | box-update-server    | [https://hub.docker.com/r/openpowerquality/box-update-server/tags](https://hub.docker.com/r/openpowerquality/box-update-server/tags)  |
 
 Third, invoke the docker tag command to attach the new version number. For example, here is the command to tag the newly built image for the View service (called "latest") with the new version number 1.5.0:
 
 ```shell
 $ docker tag view:latest openpowerquality/view:1.5.0
 ``` 
 
 Fourth, publish the tagged image to DockerHub. To do this, login to your DockerHub account by invoking the `docker login` command.
 
 Then push the image to the openpowerquality organization on DockerHub by invoking the `docker push` command. Here's an example of pushing the View service image that's been tagged with the new version number 1.5.0:
 
 ```shell
 $ docker push openpowerquality/view:1.5.0
 The push refers to repository [docker.io/openpowerquality/view]
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
 
 ## Update the OPQ Docker Compose .env file
 
 Once the image containing the new version of your service is pushed to DockerHub, you can now update the Docker Compose .env file in the opq-docker repository to indicate that future installations and updates of OPQ Cloud installations should use this new image.
 
 To do this, checkout the  [OPQ Docker Repository](https://github.com/openpowerquality/opq-docker) from GitHub. You must have commit privileges to this repo. 
 
 Next, edit the .env file.  The first section of the file specifies the versions of the image files for the various services. A recent version looks like this:
 
 ```
MAKAI_IMAGE=openpowerquality/makai:1.0.2
MAUKA_IMAGE=openpowerquality/mauka:1.0.2
HEALTH_IMAGE=openpowerquality/health:1.0.1
VIEW_IMAGE=openpowerquality/view:1.0.1
BOXUPDATESERVER_IMAGE=openpowerquality/box-update-server:1.0.0
```

Edit this file to update the version number associated with your service to its new version number.

Commit this change to GitHub.

## Create a new opq-docker release

Now it is time to document your update. We do this by making an [opq-docker release](https://github.com/openpowerquality/opq-docker/releases). 

Please name your release as a date in YYYY-MM-DD format. Use the description field to briefly describe what service(s) were updated in this release and what changes were made to each service since the last release. 

## Install your update

If you now want to install your update in a running OPQ Cloud instance, please see [Upgrading to new OPQ Cloud releases](cloud-installation.html#upgrading-to-new-opq-cloud-releases)
