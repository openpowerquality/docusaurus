---
title: Deployment: Makai
sidebar_label: Makai
---

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

 