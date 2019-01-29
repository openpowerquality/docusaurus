---
title: OPQ Box Updater
sidebar_label: Updater
---

## Summary

The OPQBox updater provides a way to update any OPQBox to the latest OPQBox software. Due to the fact that the update process is expensive, it is only ran when directed by a user for each OPQBox.

## How to perform an update

1. Ensure that your OPQBox is connected to the internet and streaming data (see: [OPQ Box User Guide](userguide-hardware.md)) 
2. Determine the local IP address of your OPQBox
3. Connect to the OPQ Box Configuration Daemon by going to: http://[local_ip_address_of_OPQ_box]:8888
4. 

## Installation

1. Run setup with `python3 setup.py install`

  * Installs updater's python dependencies
  * Installs box_updater.py to /usr/local/bin/box_updater.py
  * Installs configuration file, updater_config.json, to /etc/opq/updater_config.json
  * Sets up the cronjob to call the updater once a day

2. Install cron job with `python3 setup_cron.py`
  * Sets a cronjob to run the updater once a day

## Design notes

box_updater.py

  * Contains the main method to run an update

updater_config.json

  * Specifies the download path for update package's files
    * i.e. The version file, public key, update package, and signature are downloaded to this directory on the box
  * Specifies the url for an OPQ server that holds the update package
  * Specifies the name of the version file to be grabbed from and OPQ server

setup.py

  * The setup script to install the updater and its dependencies

setup_cron.py

  * Script to setup the updater cronjob

## Troubleshooting

The updater logs all its updates and errors in /var/log/opq/box_updater.log

The cronjob sets this up by piping the updaters output stream to `/var/log/opq/box_updater.log`.