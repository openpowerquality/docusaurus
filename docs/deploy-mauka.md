---
title: Deployment: Mauka
sidebar_label: Mauka
---

There are basically three steps to deploying OPQMauka: building the production bundle (a Python application) on a development machine, installing OPQ Mauka on the production machine, and managing the OPQMauka service.


## Build and deploy the production bundle

In general, you will build the production bundle from the master branch of OPQ Mauka. 

First, make sure you have [set up opquser ssh access](deploy-initial-configuration.html#set-up-opquser-ssh-access). 

In your development environment, be sure you are in the master branch, then change directories into the `opq/mauka/deploy/` directory.

This directory contains the following items:

* deploy-build.sh: Builds OPQ Mauka bundle
* deploy-transfer-emilia.sh: Transfers bundle to emilia
* deploy-transfer-sim.sh: Transfers bundle to OPQ Sim
* deploy-install.sh: Installs the OPQMauka service and utilities on emilia.
* mauka-service.sh: Service file that gets installed as system service.
* mauka-cli.sh: Utility script for starting the mauka command line interface.
* mauka-log.sh: Utility script for viewing mauka log. 
* [timestamp].tar.bz2 (local copies of created bundles)

Now invoke `./deploy-build.sh`:

This script builds a OPQMauka bundle from the current branch as a compressed tar.bz2 archive.

The following is an example run performed on one of our development machines.

```
$ ./deploy-build.sh 
+ cd ../..
++ date +%Y%m%d_%H%M%S
+ TIMESTAMP=20180515_121432
+ mkdir -p mauka/deploy/20180515_121432
+ mkdir -p mauka/deploy/20180515_121432/mauka
+ cp -r mauka/constants mauka/deploy/20180515_121432/mauka
+ cp -r mauka/mongo mauka/deploy/20180515_121432/mauka
+ cp -r mauka/plugins mauka/deploy/20180515_121432/mauka
+ cp -r mauka/protobuf mauka/deploy/20180515_121432/mauka
+ cp mauka/config.json mauka/deploy/20180515_121432/mauka
+ cp mauka/OpqMauka.py mauka/deploy/20180515_121432/mauka
+ cp mauka/requirements.txt mauka/deploy/20180515_121432/mauka
+ mkdir -p mauka/deploy/20180515_121432/scripts
+ cp mauka/deploy/mauka-cli.sh mauka/deploy/20180515_121432/scripts
+ cp mauka/deploy/mauka-log.sh mauka/deploy/20180515_121432/scripts
+ cp mauka/deploy/mauka-service.sh mauka/deploy/20180515_121432/scripts
+ cp mauka/deploy/deploy-install.sh mauka/deploy/20180515_121432
+ tar cvjf mauka/deploy/20180515_121432.tar.bz2 -C mauka/deploy 20180515_121432
20180515_121432/
20180515_121432/scripts/
20180515_121432/scripts/mauka-cli.sh
20180515_121432/scripts/mauka-service.sh
20180515_121432/scripts/mauka-log.sh
20180515_121432/deploy-install.sh
20180515_121432/mauka/
20180515_121432/mauka/requirements.txt
20180515_121432/mauka/config.json
20180515_121432/mauka/OpqMauka.py
20180515_121432/mauka/plugins/
20180515_121432/mauka/plugins/VoltageThresholdPlugin.py
20180515_121432/mauka/plugins/base.py
20180515_121432/mauka/plugins/PrintPlugin.py
20180515_121432/mauka/plugins/__init__.py
20180515_121432/mauka/plugins/manager.py
20180515_121432/mauka/plugins/broker.py
20180515_121432/mauka/plugins/FrequencyThresholdPlugin.py
20180515_121432/mauka/plugins/history.py
20180515_121432/mauka/plugins/IticPlugin.py
20180515_121432/mauka/plugins/StatusPlugin.py
20180515_121432/mauka/plugins/LocalityPlugin.py
20180515_121432/mauka/plugins/AcquisitionTriggerPlugin.py
20180515_121432/mauka/plugins/ThdPlugin.py
20180515_121432/mauka/plugins/mock.py
20180515_121432/mauka/plugins/MeasurementPlugin.py
20180515_121432/mauka/plugins/ThresholdPlugin.py
20180515_121432/mauka/mongo/
20180515_121432/mauka/mongo/mongo.py
20180515_121432/mauka/constants/
20180515_121432/mauka/constants/__init__.py
20180515_121432/mauka/protobuf/
20180515_121432/mauka/protobuf/opq.proto
20180515_121432/mauka/protobuf/util.py
20180515_121432/mauka/protobuf/__init__.py
20180515_121432/mauka/protobuf/opq_pb2.py
+ rm -rf mauka/deploy/20180515_121432
+ set +x
```
  
Note that *tar.bz2 files in the deploy directory are gitignored.

Now we can deploy the production bundle either to the production server (emilia) or to a development environment using OPQ Sim. to deploy to the production environment, invoke the deploy-transfer-emilia.sh script passing the bundle as the first and only argument to the script.

`./deploy-transfer-emilia.sh [bundle]`

Here is an example of running this step on one of our machines.

```
./deploy-transfer-emilia.sh 20180515_121432.tar.bz2 
+ DIST=20180515_121432.tar.bz2
+ scp -P 29862 20180515_121432.tar.bz2 opquser@emilia.ics.hawaii.edu:/home/opquser/mauka/.
20180515_121432.tar.bz2  100%   21KB 648.7KB/s   00:00    
+ set +x
```

## Server-side deployment tasks

Now ssh into the server to do the remainder of the deployment. 

If you are deploying to production (emilia), use the following command:

```
ssh -p 29862 opquser@emilia.ics.hawaii.edu
```

If you are deploying to the development environment (OPQ Sim), use the following command:

```
ssh -p 3022 pi@localhost
```

### Unpack tar file with latest release

Change directories into the mauka/ subdirectory, and list the files:

```
opquser@emilia:~/mauka$ ls -al
total 108
drwxr-xr-x  4 opquser opquser  4096 May 15 12:19 .
drwxr-xr-x 12 opquser opquser  4096 May  9 13:56 ..
drwxr-xr-x  4 opquser opquser  4096 Apr 10 13:11 20180410_131135
-rwxr-xr-x  1 opquser opquser 22143 Apr 10 13:11 20180410_131135.tar.bz2
drwxr-xr-x  4 opquser opquser  4096 May  9 13:00 20180509_130012
-rw-r--r--  1 opquser opquser 43095 May  9 13:00 20180509_130012.tar.bz2
-rw-r--r--  1 opquser opquser 21705 May 15 12:19 20180515_121432.tar.bz2

```

You should see one (or more) timestamped tar.bz2 files (and potentially directories). The most recent timestamped tar.bz2 file is the one you just copied over.  Expand it into a directory as follows:

```
$ tar xfv 20180515_121432.tar.bz2
```  

The untar process will look something like

```
opquser@emilia:~/mauka$ tar xfv 20180515_121432.tar.bz2 
20180515_121432/
20180515_121432/scripts/
20180515_121432/scripts/mauka-cli.sh
20180515_121432/scripts/mauka-service.sh
20180515_121432/scripts/mauka-log.sh
20180515_121432/deploy-install.sh
20180515_121432/mauka/
20180515_121432/mauka/requirements.txt
20180515_121432/mauka/config.json
20180515_121432/mauka/OpqMauka.py
20180515_121432/mauka/plugins/
20180515_121432/mauka/plugins/VoltageThresholdPlugin.py
20180515_121432/mauka/plugins/base.py
20180515_121432/mauka/plugins/PrintPlugin.py
20180515_121432/mauka/plugins/__init__.py
20180515_121432/mauka/plugins/manager.py
20180515_121432/mauka/plugins/broker.py
20180515_121432/mauka/plugins/FrequencyThresholdPlugin.py
20180515_121432/mauka/plugins/history.py
20180515_121432/mauka/plugins/IticPlugin.py
20180515_121432/mauka/plugins/StatusPlugin.py
20180515_121432/mauka/plugins/LocalityPlugin.py
20180515_121432/mauka/plugins/AcquisitionTriggerPlugin.py
20180515_121432/mauka/plugins/ThdPlugin.py
20180515_121432/mauka/plugins/mock.py
20180515_121432/mauka/plugins/MeasurementPlugin.py
20180515_121432/mauka/plugins/ThresholdPlugin.py
20180515_121432/mauka/mongo/
20180515_121432/mauka/mongo/mongo.py
20180515_121432/mauka/constants/
20180515_121432/mauka/constants/__init__.py
20180515_121432/mauka/protobuf/
20180515_121432/mauka/protobuf/opq.proto
20180515_121432/mauka/protobuf/util.py
20180515_121432/mauka/protobuf/__init__.py
20180515_121432/mauka/protobuf/opq_pb2.py
```

Then cd into that directory, and list the contents:

```
opquser@emilia:~/mauka$ cd 20180515_121432/
opquser@emilia:~/mauka/20180515_121432$ ls -al
total 20
drwxr-xr-x 4 opquser opquser 4096 May 15 12:14 .
drwxr-xr-x 5 opquser opquser 4096 May 15 12:52 ..
-rwxr-xr-x 1 opquser opquser  874 May 15 12:14 deploy-install.sh
drwxr-xr-x 6 opquser opquser 4096 May 15 12:14 mauka
drwxr-xr-x 2 opquser opquser 4096 May 15 12:14 scripts
```

### Kill the current OPQMauka process

OPQMauka is installed as a system service which runs under the opq system user account. This is a special account that does not have a login shell which provides hardened security. The other advantage to running as a system service is that the service will automatically boot if the server restarts. Further, the service can be managed by the operating system's `service` command.

To kill the current OPQMauka service, invoke 

`sudo service mauka stop`

### Install the new version of OPQMauka

To install OPQMauka, simple run the `deploy-install.sh` script as root.

```
opquser@emilia:~/mauka/20180515_121432$ sudo ./deploy-install.sh 
+ cp scripts/mauka-service.sh /etc/init.d/mauka
+ update-rc.d mauka defaults
+ cp scripts/mauka-cli.sh /usr/local/bin/mauka-cli
+ chmod +x /usr/local/bin/mauka-cli
+ cp scripts/mauka-log.sh /usr/local/bin/mauka-log
+ chmod +x /usr/local/bin/mauka-log
+ mkdir -p /usr/local/bin/opq
+ chown -R opq:opq /usr/local/bin/opq
+ cp -R mauka /usr/local/bin/opq/.
+ cp mauka/config.json /etc/opq/mauka/config.json
+ mkdir -p /var/log/opq
+ chown -R opq:opq /var/log/opq
+ set +o xtrace
```

### Run the new version of OPQMauka

To run the new version of OPQMauka, start the service with 

`sudo service mauka start`

The service will run as a daemon process with all log information going to `/var/log/opq/mauka.log`. This file can be tailed and monitored in real time by running the shortcut `mauka-log`.


## Verify that the new OPQMauka is running

### Check the process list

Check the process list with `ps aux | grep Mauka` and you should see a process for each plugin running under the user `opq`

```
opquser@emilia:~$ ps aux | grep Mauka
opq      14403 10.3  0.5 339040 45704 ?        Sl   13:23   0:41 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opq      14417  0.2  0.4 256992 37744 ?        Sl   13:23   0:00 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opq      14418  0.2  0.4 257128 36880 ?        Sl   13:23   0:01 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opq      14421  0.0  0.4 552088 38660 ?        Sl   13:23   0:00 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opq      14424  0.3  0.4 552108 38804 ?        Sl   13:23   0:01 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opq      14425  0.3  0.4 552116 38812 ?        Sl   13:23   0:01 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opq      14427  0.0  0.4 552140 38660 ?        Sl   13:23   0:00 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opq      14432  0.0  0.4 625888 38832 ?        Sl   13:23   0:00 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opq      14437  0.0  0.4 634104 38776 ?        Sl   13:23   0:00 /usr/bin/python3 /usr/local/bin/opq/mauka/OpqMauka.py /etc/opq/mauka/config.json
opquser  14836  0.0  0.0  12728  2220 pts/3    S+   13:30   0:00 grep Mauka
```

### Check plugin status with mauka-cli

Start the mauka command line interface `mauka-cli`

```
opquser@emilia:~$ mauka-cli
[INFO][2018-04-10 13:32:36,814][14947 manager.py:565 - <module>() ] Starting OpqMauka CLI
[INFO][2018-04-10 13:32:36,814][14947 manager.py:553 - load_config() ] Loading configuration from /etc/opq/mauka/config.json
```


To check the status of the plugins, provide the command `list-plugins`

```
opq-mauka> list-plugins
[DEBUG][2018-04-10 13:33:24,780][14947 manager.py:541 - run_cli() ] name:AcquisitionTriggerPlugin       enabled:Yes process:<Process(Process-8, started)> pid:14437 exit_event:False
name:FrequencyThresholdPlugin       enabled:Yes process:<Process(Process-4, started)> pid:14424 exit_event:False
name:IticPlugin                     enabled:Yes process:<Process(Process-3, started)> pid:14421 exit_event:False
name:StatusPlugin                   enabled:Yes process:<Process(Process-7, started)> pid:14432 exit_event:False
name:ThdPlugin                      enabled:Yes process:<Process(Process-6, started)> pid:14427 exit_event:False
name:VoltageThresholdPlugin         enabled:Yes process:<Process(Process-5, started)> pid:14425 exit_event:False
```

Here, we see that the plugins are enabled, started, and not set to exit which shows they are are in working order.




 
 

