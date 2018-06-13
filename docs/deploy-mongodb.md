---
title: Deployment: MongoDB
sidebar_label: MongoDB
---

## Install MongoDB

Copy the `install-mongod.sh` script found in the `opq/util/mongod/install` directory to the server you wish to install it on.

As root, run the install script.

```
$ sudo ./install-mongodb.sh 
+ apt-get install -y curl
Reading package lists... Done
Building dependency tree       
Reading state information... Done
curl is already the newest version (7.52.1-5+deb9u5).
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
+ DIST=mongodb-linux-x86_64-3.6.3
+ curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.3.tgz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 82.8M  100 82.8M    0     0  13.3M      0  0:00:06  0:00:06 --:--:-- 19.3M
+ tar xvf mongodb-linux-x86_64-3.6.3.tgz
mongodb-linux-x86_64-3.6.3/README
mongodb-linux-x86_64-3.6.3/THIRD-PARTY-NOTICES
mongodb-linux-x86_64-3.6.3/MPL-2
mongodb-linux-x86_64-3.6.3/GNU-AGPL-3.0
mongodb-linux-x86_64-3.6.3/bin/mongodump
mongodb-linux-x86_64-3.6.3/bin/mongorestore
mongodb-linux-x86_64-3.6.3/bin/mongoexport
mongodb-linux-x86_64-3.6.3/bin/mongoimport
mongodb-linux-x86_64-3.6.3/bin/mongostat
mongodb-linux-x86_64-3.6.3/bin/mongotop
mongodb-linux-x86_64-3.6.3/bin/bsondump
mongodb-linux-x86_64-3.6.3/bin/mongofiles
mongodb-linux-x86_64-3.6.3/bin/mongoreplay
mongodb-linux-x86_64-3.6.3/bin/mongoperf
mongodb-linux-x86_64-3.6.3/bin/mongod
mongodb-linux-x86_64-3.6.3/bin/mongos
mongodb-linux-x86_64-3.6.3/bin/mongo
mongodb-linux-x86_64-3.6.3/bin/install_compass
+ INSTALL_DIR=/usr/local/bin/mongodb
+ mkdir -p /usr/local/bin/mongodb
+ cp -R -n mongodb-linux-x86_64-3.6.3/bin mongodb-linux-x86_64-3.6.3/GNU-AGPL-3.0 mongodb-linux-x86_64-3.6.3/MPL-2 mongodb-linux-x86_64-3.6.3/README mongodb-linux-x86_64-3.6.3/THIRD-PARTY-NOTICES /usr/local/bin/mongodb
+ mkdir -p /var/log/mongodb
+ chown -R opq:opq /var/log/mongodb
+ echo 'export PATH=/usr/local/bin/mongodb/bin:$PATH'
+ DB_BASE=/var/mongodb/opq
+ mkdir -p /var/mongodb/opq/rs0
+ mkdir -p /var/mongodb/opq/rs1
+ mkdir -p /var/mongodb/opq/rs2
+ chown -R opq:opq /var/mongodb/opq
+ echo 'If you want mongo on your path, reload with ". ~/.profile"'
If you want mongo on your path, reload with ". ~/.profile"
+ set +x
```

The script works by performing the following steps:

1. Ensure curl is installed using system package manager
2. Download latest generic mongodb community server using curl
3. Installs mongodb under /usr/local/bin/mongodb
4. Creates data directories at /var/mongodb/opq/rs[0-2]
5. Create log directory at /var/log/mongodb
6. Set's ownership of data and log dirs to the system level `opq` user

### Installing the MongoDB service

This step will install MongoDB as a system level service. This allows MongoDB to be managed by the service daemon and to autostart when the server starts. This step requires three scripts:

1. `opq/util/mongod/install/install-service.sh`: Installs the service file, runs script, and updates the service daemon
2. `opq/util/mongod/install/mongod-service.sh`: The actual unit file that init.d/systemd uses to run mongod as a service
3. `opq/util/mongod/install/start-mongod.sh`: The run script that the service uses to start multiple replica sets

#### Copy service scripts to server

First, copy all three scripts to the server that you wish to setup the mongod service. You may use the opquser account to do this. Ensure that all three scripts are siblings in the same directory.

#### Run the install-service.sh script

As root, run install-service.sh

