---
title: OPQ View
sidebar_label: View
---

OPQ View is a web application that provides visualization, notification, and user management services. 


## Installation

### Install Meteor

First, [install Meteor](https://www.meteor.com/install).


### Install libraries

Now [download a copy of OPQ](https://github.com/openpowerquality/opq/archive/master.zip), or clone it using git.
  
Next, cd into the opq/view/app/ directory and install libraries with:

```
$ meteor npm install
```

### Configure Settings

The 'start' script loads the settings file located in view/config/settings.development.json.  This file enables you to specify information about the authorized users of the system and the OPQ Boxes.  Currently, editing this file is the only way to manage user and OPQ Box meta-data.  The information about users and OPQ boxes is "upserted" each time the system is started. What this means is that you can edit the contents of the settings.development.json, then restart Meteor, and your changes to users and OPQ Boxes will take effect.  (You do not have to reset the Mongo database.)

Here is a simplified example of a settings.development.json file that illustrates its capabilities:

```
{
  "syncedCronLogging": false,
  "enableStartupIntegrityCheck": false,
  "integrityCheckCollections": ["fs.files", "fs.chunks"],
  "systemStatsUpdateIntervalSeconds": 10,
  "opqBoxes" : [
    { "box_id": "5", 
      "name": "Philip's Box", 
      "description": "Version 2.8, 2017", 
      "calibration_constant": 146.5,
      "locations": [
        {"start_time_ms": 1514844000000, 
         "zipcode": "96822", 
         "nickname": "CSDL Office" },
        {"start_time_ms": "2018-03-01 12:00:00", 
         "zipcode": "96734", 
         "nickname": "Kailua, HI (PJ)" }]
    }
  ],

  "userProfiles": [
    { "username": "johnson@hawaii.edu", 
      "password": "foo", 
      "firstName": "Philip", 
      "lastName": "Johnson", 
      "role": "admin", 
      "boxIds": ["1", "2", "3"]
    },
  ]
}
```

Here are the currently available properties:

| Property | Description |
| -- | -- |
| syncedCronLogging | System Stats are generated through a cron job.  This property should be true or false in order to indicate if logging information should be sent to the console. |
| enableStartupIntegrityCheck | This boolean indicates whether or not to check that the documents in the Mongo database conform to our data model. |
| integrityCheckCollections | This array specifies the Mongo collections to check if enableStartupIntegrityCheck is true. |
| opqBoxes | An array of objects, each object providing metadata about an OPQBox according to our data model.  Note that for convenience, the `start_time_ms` field in the locations subarray can be either a UTC millisecond value, or a string that can be parsed by Moment and converted to UTC milliseconds. The example above shows both possible ways of specifying the `start_time_ms`. |
| userProfiles | An array of objects, each object providing metadata about an authorized user of OPQView.  The role field can be either "admin" or "user". |

Note that a "production" settings file is used for deployment to emilia.  It has the same structure, but the actual file is not committed to github.  

### Use snapshot DB (optional)

For OPQView development, it can be useful to initialize your development database with a snapshot of OPQ data. Here are the steps to do so. 

[Install MongoDB](https://docs.mongodb.com/manual/installation/).  Even though Meteor comes with a copy of Mongo, you will need to install MongoDB in order to run the mongorestore command.  

Download a snapshot of an OPQ database into a directory outside of the opq repository directory. (This is to avoid unintentional committing of the DB snapshot). Here is a link to a recent DB snapshot:
 
   * [opq.dump.01May2018.tar.gz](https://drive.google.com/file/d/18SYu0cTL9e0p99yp0-w_Ri-1SjtXGYgF/view?usp=sharing) (4 GB)

Uncompress the downloaded tar.gz file. (Typically, double-clicking the file name will do the trick.) This will create a directory called "opq".

Delete the current contents of your local development OPQ database. To do this, stop Meteor if it is running, then invoke

```
meteor reset
```

Start meteor so that the development version of MongoDB is started. Do not run the 'start' script, just invoke `meteor`. This is to prevent OPQBoxes from being created twice:

```
meteor
```

Bring up a second command shell, then cd to the directory containing the "opq" snapshot directory, and run:

```
mongorestore -h 127.0.0.1 --port 3001 --gzip -d meteor opq
```

Here is an excerpt of the sample output from running the above command. It will take up to 10 minutes:

```
mongorestore -h 127.0.0.1 --port 3001 --gzip -d meteor opq
2018-01-29T14:50:49.999-1000	building a list of collections to restore from opq dir

                  (many lines deleted)

2018-01-29T14:53:01.999-1000	finished restoring meteor.fs.chunks (55639 documents)
2018-01-29T14:53:01.999-1000	done
```

Control-c to exit Meteor.  This is important, since you brought up Meteor without the settings file. 

### Use production DB (optional) 

An alternative to loading a snapshot of the database into your local Mongo database is to connect directly to the Mongo database running on emilia.  This is good because you can, for example, test out real-time components on a database that is constantly receiving new data from boxes. It is bad because your development application now has the ability to mess up the production database.  Be careful.

Here are the steps to enabling your development version of OPQView utilize the production database on emilia:

**1. Obtain an account on emilia.ics.hawaii.edu**

See Anthony who will provide you with the credentials. Usually this will be the account "opquser".

**2. Forward emilia.ics.hawaii.edu:27017 to localhost:27017**

Once you have an account on emilia, you can use ssh port forwarding to create a port on your local machine that acts as if it was the MongoDB port on emilia.  Open a new shell, and execute the following command:

```
$ ssh -C -p 29862 -N -L 27017:localhost:27017 opquser@emilia.ics.hawaii.edu
```

You'll need to replace `opquser` if that's not the account you're using, and you'll need to supply the correct password after executing this command. Once you successfully provide your password, port forwarding will have started.  When you no longer want port forwarding, you can control-c or close the shell. 

**3. Run OPQView, specifying an alternative MongoDB port**

To run OPQView and connect to the database on emilia, invoke the following command:

```
$ MONGO_URL='mongodb://localhost:27017/opq' meteor npm run start 
```
This is simply the normal command to invoke OPQView (i.e. `meteor npm run start`, prefixed with the definition of the MONGO_URL environment variable specifying the port and database name associated with emilia.)

### Run OPQView 

To start up OPQView on the local development database, run Meteor using our start script as follows:

```
meteor npm run start 
```

You should seem messages like this in the console:

```
$ meteor npm run start 

> opqview@ start /Users/philipjohnson/github/openpowerquality/opq/view/app
> meteor --settings ../config/settings.development.json

[[[[[ ~/github/openpowerquality/opq/view/app ]]]]]

=> Started proxy.                             
=> Started MongoDB.                           
I20180328-12:38:05.148(-10)? Starting SyncedCron to update System Stats every 10 seconds.
I20180328-12:38:05.207(-10)? Initializing 4 user profiles.
I20180328-12:38:05.207(-10)? Initializing 5 OPQ boxes.
=> Started your app.

=> App running at: http://localhost:3000/
```

You should be able to see the OPQView landing page at http://localhost:3000.  It looks like this:

<img src="/docs/assets/view/opqview-landing-page.png" >

## Testing

OPQ View is a client-server system, and so testing must take that architectural reality into account.  Meteor provides support for both "unit" tests, which are tests that are executed only inside the server environment, and "integration" tests, which are tests that are invoked inside the client environment (but which must also interact with the running server).  The [Meteor Guide Chapter on Testing](https://guide.meteor.com/testing.html) is the authoritative reference on Meteor testing. 

We use the [Mocha](https://mochajs.org/) test runner and  [Chai Expect Assertions](http://chaijs.com/guide/styles/#expect).

Each collection class contains its tests in a "sibling" file. For example, the unit tests for UserProfilesCollection.js are located in UserProfilesCollection.test.js, and its integration tests are located in UserProfilesCollection.methods.app-test.js. 

The test file names are important: Meteor wants unit tests to be in files with the suffix `test.js`, and integration tests to be in files with the suffix `app-test.js`. 

Many tests require the database to be initialized with test values.  OPQ provides "database fixture" files for this purpose. They are discussed further below.

### ESLint 

The most minimal form of "testing" (i.e. quality assurance) in OPQ View is [ESLint](https://eslint.org/).  We have set up an ESLint configuration for OPQ View to which all code must comply.  (Or, if it doesn't comply, you must explicitly disable the ESLint rule for the non-compliant code.)  To manually run ESLint over your code base from the command line, you can invoke:

```
app$ meteor npm run lint
     
> opqview@ lint /Users/philipjohnson/github/openpowerquality/opq/view/app
> eslint --quiet --ext .jsx --ext .js ./imports
```

Being able to run ESLint from the commmand line is important in order to support continuous integration, but the best way for developers to maintain compliance with ESLint is to install it into your development environment. We use [IntelliJ IDEA](https://www.jetbrains.com/idea/) with plugins for Javascript, Meteor, and ESLint. 

### Unit testing

To invoke all of the unit tests defined in files with the suffix `test.js`, use `meteor npm run test`. Here is an example invocation of this command

```
~/g/o/o/v/app (master|✔) $ meteor npm run test

> opqview@ pretest /Users/philipjohnson/github/openpowerquality/opq/view/app
> npm run lint


> opqview@ lint /Users/philipjohnson/github/openpowerquality/opq/view/app
> eslint --quiet --ext .jsx --ext .js ./imports


> opqview@ test /Users/philipjohnson/github/openpowerquality/opq/view/app
> METEOR_NO_RELEASE_CHECK=1 TEST_BROWSER_DRIVER=nightmare meteor test --once --driver-package meteortesting:mocha --no-release-check --port 3100

[[[[[ Tests ]]]]]                             

=> Started proxy.                             
=> Started MongoDB.                           
I20180522-16:07:41.049(-10)?                  
I20180522-16:07:41.087(-10)? --------------------------------
I20180522-16:07:41.088(-10)? ----- RUNNING SERVER TESTS -----
I20180522-16:07:41.088(-10)? --------------------------------
I20180522-16:07:41.088(-10)? 
I20180522-16:07:41.088(-10)? 
I20180522-16:07:41.089(-10)? 
I20180522-16:07:41.089(-10)?   LocationsCollection
=> Started your app.

=> App running at: http://localhost:3100/
    ✓ #define, #findLocation (212ms)
I20180522-16:07:41.275(-10)? 
I20180522-16:07:41.275(-10)?   RegionsCollection
    ✓ #define, #findLocationsForRegion, #findRegionsForLocation (66ms)
I20180522-16:07:41.382(-10)? 
I20180522-16:07:41.382(-10)?   BoxOwnersCollection
    ✓ #define, #findBoxesWithOwner, #findOwnersWithBox (58ms)
I20180522-16:07:41.408(-10)? 
I20180522-16:07:41.408(-10)?   UserProfilesCollection
    ✓ #define, #isDefined, #findBoxIds, #findDoc, #findOne, #remove (161ms)
I20180522-16:07:41.572(-10)? 
I20180522-16:07:41.572(-10)? 
I20180522-16:07:41.572(-10)?   4 passing (524ms)
I20180522-16:07:41.572(-10)? 
I20180522-16:07:41.573(-10)? 
I20180522-16:07:41.573(-10)? --------------------------------
I20180522-16:07:41.573(-10)? ----- RUNNING CLIENT TESTS -----
I20180522-16:07:41.573(-10)? --------------------------------
I20180522-16:07:43.033(-10)? 
I20180522-16:07:43.035(-10)? 
I20180522-16:07:43.036(-10)?   0 passing (3ms)
I20180522-16:07:43.036(-10)? 
I20180522-16:07:43.093(-10)? All tests finished!
I20180522-16:07:43.093(-10)? 
I20180522-16:07:43.094(-10)? --------------------------------
I20180522-16:07:43.094(-10)? SERVER FAILURES: 0
I20180522-16:07:43.094(-10)? CLIENT FAILURES: 0
I20180522-16:07:43.094(-10)? --------------------------------
~/g/o/o/v/app (master|✔) $ 
```

There should be no server or client failures listed. There will also be no client tests at all. In OPQ View, all unit tests occur on the server side.

### Integration testing

Integration tests check that client-level code can interact with the server side appropriately.  To invoke the integration tests, run `meteor npm run test-app`:

```bash
~/g/o/o/v/app (master|✔) $ meteor npm run test-app

> opqview@ test-app /Users/philipjohnson/github/openpowerquality/opq/view/app
> METEOR_NO_RELEASE_CHECK=1 TEST_BROWSER_DRIVER=nightmare meteor test --full-app --once --driver-package meteortesting:mocha --port 3100

[[[[[ Tests ]]]]]                             

=> Started proxy.                             
=> Started MongoDB.                           
I20180522-16:11:43.843(-10)?                  
I20180522-16:11:43.890(-10)? --------------------------------
I20180522-16:11:43.891(-10)? --- RUNNING APP SERVER TESTS ---
I20180522-16:11:43.891(-10)? --------------------------------
I20180522-16:11:43.892(-10)? 
I20180522-16:11:43.892(-10)? 
I20180522-16:11:43.892(-10)? 
I20180522-16:11:43.893(-10)?   0 passing (0ms)
I20180522-16:11:43.893(-10)? 
I20180522-16:11:43.893(-10)? 
I20180522-16:11:43.893(-10)? --------------------------------
I20180522-16:11:43.894(-10)? --- RUNNING APP CLIENT TESTS ---
I20180522-16:11:43.894(-10)? --------------------------------
I20180522-16:11:44.014(-10)? Defining test user: opqtestuser@hawaii.edu
=> Started your app.

=> App running at: http://localhost:3100/
I20180522-16:11:46.286(-10)? 
I20180522-16:11:46.286(-10)? 
I20180522-16:11:46.496(-10)?   UserProfilesCollection Meteor Methods 
I20180522-16:11:46.589(-10)?     Loaded database/fixture/minimal.fixture.json: Defines a single entity in a selection of OPQ collections to show how it's done.
I20180522-16:11:46.589(-10)? Defining 2 locations documents.
I20180522-16:11:46.655(-10)? Defining 2 regions documents.
I20180522-16:11:46.725(-10)? Defining 2 opq_boxes documents.
I20180522-16:11:46.789(-10)? Defining 2 UserProfiles documents.
I20180522-16:11:47.056(-10)? Defining 0 events documents.
I20180522-16:11:47.056(-10)? Defining 0 box_events documents.
I20180522-16:11:47.056(-10)? Defining 0 trends documents.
I20180522-16:11:47.426(-10)?     ✓ Verify DB fixture
I20180522-16:11:47.529(-10)?     ✓ Define Method (103ms)
I20180522-16:11:47.540(-10)?     ✓ Update Method
I20180522-16:11:47.558(-10)?     ✓ Remove Method
I20180522-16:11:47.559(-10)? 
I20180522-16:11:47.559(-10)? 
I20180522-16:11:47.560(-10)?   4 passing (1s)
I20180522-16:11:47.560(-10)? 
I20180522-16:11:47.608(-10)? All tests finished!
I20180522-16:11:47.609(-10)? 
I20180522-16:11:47.609(-10)? --------------------------------
I20180522-16:11:47.609(-10)? APP SERVER FAILURES: 0
I20180522-16:11:47.609(-10)? APP CLIENT FAILURES: 0
I20180522-16:11:47.610(-10)? --------------------------------
```

As you can see, in contrast to unit tests, in which only server-side tests are run, only client-side tests are invoked in "app-test" mode. 

### Continuous Integration

Finally, we have set up continuous integration for OPQ View with [Semaphore CI](https://semaphoreci.com/). The CI process is set up so that each time there is a commit to the master branch of the OPQ repository, the sources are checked out to Semaphore, and the unit tests and integration tests are run.  The results are reported to the #github channel in the OPQ Slack workspace.

Consult the [Semaphore CI OPQ workspace](https://semaphoreci.com/openpowerquality/opq/) for more details.



 




 

