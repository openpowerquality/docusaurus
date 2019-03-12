---
title: OPQ Cloud Installation
sidebar_label: Installation
---

OPQ Cloud currently consists of six services: OPQ Makai (for triggering and collecting power quality data from boxes), OPQ Mauka (for analysis and classification of power quality data), OPQ View (for data visualization and system management), OPQ Health (for monitoring boxes and services), OPQ Box Updater (for over-the-air updates to the Box software), and MongoDB (the backend database system).

We utilize [Docker](https://www.docker.com/) to manage the installation of each of these OPQ Cloud services.

We publish official Docker images for all of these services to the [Open Power Quality organization at DockerHub](https://hub.docker.com/u/openpowerquality).  In a nutshell, to install OPQ Cloud, you must:

  1. Install Docker and Docker Compose on your production system.
  2. Download the OPQ Docker GitHub repository containing all the necessary shell scripts and configuration files required to run OPQ Cloud.
  3. Edit the configuration files appropriately for your local installation.
  4. Run the `docker-compose-run.sh` script to bring up the OPQ Cloud services.
  5. Verify installation by visiting the OPQ View landing page.
  5. Complete the installation by logging in to OPQ View.

Note: OPQ Cloud can currently be installed only on Unix (Macintosh and Linux) systems.

## Install Docker and Docker Compose

The first step in installing OPQ Cloud is to install Docker and Docker Compose on your production system.

Please consult the [Docker installation documentation](https://docs.docker.com/install/) and the [Docker Compose installation documentation](
https://docs.docker.com/compose/install/) for instructions.

## Download the openpowerquality/opq-docker GitHub repository

Next, download the [OPQ Docker GitHub repository](https://github.com/openpowerquality/opq-docker). 

You can either download it as a zip file and uncompress it to create a local directory named "opq-docker-master", or clone it from GitHub with `git clone https://github.com/openpowerquality/opq-docker.git` - which will create a local directory named "opq-docker".

The advantage to the latter approach is that if we make updates to the files, you can get the changes easily by pulling them from GitHub. Otherwise, you have to download a new zip file and migrate your changes into it.

## Copy and edit configuration files

Your local opq-docker directory contains a subdirectory called "sample-config" containing a set of configuration files for each of the services.

These sample configuration files provide the recommended default values for most configuration variables that are appropriate for normal installations.

### Copy configuration files

As the directory name implies, the "sample-config" files are just a set of recommended default configuration files.

In order for OPQ Cloud to deploy successfully, it expects to find these files in a directory named "config" - which you will need to create yourself for your OPQ Cloud installation.

Change into the top-level directory and copy all the default configuration files by invoking:

```
mkdir config
cp -R sample-config/* config
```

### Edit the view.config.json file

While we recommend initially using the default values provided by our sample configuration files, there is one configuration file that you **must** modify in order to create an initial OPQ Cloud user: `view.config.json`.

Change into the `config/view` directory and edit the `view.config.json` file.

Look for a section called "userProfiles", which has one entry with all blank fields. You will want to fill out the "username" field with an email address of an admin at your site (for example, "johnson@hawaii.edu"), provide a password (for example, "6ydhdk3ac!"), a first name (for example, "Philip"), last name (for example, "Johnson"), and role (which should be "admin").

## Bring up services

Now, cd into the top-level directory, where you should find a script called `docker-compose-run.sh`.  To make it executable, invoke:

```shell
chmod 775 docker-compose-run.sh
```

Now invoke it with:

```shell
./docker-compose-run.sh
```

This will download all the latest official public images for each of the OPQ Cloud services, and run them.  The output should look like this:

```shell
$ ./docker-compose-run.sh
Creating network "opq-docker_default" with the default driver
Pulling mongo (mongo:4.0.5)...
4.0.5: Pulling from library/mongo
7b722c1070cd: Pull complete
5fbf74db61f1: Pull complete
ed41cb72e5c9: Pull complete
7ea47a67709e: Pull complete
778aebe6fb26: Pull complete
3b4b1e0b80ed: Pull complete
844ccc42fe76: Pull complete
eab01fe8ebf8: Pull complete
e5758d5381b1: Pull complete
a795f1f35522: Pull complete
67bc6388d1cd: Pull complete
89b55f4f3473: Pull complete
10886b20b4fc: Pull complete
Pulling view (openpowerquality/view:1.0.0)...
1.0.0: Pulling from openpowerquality/view
f189db1b88b3: Pull complete
3d06cf2f1b5e: Pull complete
687ebdda822c: Pull complete
99119ca3f34e: Pull complete
e771d6006054: Pull complete
b0cc28d0be2c: Pull complete
9bbe77ca0944: Pull complete
75f7d70e2d07: Pull complete
f70d7ef53f76: Pull complete
596c5fb5e7e7: Pull complete
cafea2ea58df: Pull complete
Pulling makai (openpowerquality/makai:1.0.1)...
1.0.1: Pulling from openpowerquality/makai
ae11a5913a58: Pull complete
3ce739f90f20: Pull complete
6b2875055ebc: Pull complete
d107d79a2a01: Pull complete
b0fc967adfd7: Pull complete
408db9a181c3: Pull complete
2d749b78ede9: Pull complete
37e94afe8a77: Pull complete
6328efdc5f7c: Pull complete
db943cd8d815: Pull complete
f446b20f5e29: Pull complete
290291559557: Pull complete
3c06c7f85116: Pull complete
3f10433be88d: Pull complete
Pulling mauka (openpowerquality/mauka:1.0.1)...
1.0.1: Pulling from openpowerquality/mauka
6c40cc604d8e: Pull complete
eb28c72fd5c9: Pull complete
8b7b7e8a3ec6: Pull complete
07400c149ca6: Pull complete
93b52b0b4673: Pull complete
d3bbba19a0da: Pull complete
7bb2c64cc517: Pull complete
59a0d300c126: Pull complete
3653218ed311: Pull complete
ed0160d19280: Pull complete
fe748bad2346: Pull complete
Pulling health (openpowerquality/health:1.0.1)...
1.0.1: Pulling from openpowerquality/health
741437d97401: Pull complete
34d8874714d7: Pull complete
0a108aa26679: Pull complete
7f0334c36886: Pull complete
65c95cb8b3be: Pull complete
9107d7193263: Pull complete
dd6f212ec984: Pull complete
43288b101abf: Pull complete
f68aede0db03: Pull complete
3d7e15d338f3: Pull complete
1267bc468955: Pull complete
Pulling boxupdateserver (openpowerquality/box-update-server:1.0.0)...
1.0.0: Pulling from openpowerquality/box-update-server
48ecbb6b270e: Pull complete
692f29ee68fa: Pull complete
6439819450d1: Pull complete
3c7be240f7bf: Pull complete
ca4b349df8ed: Pull complete
19ba2260209e: Pull complete
cdd4562c6eb9: Pull complete
Creating opq-docker_mongo_1           ... done
Creating opq-docker_boxupdateserver_1 ... done
Creating opq-docker_view_1            ... done
Creating opq-docker_makai_1           ... done
Creating opq-docker_mauka_1           ... done
Creating opq-docker_health_1          ... done
```

## Verify installation

Invoke the `docker ps` command to verify that all OPQ Cloud containers are running. It should look similar to this:

```shell
$ docker ps
CONTAINER ID        IMAGE                                      COMMAND                  CREATED             STATUS              PORTS                                                                                                   NAMES
bfbca049f966        openpowerquality/health:1.0.1              "python3 -u health.py"   12 minutes ago      Up 12 minutes                                                                                                               opq-docker_health_1
f45a12252235        openpowerquality/mauka:1.0.1               "python3 mauka/opq_m…"   12 minutes ago      Up 12 minutes       8911/tcp, 9881/tcp, 9884/tcp, 0.0.0.0:9882-9883->9882-9883/tcp, 9899/tcp, 0.0.0.0:12000->12000/tcp      opq-docker_mauka_1
1a328b646393        openpowerquality/makai:1.0.1               "/bin/bash /build/bi…"   12 minutes ago      Up 12 minutes       0.0.0.0:8194->8194/tcp, 0.0.0.0:8196->8196/tcp, 8080/tcp, 9899/tcp, 10000/tcp, 0.0.0.0:9880->9880/tcp   opq-docker_makai_1
4c5d586b6dc7        openpowerquality/view:1.0.0                "node main.js"           12 minutes ago      Up 12 minutes       0.0.0.0:8888->8888/tcp                                                                                  opq-docker_view_1
31102b7a08f4        openpowerquality/box-update-server:1.0.0   "python3 box_update_…"   12 minutes ago      Up 12 minutes       0.0.0.0:8151->8151/tcp                                                                                  opq-docker_boxupdateserver_1
8f7f92bf2a56        mongo:4.0.5                                "docker-entrypoint.s…"   12 minutes ago      Up 12 minutes       127.0.0.1:27017->27017/tcp                                                                              opq-docker_mongo_1
```

In addition, you should also check the OPQ View service by opening up your web browser and going to http://localhost:8888.
You should see the landing page of OPQ View, and the System Health panel should show that all services have been contacted and appear to be functional:

<img src="/docs/assets/cloud/view-landing.png" width="100%">

(Note: this image should be replaced with one that more accurately reflects what a "fresh" OPQ Cloud instance should look like.)

## Complete installation

To complete your installation, you will want to define additional OPQ View users, as well as OPQ Boxes and Locations. To do this, you can login to your OPQ View service with your admin username and password, and then use its interface to complete your installation.

(More instructions will follow for how to define users, boxes, and locations.)

## Managing your installation

### Bringing services up and down

If you need to bring services down for any reason, just change into the top-level directory (where the `docker-compose.yml` file is), and invoke `docker-compose down`:

```shell
$ docker-compose down
Stopping opq-docker_health_1          ... done
Stopping opq-docker_view_1            ... done
Stopping opq-docker_mauka_1           ... done
Stopping opq-docker_makai_1           ... done
Stopping opq-docker_boxupdateserver_1 ... done
Stopping opq-docker_mongo_1           ... done
Removing opq-docker_health_1          ... done
Removing opq-docker_view_1            ... done
Removing opq-docker_mauka_1           ... done
Removing opq-docker_makai_1           ... done
Removing opq-docker_boxupdateserver_1 ... done
Removing opq-docker_mongo_1           ... done
Removing network opq-docker_default
```

To bring services back up, just invoke the `docker-compose-run.sh` script:

```shell
$ ./docker-compose-run.sh
Creating network "opq-docker_default" with the default driver
Creating opq-docker_mongo_1           ... done
Creating opq-docker_boxupdateserver_1 ... done
Creating opq-docker_view_1            ... done
Creating opq-docker_makai_1           ... done
Creating opq-docker_mauka_1           ... done
Creating opq-docker_health_1          ... done
```

### Upgrading to new OPQ Cloud releases

We will occasionally make new releases of OPQ Cloud services.

If you installed OPQ Cloud by git cloning the official [OPQ Docker GitHub repository](https://github.com/openpowerquality/opq-docker), upgrading is a trivial process:

On your production system, change into the `opq-docker` directory and pull the latest files by invoking:

```shell
git pull origin master
```

Then, redeploy OPQ Cloud with the latest changes by invoking the `docker-compose-run.sh` script:

```shell
./docker-compose-run.sh
```

That's all there is to it!
Note that we did not have to shut down the currently running OPQ Cloud instance - in most cases, it should not be necessary at all.

When invoking the `docker-compose-run.sh` script, Docker Compose detects the differences between the previous and new OPQ Cloud configuration files - and only redeploys the necessary services.
For example, after pulling the latest changes from the official OPQ Docker GitHub repository - in which the only change was a new version of the official OPQ View image, the resulting re-deployment output looks like:

```shell
$ ./docker-compose-run.sh
opq-docker_mongo_1 is up-to-date
opq-docker_boxupdateserver_1 is up-to-date
opq-docker_makai_1 is up-to-date
Recreating opq-docker_view_1 ... done
opq-docker_mauka_1 is up-to-date
opq-docker_health_1 is up-to-date
```

(To do: How to best explain upgrading process for users who did not clone the opq-docker GitHub repository...)