```
$ sudo ./install-service.sh 
+ cp start-mongod.sh /usr/local/bin/mongodb/.
+ chown opq:opq /usr/local/bin/mongodb/start-mongod.sh
+ chmod +x /usr/local/bin/mongodb/start-mongod.sh
+ cp mongod-service.sh /etc/init.d/mongod
+ chown opq:opq /etc/init.d/mongod
+ chmod +x /etc/init.d/mongod
+ update-rc.d mongod defaults
+ set +x
```

#### Start the mongod service

As root, you should now be able to run the mongod service using `/etc/init.d/mongod start`.

```
sudo /etc/init.d/mongod start
[ ok ] Starting mongod (via systemctl): mongod.service.
```

Please note that as a system service, mongod will also start automatically any time the server is restarted.

To verify that mongod is running with three replica sets, we can look at the process table and select those with mongod in the name.

```
$ ps aux | grep mongod
opq        673  0.2  1.3 1005344 55680 ?       Sl   08:18   0:01 opq       2545 12.8  1.3 1005348 55996 ?       Sl   09:39   0:00 /usr/local/bin/mongodb/bin/mongod --replSet opqrs --port 27018 --dbpath /var/mongodb/opq/rs0 --fork --logpath /var/log/mongodb/rs0.loq
                                                                 opq       2586 15.0  1.3 1005348 55228 ?       Sl   09:39   0:00 /usr/local/bin/mongodb/bin/mongod --replSet opqrs --port 27019 --dbpath /var/mongodb/opq/rs1 --fork --logpath /var/log/mongodb/rs1.loq
                                                                 opq       2618 19.0  1.3 1005348 55280 ?       Sl   09:39   0:00 /usr/local/bin/mongodb/bin/mongod --replSet opqrs --port 27020 --dbpath /var/mongodb/opq/rs2 --fork --logpath /var/log/mongodb/rs2.loq

```

Here we see three mongod processes each running on a different port, each with their oen data directory, and each with their own log file.

