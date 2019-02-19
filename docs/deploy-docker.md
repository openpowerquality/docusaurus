---
title: Deployment: Docker
sidebar_label: Docker
---


## Overview

We utilize [Docker](https://www.docker.com/) to containerize each of our services into easy-to-deploy bundles. In combination with [Docker Compose](https://docs.docker.com/compose/), the task of deploying and running a new OPQ Cloud instance has become a greatly simplified process.

This guide will be covering three separate concerns:
  1. Deploying a new OPQ Cloud instance on production
  2. Creating new OPQ docker images
  3. Publishing new OPQ docker images

Since we provide our own [official OPQ releases](https://hub.docker.com/u/openpowerquality) on DockerHub, you are free to skip the image building and publishing process entirely if you are only interested in deploying an official OPQ release.

To illustrate the simplicity of deploying an official OPQ release with Docker, we will discuss that process first.

Then, we will discuss how to build your own Docker images, as well as how to push them to DockerHub.

Note: We are still in the process of Dockerizing our OPQ services. The following lists the Dockerized services and the location of their Docker-related files:
  * View: `opq/view/docker`
  * Mauka: `opq/mauka/docker`
  * Health: `opq/health/docker`
  * Box Updater: `opq/util/box-update-server/docker`
  * Mongo: No files necessary; we use the official Mongo image without modification.

### Pre-requisites

Make sure you have Docker and Docker-Compose installed on your development and production systems.

Please refer to the official [Docker documentation](https://docs.docker.com/install/) for installation instructions.

Also see the official [Docker-Compose documentation](https://docs.docker.com/compose/install/).

### Overview of Docker-related files

There are two sets of Docker-related files to be aware of:
  1. Individual OPQ service Docker files, found in each service's respective `/docker` subdirectory (e.g. `opq/view/docker`).
  2. Docker-Compose files, found in the `opq/util/docker-deployment` directory.
  3. Docker deployment utility files, found in the `opq/util/docker-utils` directory.

#### Dockerized OPQ service files
Each Dockerized OPQ service has a `/docker` subdirectory with a common set of files:
  *  `Dockerfile`: Contains the configuration for building the Docker image. Used by the `docker-build.sh` script.
  * `docker-build.sh`: A script for building a new Docker image.
  * `docker-publish.sh`: A script for publishing a new image to DockerHub.
  * `docker-run.sh`: A script for running the docker image as a standalone instance. Note that we actually use Docker-Compose to handle the task of running all OPQ images together, so this file is generally only used for debugging purposes.
  
#### Docker-Compose files
Docker-Compose is responsible for orchestrating how each of our OPQ services work together.

These files can be found in the `opq/util/docker-deployment` directory:
  * `docker-compose.yml`: The configuration file for Docker-Compose.
  * `.env`: Contains environment variables that are substituted into the docker-compose.yml file.
  * `docker-compose-run.sh`: A script for launching Docker-Compose. Also defines additional environment variables.

#### Utility files
The files found in the `opq/util/docker-utils` directory are helper scripts meant to aid with the deployment of OPQ on the Emilia server:
  * `deploy-transfer.sh`: Transfers latest deployment related files to the Emilia server.
  * `docker-prepare-and-run.sh`: Helper script that copies (and overwrites existing) deployment files into the dedicated deployment directory on Emilia, before invoking the `docker-compose-run.sh` script to initiate (re)deployment.


## Deployment

Before we begin, make sure you have Docker and Docker-Compose installed on your production system.

The `opq/util/docker-deployment` directory contains all the files required for deployment.

Deployment is a very straight-forward process:
  1. Transfer the latest contents of the `opq/util/docker-deployment` directory into a dedicated deployment directory of your choice on your production server, overwriting all older deployment files as necessary.
  2. Invoke the `docker-compose-run.sh` script to re-deploy the OPQ Cloud instance.

This is essentially all that is required to deploy your own OPQ Cloud instance.

However, OPQ developers deploying on the Emilia server can (and should) use the helper scripts we provide to streamline
this entire process. The deployment walk-through below details this further.


### Deployment Walk-through

Note: This deployment walk-through is specific for OPQ developers deploying on the Emilia server.

#### Transfer deployment files to production server

Invoke the `deploy-transfer.sh` script found in the `opq/util/docker-utils` directory.

This script creates a timestamp-named directory, copies the contents of the `opq/util/docker-deployment` directory into it (as well as the `docker-prepare-and-run.sh` helper script),
gzips the new directory, and then secure copies it to the Emilia server under the `/home/opquser/docker/transfers` directory.

```
$ ./deploy-transfer.sh
++ date +%Y%m%d_%H%M%S
+ timestamp=20190219_123528
+ mkdir 20190219_123528
+ cp ../docker-deployment/docker-compose.yml 20190219_123528
+ cp ../docker-deployment/docker-compose-run.sh 20190219_123528
+ cp ../docker-deployment/.env 20190219_123528
+ cp docker-prepare-and-run.sh 20190219_123528
+ tar czf 20190219_123528.tar.gz 20190219_123528
+ rm -rf 20190219_123528
+ EMILIA_DOCKER_TRANSFER_DIR=/home/opquser/docker/transfers
+ scp -P 29862 20190219_123528.tar.gz opquser@emilia.ics.hawaii.edu:/home/opquser/docker/transfers
opquser@emilia.ics.hawaii.edu's password:
20190219_123528.tar.gz                                                                                                                                                                                      100% 2169     2.1KB/s   00:01
+ set +x
```


#### Extract deployment files on production server

Now we need to unpack the deployment files that we had just transferred.

First, ssh to the server with the proper credentials:

```
ssh -p 29862 opquser@emilia.ics.hawaii.edu
```

Change into the `docker/transfers` subdirectory, and list the files:

```
opquser@emilia:~$ cd docker/transfers
opquser@emilia:~/docker/transfers$ ls -al
total 20
drwxr-xr-x 3 opquser opquser 4096 Feb 19 07:38 .
drwxr-xr-x 4 opquser opquser 4096 Feb 18 17:40 ..
drwxr-xr-x 2 opquser opquser 4096 Feb 18 17:00 20190206_144024
-rw-r--r-- 1 opquser opquser 1201 Feb 18 15:25 20190206_144024.tar.gz
-rw-r--r-- 1 opquser opquser 2169 Feb 19 07:35 20190219_123528.tar.gz
```

You may see one or more timestamped tar.gz files and directories. Each of these correspond to a previous deployment transfer.
While it's generally a good idea to keep this directory clean, it can be useful to keep at least one previous deployment in this directory to fall back on, just in case a problem is encountered with the latest deployment.

The most recently timestamped tar.gz file will be the one that you had just transferred over.
Extract it:

```
opquser@emilia:~/docker/transfers$ tar xf 20190219_123528.tar.gz
```

Change into the extracted directory and list all files:

```
opquser@emilia:~/docker/transfers$ cd 20190219_123528
opquser@emilia:~/docker/transfers/20190219_123528$ ls -al
total 24
drwxr-xr-x 2 opquser opquser 4096 Feb 19 07:35 .
drwxr-xr-x 4 opquser opquser 4096 Feb 19 07:40 ..
-rwxr-xr-x 1 opquser opquser  571 Feb 19 07:35 docker-compose-run.sh
-rw-r--r-- 1 opquser opquser 2463 Feb 19 07:35 docker-compose.yml
-rwxr-xr-x 1 opquser opquser  591 Feb 19 07:35 docker-prepare-and-run.sh
-rw-r--r-- 1 opquser opquser 2258 Feb 19 07:35 .env
```

You might be surprised how few files we have here, but that is the beauty of Docker and Docker-Compose.
Since the OPQ images are hosted on DockerHub, Docker will simply pull them from the cloud if they have not been downloaded yet on the host system.


#### Run the new OPQ Cloud instance

Finally, invoke the `docker-prepare-and-run.sh` script to deploy the latest OPQ Cloud instance:

```
opquser@emilia:~/docker/transfers/20190219_123528$ ./docker-prepare-and-run.sh
Creating deployment_boxupdateserver_1 ... done
Creating deployment_mongo_1           ... done
Creating deployment_view_1            ... done
Creating deployment_mauka_1           ... done
Creating deployment_health_1          ... done
```

We're deployed! The `docker-prepare-and-run.sh` file is a simple helper script that does two things for us:
  1. Copies the extracted deployment files to our dedicated deployment directory at `/home/opquser/docker/deployment`, overwriting previous deployment files as necessary.
  2. Invokes the Docker-Compose run script `docker-compose-run.sh` to (re)deploy the OPQ Cloud instance. Docker-Compose is intelligent enough to detect the difference of deployment files and will only re-deploy the necessary services for us.

You may verify that the Docker containers are up and running with the `docker ps` command.


## Developer Tasks

The following sections will cover how to:
  1. Create a new image for a given OPQ service.
  2. Publish images to the official OPQ DockerHub repository.

The general workflow will involve performing these tasks sequentially - first creating the new image, and then publishing it to the official DockerHub repository.

Each dockerized OPQ service has its own `/docker` subdirectory containing scripts that greatly simplify these two tasks.

When creating and publishing a new image for an OPQ service, there are three files that you need to be concerned about:
  1. The `docker-build.sh` script, found in the `opq/<service-name>/docker` directory.
  2. The `docker-publish.sh` script, also found in the `opq/<service-name>/docker` directory.
  3. The `.env` file, found in the `opq/util/docker-deployment` directory.

The `.env` file is a special Docker-Compose file that we also utilize when publishing new images. This is explained in further detail below.


### Creating new Docker images

Creating a new Docker image for a given OPQ service is simply just a matter of invoking its `docker-build.sh` script.

To build a new Docker image for a given OPQ service:
  1. `cd` into the service's `/docker` subdirectory (e.g. opq/view/docker).
  2. Invoke the `docker-build.sh` script, and wait for the build process to complete.

That's it! Each OPQ service's respective `docker-build.sh` script might have varying output due to differences in that service's build process, 
but the end result will always be the same: a new Docker image named `<opq-service-name>:latest`.

Once the script has finished running, you should confirm that the image has been successfully created by invoking the `docker image ls` command.

Since our build scripts do not explicitly provide an image tag for the build process, the `latest` tag is automatically provided for us.
This is important to note, because as we will explain below, each OPQ service's `docker-publish.sh` script will, by default, rename and push this `<opq-service-name>:latest` image to DockerHub.


### Publishing images to DockerHub

Note: Before continuing, make sure you have obtained the credentials for the official OPQ DockerHub account.

Publishing a new Docker image for a given OPQ service a straight-forward process:
  1. If publishing a **new** version of an image, modify the appropriate variable in the `opq/util/docker-deployment/.env` file with the new image version tag.
  2. Login to the official OPQ DockerHub account by invoking `docker login` and enter your credentials. If you are already logged-in but unsure which account you are on, you may invoke `docker logout` first.
  3. `cd` into the service's `/docker` subdirectory (e.g. `opq/mauka/docker`) and invoke the `docker-publish.sh` script.
  4. If you modified the `.env` file, commit and push it to GitHub with a useful message (e.g. `Publish Mauka 0.1.1`).

As we explain below, the `.env` file is actually a special Docker-Compose file.
For now, you just need to understand that the `.env` file has an environment variable definition for each OPQ service's DockerHub repository image name.

Each OPQ service's `docker-publish.sh` script parses the `.env` file for the appropriate variable so that it knows exactly how to tag and push the new image.
If this sounds confusing, it's really not! Let's look at an example below:

#### Publishing Walk-through

Assume that we just created a new Mauka image by invoking its `docker-build.sh` script.
The newly created image is automatically named `opqmauka:latest`, which you can confirm by invoking `docker image ls`.

#### Update the `.env` file

Our goal is to publish this new image to DockerHub, also giving it a new version `0.1.1` (previously `0.1.0`)

**Prior** to publishing the new Mauka image, the `.env` file (found in `opq/util/docker-deployment`) might look like the following:

```
MAUKA_IMAGE=openpowerquality/opqmauka:0.1.0
HEALTH_IMAGE=openpowerquality/opqhealth:0.1.0
VIEW_IMAGE=openpowerquality/opqview:0.1.0
```

With the goal of publishing a new Mauka image (version 0.1.1), simply modify the `MAUKA_IMAGE` variable in the `.env` file, like so:
```
MAUKA_IMAGE=openpowerquality/opqmauka:0.1.1
HEALTH_IMAGE=openpowerquality/opqhealth:0.1.0
VIEW_IMAGE=openpowerquality/opqview:0.1.0
```

#### Login to DockerHub

Obtain the official OPQ DockerHub account credentials, and then invoke `docker login`.

If you are unsure which account you are currently logged into, you may invoke `docker logout` first.

```
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: openpowerquality
Password:
<some lines removed>

Login Succeeded
```

#### Invoke the publish script

We're publishing a new Mauka image, so `cd` into `opq/mauka/docker` and invoke the `docker-publish.sh` script.

When you invoke the `docker-publish.sh` script, it will provide information on how the image will be tagged, and give you an opportunity to abort the script should you need to make modifications.

As you can see below, the `docker-publish.sh` script simply tags Mauka's newest image `opqmauka:latest` as `openpowerquality/opqmauka:0.1.1` (as defined in the `.env` file), and pushes it to DockerHub.

Reminder: As we briefly explained in the 'Creating new Docker images' section, whenever you create a new image with the `docker-build.sh` script, Docker will automatically tag that new image with `latest`.

```
$ cd opq/mauka/docker
$ ./docker-publish.sh
=> This will tag the 'opqmauka:latest' image as 'openpowerquality/opqmauka:0.1.1' and push to your Docker registry.
=> If you need to change the destination image tag (openpowerquality/opqmauka:0.1.1), you can abort this script
and modify the 'MAUKA_IMAGE' variable found in the 'opq/util/docker-deployment/.env' file.
=> In addition, please ensure that you are logged into the correct Docker registry account before continuing.
=> Continue? (y/n): y
```

In our case, everything looks good, so we enter `y` to continue, and the image is then pushed to DockerHub!

```
=> Tagging 'opqmauka:latest' image as 'openpowerquality/opqmauka:0.1.1'...
=> Pushing the 'openpowerquality/opqmauka:0.1.1' image to registry...
The push refers to repository [docker.io/openpowerquality/opqmauka]
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

#### Commit and push the updated `.env` file to GitHub

As a final step, if you have modified the `.env` file in order to publish a new version (as we did in the Mauka example),
be sure to commit and push the file to GitHub with a useful commit message (e.g. `Publish Mauka 0.1.1`).

By doing so, we accomplish two useful things:
  1. The world is aware of the latest available Docker image versions for each OPQ service.
  2. We can easily correlate OPQ releases with Git history.


### Understanding Docker-Compose and the .env file

The `opq/util/docker-deployment` directory contains all of the Docker-Compose related files, the most important of which is the `docker-compose.yml` file.

The `docker-compose.yml` file is the configuration file for Docker-Compose, which is responsible for orchestrating how each of our OPQ services work together.
Among other things, this is where we define the Docker image to use for each service.

Rather than hard-coding each OPQ service’s image name directly into the `docker-compose.yml` file, 
we instead opt to use the special [Docker-Compose `.env` file](https://docs.docker.com/compose/environment-variables/#the-env-file) to hold environment variables for these values.
Later, when Docker-Compose is launched, these variables are automatically substituted into the `docker-compose.yml` file.

It’s important to understand that the image names used in our `.env` file are DockerHub-valid image names in the form of:

`<dockerhub-username>/<repository-name>:<tag>`

For example, `openpowerquality/opqview:1.2.8`

Why does this matter? Because when Docker-Compose launches on the host system (or in our case, when we invoke the `docker-compose.run.sh` script), it will automatically pull these images from DockerHub if they have not been previously downloaded.
As you can imagine, this greatly simplifies the deployment process. Updating the system to run on the latest OPQ images is essentially just a matter of grabbing the latest `.env` file.

Our approach to image publication takes advantage of this `.env` file:

Each service’s respective `docker-publish.sh` script parses the Docker-Compose `.env` file for the appropriate image name.
Since these image names are, in fact, valid DockerHub repository image names, our `docker-publish.sh` script uses the image name to tag and push to DockerHub.

When a developer wishes to publish a new version of an OPQ service, it is simply a matter of modifying the `.env` file
with the new desired version prior to running the `docker-publish.sh` script.

It’s the developer’s responsibility to remember to commit the updated `.env` file to the GitHub repository.

By doing so, the developer ensures that:
  1. The world is aware of the latest available Docker image versions for each OPQ service.
  2. We can easily correlate OPQ releases with Git history
