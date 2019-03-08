---
title: MongoDB
sidebar_label: MongoDB
---

## MongoDB

OPQ utilizes MongoDB as its database for all OPQ services. The database is provided as part of our Docker deployment.

### Initializing the database

When you create a new OPQ database for the first time, it's best to ensure that the indexes are created before any data is accepted.

1. Copy the ensure-indexes.sh and ensure-indexes.js files from opq/mongod to your host machine.
2. Ensure that the MongoDB docker container is running and all other docker containers are stopped.
3. Run the ensure-indexes.sh script (`./ensure-indexes.sh`)

### Backing up MongoDB

The directory `opq/mongod` contains helper scripts for backing up and restoring OPQ MongoDB databases.

The steps required for backing up the database is as follows:

1. Create a directory on your host machine called `/var/bak` that is readable and writeable to Docker.
2. Copy the backup-mongodb.sh script from opq/mongod/backup-mongodb.sh to your host machine.
3. On the host machine, run `./backup-mongodb.sh`

This will produce a compressed and archived backup image of the database in `/var/bak` and the file name will look like `opq.dump.YYYY-MM-DD.bak` where YYYY-MM-DD is the current year, month, and day that the backup was created on.

### Restoring a backup to MongoDB

The directory `opq/mongod` contains helper scripts for backing up and restoring OPQ MongoDB databases.

The steps required for backing up the database is as follows:

1. Copy the restore-mongodb.sh script from opq/mongod/restore-mongodb.sh to your host machine.
2. Ensure that all docker containers *except* for mongo are stopped. We don't want services reading or writing to the database while we restore. 
3. On the host machine, run `./restore-mongodb.sh [path to backup archive]` where [path to backup archive] is the full path to the backup archive on the host machine (e.g. /var/bak/opq.dump.2019-03-07.bak)
4. Restart the rest of the docker containers.


### Automating backups

It's possible to automate the backup process using a cron job on the host machine. We create backups of the database once per day at midnight.

1. Copy the backup-mongodb.sh script from opq/mongod/backup-mongodb.sh to your host machine (ours is stored in /home/opquser/backup/backup-mongodb.sh).
2. Edit cron. Type `crontab -e` to open the crontab editor.
3. Add the following cronjob: `0 0 * * * /bin/bash /home/opquser/backup/backup-mongodb.sh >> /home/opquser/backup/backup.log 2>&1`
4. Edit the above crontab so that the paths match your machine.
5. From here, management of backups is up to you. As an example, our crontab also uploads each night's backup to Google drive and then deletes the local backup.