At this point in time, it should also be possible to connect to the server from opquser using the mongo command (assuming you've added the mongodb binary to your PATH).

```
$ mongo --port 27018
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27018/
MongoDB server version: 3.6.3
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
Server has startup warnings: 
2018-04-11T08:18:04.158-1000 I STORAGE  [initandlisten] 
2018-04-11T08:18:04.158-1000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2018-04-11T08:18:04.158-1000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] 
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] 
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server. 
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          Start the server with --bind_ip <address> to specify which IP 
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] 
```

You may see some warnings that we can ignore for the time being, but you can also verify that you can connect to the running mongod instance using this approach.

### Configuring mongod to support oplog

First, connect to the primary mongod instance

```
$ mongo --port 27018
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27018/
MongoDB server version: 3.6.3
Server has startup warnings: 
2018-04-11T08:18:04.158-1000 I STORAGE  [initandlisten] 
2018-04-11T08:18:04.158-1000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2018-04-11T08:18:04.158-1000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] 
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] 
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server. 
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          Start the server with --bind_ip <address> to specify which IP 
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.
2018-04-11T08:18:05.062-1000 I CONTROL  [initandlisten] 
> 
```

Once connected, we can now configure the replica sets. We will first create a config variable:

```
config = {_id: "opqrs", members: [{_id: 0, host: "localhost:27018"}, {_id: 1, host: "localhost:27019"},{_id: 2, host: "localhost:27020"}]};
```

Next, we will initiate the replica set with the config that we just created using `rs.initiate(config);`

```
> rs.initiate(config);
{
	"ok" : 1,
	"operationTime" : Timestamp(1523475887, 1),
	"$clusterTime" : {
		"clusterTime" : Timestamp(1523475887, 1),
		"signature" : {
			"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
			"keyId" : NumberLong(0)
		}
	}
}
```

At this point, you should be ready to go. See the official mongodb documentation if you wish to setup further access rights such as users or permissions.


## Restoring MongoDB from a backup

So you've gone and performed the unthinkable. You either wiped or damaged the database beyond repair.
 
 _Shame_. _SHAME!_ 
 
Don't fret, it's possible to restore the database using the most recent backup.

The steps needed to restore a working copy of the DB are as follows:

##### Transfer your backup to the target server and extract it.

Ensure that the tar.gz file is on the server that you intend to backup. For the purpose of this document, we will show the backup example in `/home/opquser/backups/`.

```
opquser@emilia:~/backups$ ls
opq.dump.01May2018.tar.gz
```

Now we can extract the backup using `tar`.

```
opquser@emilia:~/backups$ tar xvf opq.dump.01May2018.tar.gz
opq/
opq/zipcodes.metadata.json.gz
opq/roles.bson.gz
opq/cronHistory.metadata.json.gz
opq/opq_boxes.bson.gz
opq/meteor_accounts_loginServiceConfiguration.bson.gz
opq/measurements.bson.gz
opq/events.metadata.json.gz
opq/regions.bson.gz
opq/health.bson.gz
opq/box_events.bson.gz
opq/fs.chunks.metadata.json.gz
opq/BoxOwners.bson.gz
opq/meteor_accounts_loginServiceConfiguration.metadata.json.gz
opq/BoxOwners.metadata.json.gz
opq/fs.files.metadata.json.gz
opq/system_stats.bson.gz
opq/roles.metadata.json.gz
opq/zipcodes.bson.gz
opq/users.metadata.json.gz
opq/trends.bson.gz
opq/UserProfiles.metadata.json.gz
opq/events.bson.gz
opq/locations.bson.gz
opq/box_events.metadata.json.gz
opq/fs.files.bson.gz
opq/trends.metadata.json.gz
opq/regions.metadata.json.gz
opq/cronHistory.bson.gz
opq/health.metadata.json.gz
opq/opq_boxes.metadata.json.gz
opq/UserProfiles.bson.gz
opq/system_stats.metadata.json.gz
opq/users.bson.gz
opq/locations.metadata.json.gz
opq/fs.chunks.bson.gz
opq/measurements.metadata.json.gz
```

##### Disable OPQ Services that touch the DB.

Visit and perform the linked instructions for disabling OPQ services.

1. Disable Makai by following the instructions under `Disabling the Makai service` in the [Makai Deployment Guide](deploy-makai.md).
2. Disable Mauka by following the instructions under `Kill the current OPQMauka process` in the [Mauka deployment guide](deploy-mauka.md).
3. Disable Health by following the instructions under `Kill the current OPQ Health process` in the [Health Deployment Guide](deploy-health.md).
4. Disable View by following the instructions under `Kill the current OPQView processes` in the [View Deployment Guide](deploy-view.md).

##### Drop the old or damaged database (assuming it still exists!)

Log into the mongodb console and switch to the active opq database. Then run the `db.dropDatabase()` command. Please be careful, this will drop all of your data.

```
opquser@emilia:~$ mongo
MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.1
> show databases
admin       0.000GB
local       0.000GB
makai_test  0.000GB
opq         9.144GB
> use opq
switched to db opq
> db.dropDatabase()
{ "dropped" : "opq", "ok" : 1 }
```

##### Restore the backup

Change into the backups directory where the latest backup was extracted earlier.

Use `mongorestore --db opq --gzip opq` to restore the backup. This example assumes the backup was extracted to the directory `opq`. Grab some coffee, this step can take a while.

```
opquser@emilia:~/backups$ mongorestore --db opq --gzip opq
2018-06-12T13:18:39.164-1000	the --db and --collection args should only be used when restoring from a BSON file. Other uses are deprecated and will not exist in the future; use --nsInclude instead
2018-06-12T13:18:39.165-1000	building a list of collections to restore from opq dir
2018-06-12T13:18:39.177-1000	reading metadata for opq.measurements from opq/measurements.metadata.json.gz
2018-06-12T13:18:39.178-1000	reading metadata for opq.fs.chunks from opq/fs.chunks.metadata.json.gz
2018-06-12T13:18:39.179-1000	reading metadata for opq.box_events from opq/box_events.metadata.json.gz
2018-06-12T13:18:39.179-1000	reading metadata for opq.trends from opq/trends.metadata.json.gz
2018-06-12T13:18:39.299-1000	restoring opq.measurements from opq/measurements.bson.gz
2018-06-12T13:18:39.336-1000	restoring opq.fs.chunks from opq/fs.chunks.bson.gz
2018-06-12T13:18:39.357-1000	restoring opq.box_events from opq/box_events.bson.gz
2018-06-12T13:18:39.464-1000	restoring opq.trends from opq/trends.bson.gz
2018-06-12T13:18:42.146-1000	[##......................]  opq.measurements  4.27MB/40.4MB  (10.6%)
2018-06-12T13:18:42.146-1000	[........................]     opq.fs.chunks  9.17MB/3.52GB   (0.3%)
2018-06-12T13:18:42.146-1000	[###.....................]    opq.box_events   18.3MB/120MB  (15.3%)
2018-06-12T13:18:42.146-1000	[##......................]        opq.trends  6.26MB/60.3MB  (10.4%)
2018-06-12T13:18:42.146-1000
2018-06-12T13:18:45.128-1000	[#####...................]  opq.measurements  8.48MB/40.4MB  (21.0%)
2018-06-12T13:18:45.128-1000	[........................]     opq.fs.chunks  18.7MB/3.52GB   (0.5%)
2018-06-12T13:18:45.128-1000	[#######.................]    opq.box_events   35.4MB/120MB  (29.6%)
2018-06-12T13:18:45.128-1000	[#####...................]        opq.trends  12.7MB/60.3MB  (21.1%)
2018-06-12T13:18:45.128-1000
2018-06-12T13:18:48.145-1000	[#######.................]  opq.measurements  12.7MB/40.4MB  (31.6%)
2018-06-12T13:18:48.145-1000	[........................]     opq.fs.chunks  29.2MB/3.52GB   (0.8%)
2018-06-12T13:18:48.145-1000	[###########.............]    opq.box_events   55.1MB/120MB  (46.0%)
2018-06-12T13:18:48.145-1000	[#######.................]        opq.trends  19.5MB/60.3MB  (32.4%)
2018-06-12T13:18:48.145-1000
2018-06-12T13:18:51.142-1000	[#########...............]  opq.measurements  16.8MB/40.4MB  (41.6%)
2018-06-12T13:18:51.142-1000	[........................]     opq.fs.chunks  38.8MB/3.52GB   (1.1%)
2018-06-12T13:18:51.142-1000	[##############..........]    opq.box_events   73.5MB/120MB  (61.4%)
2018-06-12T13:18:51.142-1000	[##########..............]        opq.trends  26.3MB/60.3MB  (43.5%)
2018-06-12T13:18:51.142-1000
2018-06-12T13:18:54.135-1000	[############............]  opq.measurements  21.0MB/40.4MB  (52.1%)
2018-06-12T13:18:54.135-1000	[........................]     opq.fs.chunks  46.5MB/3.52GB   (1.3%)
2018-06-12T13:18:54.135-1000	[##################......]    opq.box_events   90.8MB/120MB  (75.9%)
2018-06-12T13:18:54.135-1000	[#############...........]        opq.trends  32.9MB/60.3MB  (54.5%)
2018-06-12T13:18:54.135-1000
2018-06-12T13:18:57.138-1000	[##############..........]  opq.measurements  25.1MB/40.4MB  (62.3%)
2018-06-12T13:18:57.138-1000	[........................]     opq.fs.chunks  56.7MB/3.52GB   (1.6%)
2018-06-12T13:18:57.138-1000	[#####################...]    opq.box_events    108MB/120MB  (89.9%)
2018-06-12T13:18:57.138-1000	[################........]        opq.trends  41.5MB/60.3MB  (68.7%)
2018-06-12T13:18:57.138-1000
2018-06-12T13:18:59.848-1000	[########################]  opq.box_events  120MB/120MB  (100.0%)
2018-06-12T13:18:59.849-1000	restoring indexes for collection opq.box_events from metadata
2018-06-12T13:19:00.134-1000	[#################.......]  opq.measurements  28.9MB/40.4MB  (71.7%)
2018-06-12T13:19:00.134-1000	[........................]     opq.fs.chunks  65.4MB/3.52GB   (1.8%)
2018-06-12T13:19:00.134-1000	[###################.....]        opq.trends  48.6MB/60.3MB  (80.6%)
2018-06-12T13:19:00.134-1000
2018-06-12T13:19:01.181-1000	finished restoring opq.box_events (73544 documents)
2018-06-12T13:19:01.209-1000	reading metadata for opq.fs.files from opq/fs.files.metadata.json.gz
2018-06-12T13:19:01.226-1000	restoring opq.fs.files from opq/fs.files.bson.gz
2018-06-12T13:19:02.163-1000	restoring indexes for collection opq.fs.files from metadata
2018-06-12T13:19:02.659-1000	finished restoring opq.fs.files (73536 documents)
2018-06-12T13:19:02.666-1000	reading metadata for opq.events from opq/events.metadata.json.gz
2018-06-12T13:19:02.696-1000	restoring opq.events from opq/events.bson.gz
2018-06-12T13:19:03.126-1000	[##################......]  opq.measurements  30.9MB/40.4MB  (76.5%)
2018-06-12T13:19:03.126-1000	[........................]     opq.fs.chunks  70.3MB/3.52GB   (2.0%)
2018-06-12T13:19:03.126-1000	[####################....]        opq.trends  52.6MB/60.3MB  (87.2%)
2018-06-12T13:19:03.126-1000	[#################.......]        opq.events   816KB/1.10MB  (72.4%)
2018-06-12T13:19:03.126-1000
2018-06-12T13:19:03.332-1000	[########################]  opq.events  1.10MB/1.10MB  (100.0%)
2018-06-12T13:19:03.332-1000	restoring indexes for collection opq.events from metadata
2018-06-12T13:19:03.575-1000	finished restoring opq.events (38853 documents)
2018-06-12T13:19:03.581-1000	reading metadata for opq.zipcodes from opq/zipcodes.metadata.json.gz
2018-06-12T13:19:03.604-1000	restoring opq.zipcodes from opq/zipcodes.bson.gz
2018-06-12T13:19:03.937-1000	restoring indexes for collection opq.zipcodes from metadata
2018-06-12T13:19:04.024-1000	finished restoring opq.zipcodes (33144 documents)
2018-06-12T13:19:04.031-1000	reading metadata for opq.cronHistory from opq/cronHistory.metadata.json.gz
2018-06-12T13:19:04.228-1000	restoring opq.cronHistory from opq/cronHistory.bson.gz
2018-06-12T13:19:04.574-1000	restoring indexes for collection opq.cronHistory from metadata
2018-06-12T13:19:04.695-1000	finished restoring opq.cronHistory (17284 documents)
2018-06-12T13:19:04.702-1000	reading metadata for opq.health from opq/health.metadata.json.gz
2018-06-12T13:19:04.774-1000	restoring opq.health from opq/health.bson.gz
2018-06-12T13:19:04.816-1000	restoring indexes for collection opq.health from metadata
2018-06-12T13:19:04.882-1000	finished restoring opq.health (2793 documents)
2018-06-12T13:19:04.883-1000	reading metadata for opq.users from opq/users.metadata.json.gz
2018-06-12T13:19:04.900-1000	restoring opq.users from opq/users.bson.gz
2018-06-12T13:19:04.906-1000	restoring indexes for collection opq.users from metadata
2018-06-12T13:19:05.029-1000	finished restoring opq.users (4 documents)
2018-06-12T13:19:05.031-1000	reading metadata for opq.opq_boxes from opq/opq_boxes.metadata.json.gz
2018-06-12T13:19:05.056-1000	restoring opq.opq_boxes from opq/opq_boxes.bson.gz
2018-06-12T13:19:05.062-1000	restoring indexes for collection opq.opq_boxes from metadata
2018-06-12T13:19:05.108-1000	finished restoring opq.opq_boxes (6 documents)
2018-06-12T13:19:05.110-1000	reading metadata for opq.system_stats from opq/system_stats.metadata.json.gz
2018-06-12T13:19:05.125-1000	restoring opq.system_stats from opq/system_stats.bson.gz
2018-06-12T13:19:05.129-1000	no indexes to restore
2018-06-12T13:19:05.130-1000	finished restoring opq.system_stats (1 document)
2018-06-12T13:19:05.135-1000	reading metadata for opq.BoxOwners from opq/BoxOwners.metadata.json.gz
2018-06-12T13:19:05.150-1000	restoring opq.BoxOwners from opq/BoxOwners.bson.gz
2018-06-12T13:19:05.156-1000	no indexes to restore
2018-06-12T13:19:05.158-1000	finished restoring opq.BoxOwners (21 documents)
2018-06-12T13:19:05.160-1000	reading metadata for opq.locations from opq/locations.metadata.json.gz
2018-06-12T13:19:05.187-1000	restoring opq.locations from opq/locations.bson.gz
2018-06-12T13:19:05.206-1000	no indexes to restore
2018-06-12T13:19:05.206-1000	finished restoring opq.locations (7 documents)
2018-06-12T13:19:05.207-1000	reading metadata for opq.UserProfiles from opq/UserProfiles.metadata.json.gz
2018-06-12T13:19:05.230-1000	restoring opq.UserProfiles from opq/UserProfiles.bson.gz
2018-06-12T13:19:05.248-1000	no indexes to restore
2018-06-12T13:19:05.255-1000	finished restoring opq.UserProfiles (4 documents)
2018-06-12T13:19:05.257-1000	reading metadata for opq.regions from opq/regions.metadata.json.gz
2018-06-12T13:19:05.283-1000	restoring opq.regions from opq/regions.bson.gz
2018-06-12T13:19:05.305-1000	no indexes to restore
2018-06-12T13:19:05.305-1000	finished restoring opq.regions (4 documents)
2018-06-12T13:19:05.307-1000	reading metadata for opq.roles from opq/roles.metadata.json.gz
2018-06-12T13:19:05.331-1000	restoring opq.roles from opq/roles.bson.gz
2018-06-12T13:19:05.333-1000	restoring indexes for collection opq.roles from metadata
2018-06-12T13:19:05.362-1000	finished restoring opq.roles (1 document)
2018-06-12T13:19:05.372-1000	reading metadata for opq.meteor_accounts_loginServiceConfiguration from opq/meteor_accounts_loginServiceConfiguration.metadata.json.gz
2018-06-12T13:19:05.400-1000	restoring opq.meteor_accounts_loginServiceConfiguration from opq/meteor_accounts_loginServiceConfiguration.bson.gz
2018-06-12T13:19:05.406-1000	restoring indexes for collection opq.meteor_accounts_loginServiceConfiguration from metadata
2018-06-12T13:19:05.417-1000	finished restoring opq.meteor_accounts_loginServiceConfiguration (0 documents)
2018-06-12T13:19:06.163-1000	[####################....]  opq.measurements  34.4MB/40.4MB  (85.2%)
2018-06-12T13:19:06.163-1000	[........................]     opq.fs.chunks  78.5MB/3.52GB   (2.2%)
2018-06-12T13:19:06.163-1000	[#######################.]        opq.trends  59.2MB/60.3MB  (98.2%)
2018-06-12T13:19:06.163-1000
2018-06-12T13:19:06.438-1000	[########################]  opq.trends  60.3MB/60.3MB  (100.0%)
2018-06-12T13:19:06.438-1000	restoring indexes for collection opq.trends from metadata
2018-06-12T13:19:09.126-1000	[####################....]  opq.measurements  35.0MB/40.4MB  (86.6%)
2018-06-12T13:19:09.126-1000	[........................]     opq.fs.chunks  79.9MB/3.52GB   (2.2%)
2018-06-12T13:19:09.126-1000
2018-06-12T13:19:12.126-1000	[####################....]  opq.measurements  35.0MB/40.4MB  (86.6%)
2018-06-12T13:19:12.126-1000	[........................]     opq.fs.chunks  79.9MB/3.52GB   (2.2%)
2018-06-12T13:19:12.126-1000
2018-06-12T13:19:15.126-1000	[####################....]  opq.measurements  35.0MB/40.4MB  (86.6%)
2018-06-12T13:19:15.126-1000	[........................]     opq.fs.chunks  79.9MB/3.52GB   (2.2%)
2018-06-12T13:19:15.126-1000
2018-06-12T13:19:16.668-1000	finished restoring opq.trends (1545597 documents)
2018-06-12T13:19:18.137-1000	[#######################.]  opq.measurements  39.1MB/40.4MB  (97.0%)
2018-06-12T13:19:18.137-1000	[........................]     opq.fs.chunks  88.3MB/3.52GB   (2.5%)
2018-06-12T13:19:18.138-1000
2018-06-12T13:19:18.653-1000	[########################]  opq.measurements  40.4MB/40.4MB  (100.0%)
2018-06-12T13:19:18.653-1000	restoring indexes for collection opq.measurements from metadata
2018-06-12T13:19:21.127-1000	[........................]  opq.fs.chunks  104MB/3.52GB  (2.9%)
2018-06-12T13:19:24.130-1000	[........................]  opq.fs.chunks  124MB/3.52GB  (3.4%)
2018-06-12T13:19:27.126-1000	[........................]  opq.fs.chunks  142MB/3.52GB  (3.9%)
2018-06-12T13:19:30.126-1000	[#.......................]  opq.fs.chunks  160MB/3.52GB  (4.4%)
2018-06-12T13:19:33.126-1000	[#.......................]  opq.fs.chunks  176MB/3.52GB  (4.9%)
2018-06-12T13:19:34.615-1000	finished restoring opq.measurements (2016516 documents)
2018-06-12T13:19:36.126-1000	[#.......................]  opq.fs.chunks  190MB/3.52GB  (5.3%)
2018-06-12T13:19:39.126-1000	[#.......................]  opq.fs.chunks  210MB/3.52GB  (5.8%)
2018-06-12T13:19:42.126-1000	[#.......................]  opq.fs.chunks  229MB/3.52GB  (6.3%)
2018-06-12T13:19:45.129-1000	[#.......................]  opq.fs.chunks  247MB/3.52GB  (6.9%)
2018-06-12T13:19:48.126-1000	[#.......................]  opq.fs.chunks  264MB/3.52GB  (7.3%)
2018-06-12T13:19:51.126-1000	[#.......................]  opq.fs.chunks  282MB/3.52GB  (7.8%)
2018-06-12T13:19:54.131-1000	[##......................]  opq.fs.chunks  300MB/3.52GB  (8.3%)
2018-06-12T13:19:57.126-1000	[##......................]  opq.fs.chunks  318MB/3.52GB  (8.8%)
2018-06-12T13:20:00.126-1000	[##......................]  opq.fs.chunks  336MB/3.52GB  (9.3%)
2018-06-12T13:20:03.133-1000	[##......................]  opq.fs.chunks  353MB/3.52GB  (9.8%)
2018-06-12T13:20:06.136-1000	[##......................]  opq.fs.chunks  370MB/3.52GB  (10.3%)
2018-06-12T13:20:09.126-1000	[##......................]  opq.fs.chunks  387MB/3.52GB  (10.7%)
2018-06-12T13:20:12.129-1000	[##......................]  opq.fs.chunks  402MB/3.52GB  (11.2%)
2018-06-12T13:20:15.126-1000	[##......................]  opq.fs.chunks  415MB/3.52GB  (11.5%)
2018-06-12T13:20:18.127-1000	[##......................]  opq.fs.chunks  430MB/3.52GB  (11.9%)
2018-06-12T13:20:21.126-1000	[##......................]  opq.fs.chunks  448MB/3.52GB  (12.4%)
2018-06-12T13:20:24.126-1000	[###.....................]  opq.fs.chunks  505MB/3.52GB  (14.0%)
2018-06-12T13:20:27.126-1000	[###.....................]  opq.fs.chunks  544MB/3.52GB  (15.1%)
2018-06-12T13:20:30.126-1000	[###.....................]  opq.fs.chunks  565MB/3.52GB  (15.7%)
2018-06-12T13:20:33.126-1000	[###.....................]  opq.fs.chunks  586MB/3.52GB  (16.3%)
2018-06-12T13:20:36.126-1000	[####....................]  opq.fs.chunks  607MB/3.52GB  (16.9%)
2018-06-12T13:20:39.130-1000	[####....................]  opq.fs.chunks  628MB/3.52GB  (17.5%)
2018-06-12T13:20:42.126-1000	[####....................]  opq.fs.chunks  703MB/3.52GB  (19.5%)
2018-06-12T13:20:45.126-1000	[#####...................]  opq.fs.chunks  806MB/3.52GB  (22.4%)
2018-06-12T13:20:48.126-1000	[#####...................]  opq.fs.chunks  879MB/3.52GB  (24.4%)
2018-06-12T13:20:51.126-1000	[######..................]  opq.fs.chunks  966MB/3.52GB  (26.8%)
2018-06-12T13:20:54.128-1000	[######..................]  opq.fs.chunks  1.02GB/3.52GB  (29.0%)
2018-06-12T13:20:57.126-1000	[#######.................]  opq.fs.chunks  1.12GB/3.52GB  (31.7%)
2018-06-12T13:21:00.126-1000	[########................]  opq.fs.chunks  1.21GB/3.52GB  (34.3%)
2018-06-12T13:21:03.126-1000	[########................]  opq.fs.chunks  1.30GB/3.52GB  (36.9%)
2018-06-12T13:21:06.126-1000	[#########...............]  opq.fs.chunks  1.40GB/3.52GB  (39.8%)
2018-06-12T13:21:09.126-1000	[##########..............]  opq.fs.chunks  1.49GB/3.52GB  (42.4%)
2018-06-12T13:21:12.126-1000	[##########..............]  opq.fs.chunks  1.59GB/3.52GB  (45.2%)
2018-06-12T13:21:15.126-1000	[###########.............]  opq.fs.chunks  1.69GB/3.52GB  (48.0%)
2018-06-12T13:21:18.127-1000	[############............]  opq.fs.chunks  1.79GB/3.52GB  (51.0%)
2018-06-12T13:21:21.128-1000	[#############...........]  opq.fs.chunks  1.91GB/3.52GB  (54.2%)
2018-06-12T13:21:24.126-1000	[#############...........]  opq.fs.chunks  2.01GB/3.52GB  (57.3%)
2018-06-12T13:21:27.126-1000	[##############..........]  opq.fs.chunks  2.12GB/3.52GB  (60.4%)
2018-06-12T13:21:30.126-1000	[###############.........]  opq.fs.chunks  2.23GB/3.52GB  (63.5%)
2018-06-12T13:21:33.126-1000	[###############.........]  opq.fs.chunks  2.32GB/3.52GB  (66.0%)
2018-06-12T13:21:36.126-1000	[################........]  opq.fs.chunks  2.40GB/3.52GB  (68.4%)
2018-06-12T13:21:39.126-1000	[################........]  opq.fs.chunks  2.45GB/3.52GB  (69.6%)
2018-06-12T13:21:42.126-1000	[################........]  opq.fs.chunks  2.48GB/3.52GB  (70.5%)
2018-06-12T13:21:45.126-1000	[#################.......]  opq.fs.chunks  2.51GB/3.52GB  (71.3%)
2018-06-12T13:21:48.126-1000	[#################.......]  opq.fs.chunks  2.54GB/3.52GB  (72.1%)
2018-06-12T13:21:51.140-1000	[#################.......]  opq.fs.chunks  2.57GB/3.52GB  (73.1%)
2018-06-12T13:21:54.126-1000	[#################.......]  opq.fs.chunks  2.62GB/3.52GB  (74.4%)
2018-06-12T13:21:57.126-1000	[##################......]  opq.fs.chunks  2.68GB/3.52GB  (76.3%)
2018-06-12T13:22:00.126-1000	[##################......]  opq.fs.chunks  2.75GB/3.52GB  (78.3%)
2018-06-12T13:22:03.126-1000	[###################.....]  opq.fs.chunks  2.81GB/3.52GB  (80.0%)
2018-06-12T13:22:06.126-1000	[###################.....]  opq.fs.chunks  2.88GB/3.52GB  (82.0%)
2018-06-12T13:22:09.126-1000	[####################....]  opq.fs.chunks  2.95GB/3.52GB  (83.9%)
2018-06-12T13:22:12.126-1000	[####################....]  opq.fs.chunks  3.01GB/3.52GB  (85.5%)
2018-06-12T13:22:15.132-1000	[####################....]  opq.fs.chunks  3.08GB/3.52GB  (87.5%)
2018-06-12T13:22:18.126-1000	[#####################...]  opq.fs.chunks  3.14GB/3.52GB  (89.3%)
2018-06-12T13:22:21.126-1000	[#####################...]  opq.fs.chunks  3.20GB/3.52GB  (91.0%)
2018-06-12T13:22:24.126-1000	[######################..]  opq.fs.chunks  3.26GB/3.52GB  (92.7%)
2018-06-12T13:22:27.126-1000	[######################..]  opq.fs.chunks  3.31GB/3.52GB  (94.0%)
2018-06-12T13:22:30.126-1000	[######################..]  opq.fs.chunks  3.34GB/3.52GB  (95.0%)
2018-06-12T13:22:33.126-1000	[#######################.]  opq.fs.chunks  3.38GB/3.52GB  (96.1%)
2018-06-12T13:22:36.130-1000	[#######################.]  opq.fs.chunks  3.42GB/3.52GB  (97.2%)
2018-06-12T13:22:39.126-1000	[#######################.]  opq.fs.chunks  3.46GB/3.52GB  (98.3%)
2018-06-12T13:22:42.126-1000	[#######################.]  opq.fs.chunks  3.49GB/3.52GB  (99.4%)
2018-06-12T13:22:43.743-1000	[########################]  opq.fs.chunks  3.52GB/3.52GB  (100.0%)
2018-06-12T13:22:43.743-1000	restoring indexes for collection opq.fs.chunks from metadata
2018-06-12T13:23:47.327-1000	finished restoring opq.fs.chunks (125340 documents)
2018-06-12T13:23:47.327-1000	done
```

##### Bring up OPQ services

Visit and perform the linked instructions for re-enable OPQ services.

1. Start Makai by following the instructions in the [Makai Deployment Guide](deploy-makai.md).
2. Start Mauka by following the instructions in the [Mauka deployment guide](deploy-mauka.md).
3. Start Health by following the instructions in the [Health Deployment Guide](deploy-health.md).
4. Start View by following the instructions in the [View Deployment Guide](deploy-view.md).