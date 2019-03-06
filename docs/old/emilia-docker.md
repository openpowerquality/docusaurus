---
title: Using Docker on Emilia
sidebar_label: Docker
---

## Overview

We utilize [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) to containerize and deploy the OPQ Services: View, Mauka, Makai, Health, and Box Updater.  For Mongo, we use the official Mongo image without modification.


### Docker and Docker Compose Installation

Make sure you have Docker and Docker-Compose installed on your development and production systems.

Please refer to the official [Docker documentation](https://docs.docker.com/install/) for installation instructions.

Also see the official [Docker-Compose documentation](https://docs.docker.com/compose/install/).


## Deployment

Before we begin, make sure you have Docker and Docker-Compose installed on your production system.

The `opq/util/docker-deployment` directory contains all the files required for deployment.

Ensure that you have the latest versions of these files by pulling the latest changes on the master branch of the OPQ GitHub repository.
By doing so, you also ensure that your deployment will be running on all the latest available OPQ docker images.

Deployment is a very straight-forward process:
  1. Transfer the latest contents of the `opq/util/docker-deployment` directory into a dedicated deployment directory of your choice on your production server, overwriting all previous deployment files.
  2. Ensure that the `settings.production.json` file is also placed in your dedicated deployment directory.
  3. Invoke the `docker-compose-run.sh` script to re-deploy the OPQ Cloud instance.

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
