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

### Configure settings (optional)

The 'start' script loads the settings file located in view/config/settings.development.json.  This file enables you to specify information about the authorized users of the system and the OPQ Boxes.  Currently, editing this file is the only way to manage user and OPQ Box meta-data.  If the "initializeEntities" field is true, then the information about users and OPQ boxes is "upserted" each time the system is started. What this means is that you can edit the contents of the settings.development.json, set initializeEntities to true, then restart Meteor, and your changes to users and OPQ Boxes will take effect.  (You do not have to reset the Mongo database.)

Here is a simplified example of a settings.development.json file that illustrates its capabilities:

```
{
  "syncedCronLogging": false,
  "enableStartupIntegrityCheck": false,
  "integrityCheckCollections": ["fs.files", "fs.chunks"],
  "systemStatsUpdateIntervalSeconds": 10,
  "initializeEntities": false,
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
| initializeEntities | If true, then the OPQ Box and User Profiles defined in this file will be loaded into the MongoDB database on startup. Prior entity definitions will be overwritten. Default: false. |
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

## Development Environment

### Meteor

From past experience, developers who are new to Meteor and who are using Windows can find Meteor startup and recompilation times to be excessive.  Mac and Unix developers do not generally experience these issues.  Here are [a collection of Windows-specific Meteor tips](http://courses.ics.hawaii.edu/ics314s18/morea/meteor-1/reading-meteor-tips.html#windows-specific-meteor-tips) that might prove useful.

### IntelliJ IDEA

For OPQ View development, we highly recommend [IntelliJ IDEA](https://www.jetbrains.com/idea/) with plugins for Javascript, Meteor, and ESLint. If you are new to IntelliJ IDEA, we recommend that you review the [ICS 314 Development Environments module](http://courses.ics.hawaii.edu/ics314s18/modules/development-environments/) and more specifically the [Install IntelliJ IDEA experience](http://courses.ics.hawaii.edu/ics314s18/morea/development-environments/experience-install-intellij-idea.html) for detailed instructions on how to install and configure IntelliJ IDEA for effective Javascript development. For example, the ICS SE Code Style preferences help IntelliJ to automatically format code to comply with ESLint.

### ESLint

[ESLint](https://eslint.org/) is a static quality assurance tool that helps ensure that Javascript code conforms to best practices. For example, it can flag uses of `==`,  which should almost always be replaced by `===`.  For novice Javascript developers, ESLint can detect many significant problems in code due to inappropriate language use, and for more experienced Javascript developers, ESLint can help identify places where code can be improved by use of ES6 (and later) language constructs. 

To install ESLint in your development environment, please follow the instructions in the [Improve code quality using ESLint in IntelliJ](http://courses.ics.hawaii.edu/ics314s18/morea/coding-standards/experience-install-eslint.html).

### React

[React](https://reactjs.org/) is the Javascript framework used to build the OPQ View user interface. More specifically, we use a library built on top of React called [Semantic UI React](https://react.semantic-ui.com/).

If you are not familiar with React or Semantic UI, you might want to work through the [ICS 314 React Module](http://courses.ics.hawaii.edu/ics314s18/modules/react/), which has a curated set of tutorial exercises.  

Once you have basic familiarity with React, you can hopefully become facile with Semantic UI React by reading the OPQ View code. It's pretty straightforward, and the Semantic UI React documentation is excellent.

### Uniforms 

For form implementation, we use the [vazco/uniforms](https://github.com/vazco/uniforms) package, which simplifies form implementation, is well maintained, and works well with both Meteor and Semantic UI.

### React Time Series Charts

For charts and visualizations, our first choice is the [ESNet React Time Series Charts](http://software.es.net/react-timeseries-charts/#/).  This charting library is designed with a variety of special features for time series data visualization.  Please try this package first, and consult other developers if you believe a different package will better suit your visualization needs. 

## Quality Assurance

### Coding standards

As noted above, we use ESLint to help ensure that OPQ View code adheres to the current best practices for Javascript and Meteor development. 

To manually invoke ESLint, invoke `meteor npm run lint`. Here is an example invocation:

```
app$ meteor npm run lint
     
