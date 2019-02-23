---
title: Initial Configuration
sidebar_label: Initial Configuration
---

**(Now that we have migrated to Docker for deployment, this provides potentially obsolete installation and deployment instructions. Relevant instructions will be migrated to other sections of this documentation site in the near future, and then this file will be deleted.)**

## Server setup

### Install Linux

(Indicate what version of Linux we are using, and pointers to directions on how to install on ITS hosts.)

### Create system and user-level accounts

Create a system account called 'opq' that does not have login privileges. For example,

```
(command to create opq system account)
```

Create a second account called 'opquser' with normal user privileges. For example,

```
(command to create opquser account)
```

For opquser account, create the top-level directories: mauka, makai, view, health, and mongodb.  Deployment scripts and files for each service will be located and maintained within these directories.

## Install MongoDB

Refer to the installation instructions on the [MongoDB Deployment](deploy-mongodb.md) page.

## Install remaining tech stack

(Document how to install and configure git, apache, mongo, node, etc.)


## Set up opquser ssh access

Most deployment occurs by running scripts from a development machine to transfer files to the server machine.

For these scripts to run correctly, ssh access to the opquser account on the server must be configured. Here's how to do it.

### Obtain the opquser account credentials

OPQView is deployed using the opquser account.  You need to obtain the password for opquser in order to do this deployment.

### Set up ssh without password prompt

In order to use the scripts to transfer files, you need to set up SSH login without a password.  You can follow [these instructions](http://www.linuxproblem.org/art_9.html).

To check to make sure you have set up your SSH keys correctly, bring up a new console and run the following command:

```
ssh -p 29862 opquser@emilia.ics.hawaii.edu
```

This should log you into emilia without prompting you for a password, with output like the following:

```
The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sun Apr  8 07:57:57 2018 from cpe-66-91-216-204.hawaii.res.rr.com
opquser@emilia:~$
```
