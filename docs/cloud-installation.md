---
title: OPQ Cloud Installation
sidebar_label: Installation
---


## Overview

OPQ Cloud currently consists of six services: OPQ Makai (for triggering and collecting power quality data from boxes), OPQ Mauka (for analysis and classification of power quality data), OPQ View (for data visualization and system management), OPQ Health (for monitoring boxes and services), OPQ Box Updater (for over-the-air updates to the Box software), and MongoDB (the backend database system).

We utilize [Docker](https://www.docker.com/) to manage the installation of each of these OPQ Cloud services.

We publish official Docker images for all of these services to the [Open Power Quality organization at DockerHub](https://hub.docker.com/u/openpowerquality).  In a nutshell, to install OPQ Cloud, you must:

  1. Install Docker and Docker Compose.
  2. Download the OPQ Docker repository containing shell scripts and configuration files.
  3. Edit the configuration files appropriately for your local installation.
  4. Run a script to bring up the five OPQ Cloud services.
  5. Verify installation by visiting the OPQ View landing page.
  5. Complete the installation by logging in to OPQ View.

Note: OPQ Cloud can currently be installed only on Unix (Macintosh and Linux) systems.

## Install Docker and Docker Compose

The first step in installing OPQ Cloud is to install Docker and Docker Compose.

Please consult the [Docker installation documentation](https://docs.docker.com/install/) and the [Docker Compose installation documentation](
https://docs.docker.com/compose/install/) for instructions.

## Download the openpowerquality/docker repository

Next, download the [OPQ Docker repository](https://github.com/openpowerquality/docker). You can either download it as a zip file and uncompress it to create a local directory named "docker-master", or clone it from GitHub.  The advantage to the latter approach is that if we make updates to the files, you can get the changes easily by pulling them from GitHub. Otherwise, you have to download a new zip file and migrate your changes into it.

## Edit configuration files

Your local docker directory contains a subdirectory called "config" containing a set of configuration files for each of the services.

We provide default values for most configuration variables that are appropriate for normal installations.

You will need to edit one configuration file before proceeding. Change directories into config/view/ and edit the file view.settings.json. Look for a section called "userProfiles", which has one entry with all blank fields. You will want to fill out the "username" field with an email address of an admin at your site (for example, "johnson@hawaii.edu"), provide a password (for example, "6ydhdk3ac!"), a first name (for example, "Philip"), last name (for example, "Johnson"), and role (which should be "admin").

## Bring up services

Now, cd into the top-level directory, where you should find a script called docker-compose-run.sh.  To make it executable, invoke:

```
chmod 775 docker-compose-run.sh
```

Now invoke it with:

```
./docker-compose-run.sh
```

This will download the latest official public images for each of the OPQ Cloud services, and run them.  The output should look like this:

```
(docker compose output here)
```

## Verify installation

To see if your OPQ Cloud installation has come up correctly, go to https://localhost/. You should see the landing page of OPQ View, and the System Health panel should show that all services have been contacted and appear to be functional:

<img src="/docs/assets/cloud/view-landing.png" width="100%">

(Note: this image should be replaced with one that more accurately reflects what a "fresh" OPQ Cloud instance should look like.)

## Complete installation

To complete your installation, you will want to define additional OPQ View users, as well as OPQ Boxes and Locations. To do this, you can login to your OPQ View service with your admin username and password, and then use its interface to complete your installation.

(More instructions will follow for how to define users, boxes, and locations.)

## Managing your installation

### Bringing services up and down

If you need to bring services down for any reason, you can invoke "docker down":

```
./docker down
```

To bring them back up, you can invoke docker up:

```
./docker up
```

### Upgrading to new releases

We will occasionally make new releases of OPQ Cloud services.  Unfortunately, I have no idea how you are going to get them at this point.  Hopefully, by the time you read this, these sentences will have been replaced by actual instructions.
