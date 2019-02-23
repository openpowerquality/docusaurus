---
title: Docker
sidebar_label: Docker
---

## Overview

We utilize [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) to containerize and deploy the OPQ Services: View, Mauka, Makai, Health, and Box Updater.  For Mongo, we use the official Mongo image without modification.


## Docker and Docker Compose

Make sure you have Docker and Docker-Compose installed on your development and production systems.

Please refer to the official [Docker documentation](https://docs.docker.com/install/) for installation instructions.

Also see the official [Docker-Compose documentation](https://docs.docker.com/compose/install/).

## Docker file structure

Each dockerized OPQ service has its own `/docker` subdirectory containing scripts that simplify the task of building and publishing Docker images.

When building and publishing a new image for an OPQ service, there are three files that you need to be concerned about:

  1. The `docker-build.sh` script, found in the `opq/<service-name>/docker` directory.
  2. The `docker-publish.sh` script, also found in the `opq/<service-name>/docker` directory.
  3. The `.env` file, found in the `opq/util/docker-deployment` directory.

The `.env` file is a special Docker-Compose file that we also utilize when publishing new images.

See the 'Understanding Docker-Compose and the .env file' section further below if you wish to learn more about this important file.


## Build an image

Building a new Docker image for a given OPQ service is simply just a matter of invoking its `docker-build.sh` script.

To build a new Docker image for a given OPQ service:

  1. `cd` into the service's `/docker` subdirectory (e.g. opq/view/docker).
  2. Invoke the `docker-build.sh` script, and wait for the build process to complete.

Each OPQ service's respective `docker-build.sh` script might have varying output due to differences in that service's build process, but the end result will always be the same: a new Docker image named `<opq-service-name>:latest`.

Once the script has finished running, you should confirm that the image has been successfully created by invoking the `docker image ls` command.

Since our build scripts do not explicitly provide an image tag for the build process, the `latest` tag is automatically provided for us.
You can also confirm this by invoking the `docker image ls` command.

This is important to note, because each OPQ service's `docker-publish.sh` script will, by default, rename and push this `<opq-service-name>:latest` image to DockerHub.


## Publish image to DockerHub

First, make sure that your DockerHub account is a member of the official `openpowerquality` DockerHub organization.

Publishing a new Docker image for a given OPQ service involves the following steps:

  1. If publishing a **new** version of an image, modify the appropriate variable in the `opq/util/docker-deployment/.env` file with the new image version tag.

  2. Login to your OPQ DockerHub account by invoking `docker login` and enter your credentials.

  3. `cd` into the service's `/docker` subdirectory (e.g. `opq/mauka/docker`) and invoke the `docker-publish.sh` script.

  4. If you modified the `.env` file, commit and push it to GitHub with a useful message (e.g. `Publish Mauka 0.1.1`).

As we explain in the 'Understanding Docker-Compose and the .env file' section further below, the `.env` file is actually a special Docker-Compose file.  For now, you just need to understand that the `.env` file has an environment variable definition for each OPQ service's DockerHub repository image name.

Each OPQ service's `docker-publish.sh` script parses the `.env` file for the appropriate image name variable so that it knows exactly how to tag and push the new image.

## Publish example

Assume that we just created a new Mauka image by invoking its `docker-build.sh` script.
The newly created image is automatically named `mauka:latest`, which you can confirm by invoking `docker image ls`.

### Update the `.env` file

Our goal is to publish this new image to DockerHub, also giving it a new version `0.1.1` (previously `0.1.0`)

**Prior** to publishing the new Mauka image, the `.env` file (found in `opq/util/docker-deployment`) might look like the following:

```
MAUKA_IMAGE=openpowerquality/mauka:0.1.0
HEALTH_IMAGE=openpowerquality/health:0.1.0
VIEW_IMAGE=openpowerquality/view:0.1.0
```

With the goal of publishing a new Mauka image (version 0.1.1), simply modify the `MAUKA_IMAGE` variable in the `.env` file, like so:
```
MAUKA_IMAGE=openpowerquality/mauka:0.1.1
HEALTH_IMAGE=openpowerquality/health:0.1.0
VIEW_IMAGE=openpowerquality/view:0.1.0
```

### Login to DockerHub

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

### Invoke the publish script

We're publishing a new Mauka image, so `cd` into `opq/mauka/docker` and invoke the `docker-publish.sh` script.

When you invoke the `docker-publish.sh` script, it will provide information on how the image will be tagged, and give you an opportunity to abort the script should you need to make modifications.

As you can see below, the `docker-publish.sh` script simply tags the most recently created local Mauka image `mauka:latest` as `openpowerquality/mauka:0.1.1` (as defined in the `.env` file), and pushes it to DockerHub.

Reminder: As we briefly explained in the 'Creating new Docker images' section, whenever you create a new image with the `docker-build.sh` script, Docker will automatically tag that new image with `latest`.

```
$ cd opq/mauka/docker
$ ./docker-publish.sh
=> This will tag the 'mauka:latest' image as 'openpowerquality/mauka:0.1.1' and push to your Docker registry.
=> If you need to change the destination image tag (openpowerquality/mauka:0.1.1), you can abort this script
and modify the 'MAUKA_IMAGE' variable found in the 'opq/util/docker-deployment/.env' file.
=> In addition, please ensure that you are logged into your DockerHub account before continuing.
=> Continue? (y/n): y
```

In our case, everything looks good, so we enter `y` to continue, and the image is then pushed to DockerHub!

```
=> Tagging 'mauka:latest' image as 'openpowerquality/mauka:0.1.1'...
=> Pushing the 'openpowerquality/mauka:0.1.1' image to registry...
The push refers to repository [docker.io/openpowerquality/mauka]
3c64a2f29066: Pushed
c40f7a899b1c: Pushed
16cb62492495: Pushed
c9701db5aa5b: Layer already exists
590ee04d598a: Layer already exists
a62b97ef6d9f: Layer already exists
be59bd55864a: Layer already exists
a19cb627cc73: Layer already exists
ab016c9ea8f8: Layer already exists
2eb1c9bfc5ea: Layer already exists
0b703c74a09c: Layer already exists
b28ef0b6fef8: Layer already exists
0.1.1: digest: sha256:91d592e4cc9c2febdfaf689a53d7a70a755de944801756b6015fdd974f41a1c4 size: 2849
```

Note: The `Layer already exists` messages are normal and should be expected. Docker images are built on layers, and knows how to effectively reuse layers from pre-existing images.

The image is now published!
You can visit the [official OPQ DockerHub](https://hub.docker.com/u/openpowerquality) page to double check that your new image has been successfully published.

### Commit and push the updated `.env` file to GitHub

As a final step, if you have modified the `.env` file in order to publish a new version (as we did in the Mauka example),
be sure to commit and push the file to GitHub with a useful commit message (e.g. `Publish Mauka 0.1.1`).

By doing so, we accomplish two useful things:
  1. The world is aware of the latest available Docker image versions for each OPQ service.
  2. We can easily correlate OPQ releases with Git history.



## Overview of OPQ Docker files

There are two kinds of Docker-related files to be aware of:
  1. Individual OPQ service Docker files, found in each service's respective `/docker` subdirectory (e.g. `opq/view/docker`).
  2. Docker deployment utility files, found in the `opq/util/docker-utils` directory.
  3. Docker installation scripts, found in the openpowerquality/docker repository.

### OPQ Cloud Docker files

Each OPQ Cloud service has a `/docker` subdirectory with a common set of files:

  *  `Dockerfile`: Contains the configuration for building the Docker image. Used by the `docker-build.sh` script.
  * `docker-build.sh`: A script for building a new Docker image.
  * `docker-publish.sh`: A script for publishing a new image to DockerHub.
  * `docker-run.sh`: A script for running the docker image as a standalone instance. Note that we actually use Docker-Compose to handle the task of running all OPQ images together, so this file is generally only used for debugging purposes.

### Docker-Compose files

Docker-Compose is responsible for orchestrating how each of our OPQ services work together.

These files can be found in the openpowerquality/docker repository.

  * `docker-compose.yml`: The configuration file for Docker-Compose.
  * `.env`: Contains environment variables that are substituted into the docker-compose.yml file.
  * `docker-compose-run.sh`: A script for launching Docker-Compose. Also defines additional environment variables.

### Utility files

The files found in the `opq/util/docker-utils` directory are helper scripts meant to aid with the deployment of OPQ on the Emilia server:
  * `deploy-transfer.sh`: Transfers latest deployment related files to the Emilia server.
  * `docker-prepare-and-run.sh`: Helper script that copies (and overwrites existing) deployment files into the dedicated deployment directory on Emilia, before invoking the `docker-compose-run.sh` script to initiate (re)deployment.

## Understanding Docker-Compose and the .env file

The openpowerquality/docker repository contains all of the Docker-Compose related files, the most important of which is the `docker-compose.yml` file.

The `docker-compose.yml` file is the configuration file for Docker-Compose, which is responsible for orchestrating how each of our OPQ services work together. Among other things, this is where we define the Docker image to use for each service.

Rather than hard-coding each OPQ service’s image name directly into the `docker-compose.yml` file, we instead opt to use the special [Docker-Compose `.env` file](https://docs.docker.com/compose/environment-variables/#the-env-file) to hold environment variables for these values. Later, when Docker-Compose is launched, these variables are automatically substituted into the `docker-compose.yml` file.

It’s important to understand that the image names used in our `.env` file are DockerHub-valid image names in the form of:

`<dockerhub-organization>/<repository-name>:<tag>`

For example, `openpowerquality/view:1.2.8`

Why does this matter? Because when Docker-Compose launches on the host system (or in our case, when we invoke the `docker-compose.run.sh` script), it will automatically pull these images from DockerHub if they have not been previously downloaded. As you can imagine, this greatly simplifies the deployment process. Updating the system to run on the latest OPQ images is essentially just a matter of grabbing the latest `.env` file.

Our approach to image publication takes advantage of this `.env` file:

Each service’s respective `docker-publish.sh` script parses the Docker-Compose `.env` file for the appropriate image name.
Since these image names are, in fact, valid DockerHub repository image names, our `docker-publish.sh` script uses the image name to tag and push to DockerHub.

When a developer wishes to publish a new version of an OPQ service, it is simply a matter of modifying the `.env` file
with the new desired version prior to running the `docker-publish.sh` script.

It’s the developer’s responsibility to remember to commit the updated `.env` file to the GitHub repository.

By doing so, the developer ensures that:
  1. The world is aware of the latest available Docker image versions for each OPQ service.
  2. We can easily correlate OPQ releases with Git history
