---
title: Deployment: Docker
sidebar_label: Docker
---

We utilize [Docker](https://www.docker.com/) to containerize each of our services into easy to deploy bundles. In combination with [Docker Compose](https://docs.docker.com/compose/), the task of deploying a new OPQ instance has become a greatly simplified process.

Note: Currently, only the Mauka, Health, and View services have been "Dockerized".

## Overview

Before we begin, it's important to understand that there are two separate concerns we will be covering: building new production docker images for each service, and running the images on the server.

These two concerns are not necessarily interdependent. Since we provide our own [official OPQ releases](https://cloud.docker.com/u/openpowerquality) on DockerHub, you are free to skip the building process entirely if you are only interested in deploying an official OPQ release.

To illustrate the simplicity of deploying an official OPQ release with Docker, we will discuss that process first.

Then, we will discuss how to build your own Docker images, as well as how to push them to DockerHub.

### Pre-requisites

Make sure you have Docker and Docker compose installed on your system.

Please refer to the [official Docker documentation](https://docs.docker.com/install/) for installation instructions.


### Server-side deployment

The `opq/util/docker` directory contains two files that you need to be aware of:

  * `docker-compose.yml`: Contains the Docker Compose configuration settings.
  * `docker-compose-run.sh`: A script for running Docker Compose (and thus the entire OPQ system) on the server. In addition, it sets the environment variables that are required by our services.
  
The `docker-compose.yml` file is currently pre-configured to pull and run official OPQ releases from DockerHub. This makes deployment almost trivial:

First, be sure that you have Docker and Docker Compose installed on your server environment.

Second, transfer the contents of `opq/util/docker` to a directory of your choice on your server. In addition, ensure that the secret OPQView `settings.production.json` file sits within the directory.

Finally, `cd` into the target directory and invoke `./docker-compose-run.sh` to run the entire OPQ system.
Docker Compose will automatically pull and download the appropriate OPQ images from DockerHub if you have not previously downloaded them yet.


### Building new Docker images

Note: Currently, only Mauka, Health, and View has been dockerized.

Each OPQ service should have its own `/docker` directory that contains three files:
  * `Dockerfile`: Contains the configuration for building the image.
  * `docker-build.sh`: A script for building a new docker image.
  * `docker-run.sh`: A script for running the docker image by itself. Note that this file is likely to be removed, because we now Docker Compose to run all of our Docker images together.
  
To build a new Docker image, `cd` into the service of choice and invoke the corresponding `./docker-build.sh` script and wait until the build process completes.

That's it! You can double check that your newly created image has successfully created with the `docker image ls` command.

### Uploading to DockerHub

(In progress)
