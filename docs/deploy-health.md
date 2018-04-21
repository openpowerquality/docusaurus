---
title: Deployment: Health
sidebar_label: Health
---

The goal of the OPQ Health service is provide a diagnostic facility for determining whether or not all of the OPQ services appear to be running appropriately.  It does this by monitoring various aspects of the system and publishing its findings to a log file and mongodb.

There are basically two steps to deploying OPQView: copying the deployment files (a python script and configuration file) from a development machine to the server, then running the script on the server.

## Developer system deployment tasks

First, make sure you have [set up opquser ssh access](deploy-initial-configuration.html#set-up-opquser-ssh-access). 


### Copy deployment files to the server

In your development environment, be sure you are in the master branch, then change directories into the `opq/health/` directory.

The contents of the `opq/health/deploy/` directory should contain the following files:
  * deploy-run.sh:  A script for running the deployment on the server.
  * deploy-transfer.sh: A script for copying the appropriate files to the server.

To copy deployment files to the server, invoke the `deploy-transfer.sh` script. This script creates a new directory whose name is the current timestamp, copies config.json, deploy-run.sh, a protobuf subdirectory, and health.py into it, then gzips that directory and secure copies it to emilia.

Here is what the invocation of this command should look like:

```
./deploy-transfer.sh
++ date +%Y%m%d_%H%M%S
+ timestamp=20180408_083036
+ mkdir 20180408_083036
+ cp deploy-run.sh 20180408_083036
+ cp ../health.py 20180408_083036
+ cp ../config.json 20180408_083036
+ cp ../protobuf 20180408_083036 -r
+ tar czf 20180408_083036.tar.gz 20180408_083036
+ rm -rf 20180408_083036
+ scp -P 29862 20180408_083036.tar.gz opquser@emilia.ics.hawaii.edu:health
20180408_083036.tar.gz                                                                                                100%   43MB   1.5MB/s   00:29    
+ set +x
```

## Server-side deployment tasks

Now ssh to the server to do the remainder of the deployment:

```
ssh -p 29862 opquser@emilia.ics.hawaii.edu
```

### Unpack tar file with latest deployment files  

Change directories into the health/ subdirectory, and list the files:

```
$ cd health
$ ls -la
ls -la
total 43572
drwxr-xr-x  3 opquser opquser     4096 Apr  8 08:55 .
drwxr-xr-x 10 opquser opquser     4096 Apr  8 08:50 ..
-rw-r--r--  1 opquser opquser 44601734 Apr  8 08:55 20180408_085449.tar.gz
```

You should see one (or more) timestamped tar.gz files (and potentially directories). The most recent timestamped tar.gz file is the one you just copied over.  Expand it into a directory as follows:

```
$ tar xf 20180408_085449.tar.gz
```  

The cd into that directory, and list the contents:

```
$ cd 20180418_000609/
opquser@emilia:~/health/20180418_000609$ ls -la
total 4020
drwxr-xr-x 3 opquser opquser    4096 Apr 20 10:33 .
drwxr-xr-x 3 opquser opquser    4096 Apr 18 00:06 ..
-rw-r--r-- 1 opquser opquser    1129 Apr 18 00:06 config.json
-rwxr-xr-x 1 opquser opquser     106 Apr 18 00:06 deploy-run.sh
-rw-r--r-- 1 opquser opquser    8603 Apr 18 00:06 health.py
drwxr-xr-x 3 opquser opquser    4096 Apr 18 00:07 protobuf
```

### Kill the current OPQ Health process

Find the PID of the current process running OPQ Health process this way:

```
$ ps -ef | grep python3
opquser  10645     1  1 08:56 pts/3    00:00:08 python3 health.py
opquser  12875 18406  0 09:07 pts/3    00:00:00 grep python3
```

In this case, the PID is 10645. Kill that process with the following command:

```
$ kill -9 10645
```

### Verify that the server is running Python 3

Check that any version of python3 is currently installed:

```
$ python3 --version
Python 3.4.2
```

If this throws an error, install python3 before proceeding.

## Run the new version of OPQ Health

To run the new version of OPQ Health, invoke the deploy-run.sh script:

```
$ ./deploy-run.sh
```

This script brings up OPQ Health in the background (so that you can exit this terminal session), and sends all output to the files nohupout.txt and logfile.txt. To check that the system came up normally, you can print out the contents of the nohupout and logfile.
