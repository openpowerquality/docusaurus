---
title: Makai on Emilia
sidebar_label: Makai
---

**(Now that we have migrated to Docker for deployment, this provides potentially obsolete installation and deployment instructions. Updates soon.)**

Makai has three main components: a Triggering Broker, an Acquisition Broker, and a Triggering Service (the makai daemon).

Each one is a self-contained application, requiring their own dependencies. The Triggering and Acquisition Brokers are written in C++ and as such require C/C++ libraries. The Makai daemon, the core of the triggering service, is written in Rust. This make dependency management simpler because we can use the `cargo` system.

## Installation setup

At this time, unlike other OPQ services, you must build the Makai service directly from sources on the server machine.

First, login as opquser on the server.

Change directories to the makai/ directory.

Next, checkout the [opq repository](https://github.com/openpowerquality/opq) into this directory.

## One step install and deploy

As long as all the dependencies are satisfied, it is sufficient to run `build_and_install.sh` script in the opq/makai directory to install all the makai system, and configure it to run at startup. However, configuration files and need to be copied and edited manually to match your use case. For details, consult [Triggering Broker configuration](/docs/cloud-makai.html#configuration), [Acquisition Broker configuration](/docs/cloud-makai.html#configuration-1), and [Triggering Service configuration](/docs/cloud-makai.html#configuration-2).

## Individual installation

You can also build each component individually.  For details, consult [Triggering Broker installation](/docs/cloud-makai.html#installation), [Acquisition Broker installation](/docs/cloud-makai.html#installation-1), and [Triggering Service installation](/docs/cloud-makai.html#installation-2).


## Disabling the Makai service

To disable the Makai service:

Log into the server.

Ensure the that the service in currently running. We can use `sudo service --status-all` to list all services and ensure that `makai_service` is currently running.

```
opquser@emilia:~$ sudo service --status-all
[sudo] password for opquser:
 [ + ]  acpid
 [ + ]  acq_broker
 [ + ]  apache2
 [ - ]  bootlogs
 [ - ]  bootmisc.sh
 [ - ]  checkfs.sh
 [ - ]  checkroot-bootclean.sh
 [ - ]  checkroot.sh
 [ + ]  console-setup
 [ + ]  cron
 [ + ]  dbus
 [ + ]  exim4
 [ - ]  hostname.sh
 [ - ]  hwclock.sh
 [ + ]  irqbalance
 [ + ]  jenkins
 [ + ]  kbd
 [ + ]  keyboard-setup
 [ - ]  killprocs
 [ + ]  kmod
 [ + ]  makai_service
 [ + ]  mauka
 [ + ]  mongod
 [ - ]  mongodrs
 [ - ]  motd
 [ - ]  mountall-bootclean.sh
 [ - ]  mountall.sh
 [ - ]  mountdevsubfs.sh
 [ - ]  mountkernfs.sh
 [ - ]  mountnfs-bootclean.sh
 [ - ]  mountnfs.sh
 [ + ]  networking
 [ + ]  ntp
 [ + ]  procps
 [ + ]  rc.local
 [ - ]  redis-server
 [ - ]  rmnologin
 [ - ]  rsync
 [ + ]  rsyslog
 [ - ]  saned
 [ - ]  sendsigs
 [ + ]  ssh
 [ - ]  sudo
 [ + ]  trg_broker
 [ + ]  udev
 [ + ]  udev-finish
 [ - ]  umountfs
 [ - ]  umountnfs.sh
 [ - ]  umountroot
 [ + ]  urandom
 [ - ]  x11-common
```

Stop the service with `sudo service makai_service stop`, `sudo service acq_broker stop`, and `sudo service trg_broker stop`, and then ensure the service is no longer running.

```
opquser@emilia:~$ sudo service makai_service stop
opquser@emilia:~$ sudo service acq_broker stop
opquser@emilia:~$ sudo service trg_broker stop
opquser@emilia:~$ sudo service --status-all
 [ + ]  acpid
 [ - ]  acq_broker
 [ + ]  apache2
 [ - ]  bootlogs
 [ - ]  bootmisc.sh
 [ - ]  checkfs.sh
 [ - ]  checkroot-bootclean.sh
 [ - ]  checkroot.sh
 [ + ]  console-setup
 [ + ]  cron
 [ + ]  dbus
 [ + ]  exim4
 [ - ]  hostname.sh
 [ - ]  hwclock.sh
 [ + ]  irqbalance
 [ + ]  jenkins
 [ + ]  kbd
 [ + ]  keyboard-setup
 [ - ]  killprocs
 [ + ]  kmod
 [ - ]  makai_service
 [ - ]  mauka
 [ + ]  mongod
 [ - ]  mongodrs
 [ - ]  motd
 [ - ]  mountall-bootclean.sh
 [ - ]  mountall.sh
 [ - ]  mountdevsubfs.sh
 [ - ]  mountkernfs.sh
 [ - ]  mountnfs-bootclean.sh
 [ - ]  mountnfs.sh
 [ + ]  networking
 [ + ]  ntp
 [ + ]  procps
 [ + ]  rc.local
 [ - ]  redis-server
 [ - ]  rmnologin
 [ - ]  rsync
 [ + ]  rsyslog
 [ - ]  saned
 [ - ]  sendsigs
 [ + ]  ssh
 [ - ]  sudo
 [ - ]  trg_broker
 [ + ]  udev
 [ + ]  udev-finish
 [ - ]  umountfs
 [ - ]  umountnfs.sh
 [ - ]  umountroot
 [ + ]  urandom
 [ - ]  x11-common
```



