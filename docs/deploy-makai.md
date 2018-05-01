---
title: Deployment: Makai
sidebar_label: Makai
---

Makai contains three main components:
* Triggering broker
* Acquisition broker
* Triggering service(makai daemon).

Each one is a self-contained application, requiring their own dependencies. Triggering and acquisition brokers are written in C++ and as such require C/C++ libraries. Makai daemon, the core of the triggering service is written in Rust, which makes dependency management simpler, by delegating it to the `cargo` system. As long as all the dependencies are satisfied, it is sufficient to run `build_and_install.sh` script in the makai directory to install all the makai system, and configure it to run at startup. However, configuration files and need to be copied and edited manually to match your use case.

## Triggering broker.
Triggering broker requires the following C/C++ libraries:
* ZeroMQ >= v4.2: [Installation instructions](http://zeromq.org/intro:get-the-software)
* zmqpp >= v4.2 : [Installation instructions](https://github.com/zeromq/zmqpp#installation)

Furthermore the triggering broker requires gcc >= v6.3, as well as a recent version of cmake.

### Building the triggering broker.
If you would like to build the triggering broker without using the bundled build script follow these steps:

1. `cd TriggeringBroker/` : switch to the triggering broker directory.
2. `mkdir -p build` : create a directory where the build will take place.
3. `cd build` : switch to the build directory.
4. `cmake ..` : run cmake pointing to the source of the triggering broker.
5. `make` : build the binary.

This will generate the `TriggeringBroker` binary. Follow the directions in the [Software Services](/docs/makai.html#configuration) section for configuration.

## Acquisition broker. 
Acquisition broker requires the following C/C++ libraries:
* ZeroMQ >= v4.2: [Installation instructions](http://zeromq.org/intro:get-the-software)
* zmqpp >= v4.2 : [Installation instructions](https://github.com/zeromq/zmqpp#installation)
* protobuf : [Installation instructions](https://github.com/google/protobuf/blob/master/src/README.md)
* mongocxx : [Installation instructions](http://mongodb.github.io/mongo-cxx-driver/mongocxx-v3/installation/)

Furthermore the acquisition broker requires gcc >= v6.3, as well as a recent version of cmake.

### Building the acquisition broker.
If you would like to build the acquisition broker without using the bundled build script follow these steps:

1. `cd AcquisitionBroker/` : switch to the triggering broker directory.
2. `mkdir -p build` : create a directory where the build will take place.
3. `cd build` : switch to the build directory.
4. `cmake ..` : run cmake pointing to the source of the triggering broker.
5. `make` : build the binary.

This will generate the `AcquisitionBroker` binary. Follow the directions in the [Software Services](/docs/makai.html#configuration) section for configuration.

## Triggering service. 
Triggering service is written in rust, and as such most of the dependency management is satisfied via cargo. However there are a few cases where native rust code does not exists for certain libraries. Instead, we use a shim package which wraps a C library. The list of C libraries is shown below:
* protobuf : [Installation instructions](https://github.com/google/protobuf/blob/master/src/README.md)
* ZeroMQ >= v4.2: [Installation instructions](http://zeromq.org/intro:get-the-software)

Furthermore the acquisition broker requires a stable branch [Rust](https://www.rust-lang.org/en-US/install.html) compiler. 

#Building the makai service.
If you would like to build the makai service and plugins without using the bundled script, switch into the `TriggeringService` directory and run the `build.sh` script. This will generate the `makai` binary as well as all the plugins in the build directory.