> opqview@ lint /Users/philipjohnson/github/openpowerquality/opq/view/app
> eslint --quiet --ext .jsx --ext .js ./imports
```
Any violations will be reported and the command will exit with a non-zero exit code.

Being able to run ESLint from the commmand line is important in order to support continuous integration, but the most efficient way for developers to maintain compliance with ESLint is to install it into your IDE. Please follow the instructions [above](cloud-view.md#eslint) to install ESLint into IntelliJ IDEA.

### Data model testing

In OPQ View, [Meteor unit testing](https://guide.meteor.com/testing.html) is implemented as server-side testing of the data model contained in the `view/app/imports/api` directory. A recent version of this directory looks in part like this:

```
api/
  base/
  box-events
  events/
  fs-chunks/
  fs-files/
  health/
  locations/
  measurements/
  opq/
  opq-boxes/
  regions/
  system-stats/
  test/
  trends/
  users/
``` 

Most of these directories contain files that implement an entity in the [OPQ Data Model](cloud-datamodel.md), such as "Event" or "Measurement". Each entity is implemented as a Javascript Class that encapsulates access to the underlying MongoDB collection, and also provides higher level methods (such as `define`, `update`, and `remove`) that ensure that the integrity of the data model is maintained as objects are created, modified, and deleted.

To test that these entity implementations work correctly, data model classes have a corresponding test file with suffix `test.js`.   We use the [Mocha](https://mochajs.org/) test runner and  [Chai Expect Assertions](http://chaijs.com/guide/styles/#expect) libraries to implement the tests. Here is an excerpt from the [TrendsCollection.test.js](https://github.com/openpowerquality/opq/blob/master/view/app/imports/api/trends/TrendsCollection.test.js) file that illustrates unit tests:

```
if (Meteor.isServer) {
  describe('TrendsCollection', function testSuite() {
    before(function setup() {
      Trends.removeAll();
      OpqBoxes.removeAll();
    });

    after(function tearDown() {
      Trends.removeAll();
      OpqBoxes.removeAll();
    });

    const box_id = '1';
    const calibration_constant = 1;
    const trend1 = { min: -100, max: 100, average: 0 };
    const trend2 = { min: 0, max: 0, average: 0 };
    const trend3 = { min: -50, max: 25, average: 10 };
    const startDateString = '2018-01-01T12:00:00';
    let timestamp_ms = moment(startDateString).valueOf();

    it('#define, #isDefined', function test() {
      // Test that we can create and retrieve a simple Trend document.
      OpqBoxes.define({ box_id, calibration_constant });
      const trendId = Trends.define({ box_id, timestamp_ms, voltage: trend1, frequency: trend1, thd: trend1 });
      expect(Trends.isDefined(trendId)).to.exist;

      // Add two more trends to January 1, 2018 in order to set up further tests.
      timestamp_ms += 1;
      Trends.define({ box_id, timestamp_ms, voltage: trend2, frequency: trend2, thd: trend2 });
      timestamp_ms += 1;
      // No thd field in this last one.
      Trends.define({ box_id, timestamp_ms, voltage: trend3, frequency: trend3 });
    });

// additional unit tests follow... 
``` 

As you can see, there is code to set up and tear down the test fixture, and a unit test to exercise the define() and isDefined() methods in the Trends class instance.

To manually invoke all of the unit tests, use `meteor npm run test`. Here is an example invocation:

```
~/g/o/o/v/app (master|✔) $ meteor npm run test

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

### Meteor Method testing

When OPQ View client-side code needs to modify the contents of the MongoDB database, or perform complex data queries, it does this via [Meteor Methods](https://guide.meteor.com/methods.html), which is basically a remote procedure call system. 

We can validate the correct functioning of OPQ View's Meteor Methods using Meteor's "full app" testing mode.  This mode runs all of the tests in files named with the suffix `app-test.js`. In OPQ, the goal of "full app" testing is to exercise the remote procedure calls from the client to the server and make sure they can be invoked correctly.  Here is an excerpt from the [TrendsCollection.methods.app-test.js](https://github.com/openpowerquality/opq/blob/master/view/app/imports/api/trends/TrendsCollection.methods.app-test.js) file that shows a test of the "dailyTrends" Meteor Method:

```
if (Meteor.isClient) {
  describe('TrendsCollection Meteor Methods ', function test() {

    before(async function () {
      await defineTestFixturesMethod.callPromise(['minimal', 'trends']);
      await withLoggedInUser();
    });

    it('Trends.dailyTrends Method', async function () {
      const boxIDs = ['1000'];
      const startDate_ms = moment('2018-01-01').valueOf();
      const endDate_ms = moment('2018-01-02').valueOf();
      const trendData = await dailyTrends.callPromise({ boxIDs, startDate_ms, endDate_ms });
      const jan1data = trendData['1000'][startDate_ms];
      expect(jan1data).to.exist;
      expect(jan1data.frequency.min).to.equal(60);
      expect(jan1data.frequency.max).to.equal(70);
      expect(jan1data.frequency.average).to.equal(65);
      expect(jan1data.frequency.count).to.equal(2);
    });
  });
}
```

Testing the remote procedure call (Meteor Method) interface between client and server requires more complex setup than unit testing.  The first complication is that RPC calls are (by definition) asynchronous, and thus there is the possibility of entering "[callback hell](http://callbackhell.com/)" if a sequence of asynchronous calls are required to do the tests. In order to avoid this problem, OPQ full app tests use the [async/await](https://javascript.info/async-await) constructs in Javascript to force asynchronous code to execute synchronously. In the code above, the before() method calls two asynchronous functions in a row, but the use of async/await means that execution will pause after each call until it completes. This is even more important in the test itself:

```
const trendData = await dailyTrends.callPromise({ boxIDs, startDate_ms, endDate_ms });
```

In this code, the dailyTrends Meteor Method is called, then execution pauses until it completes, and the results are assigned to the variable trendData. This is much easier to code and understand than providing callback functions.

There are several utility functions provided to facilitate testing in the [test-utilities.js](https://github.com/openpowerquality/opq/blob/master/view/app/imports/api/test/test-utilities.js). `withLoggedInUser` logs the client in as a test user (with Admin privileges). Without this, most RPC calls will fail with a "unauthorized or not logged in user" error.  `withOpqSubscriptions` subscribes the client to a variety of collections in case the test requires access to client-side data.  `defineTestFixtures` loads test data from the [private/database/fixture](https://github.com/openpowerquality/opq/tree/master/view/app/private/database/fixture) directory. This simplifies tests by making it easy to seed the test database with sample data.

To manually invoke Meteor Method testing, invoke `meteor npm run test-app`. Here is an example invocation:

```default
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

### meteor npm run test-all

It is a good idea to run all of the tests (i.e. coding standards, data model, and meteor methods) in the following situations:

  * Whenever you update your branch from master (to make sure the update has not introduced bugs into your branch)
  
  * Before you merge your changes from your branch into master (to make sure you are not introducing bugs into master)  
  
You could invoke the three types of tests individually, but it's easier to run the test-all script which will invoke them all for you with one command:

```
meteor npm run test-all
``` 

### Continuous Integration

Finally, we have set up continuous integration for OPQ View with [Semaphore CI](https://semaphoreci.com/). The CI process is set up so that each time there is a commit to the master branch of the OPQ repository, the sources are checked out to Semaphore, and ESLint, data model unit tests, and full app Meteor method integration tests are run.  The results are reported to the #github channel in the OPQ Slack workspace.

Consult the [Semaphore CI OPQ workspace](https://semaphoreci.com/openpowerquality/opq/) for more details.



 




 

