---
title: OPQ Data Model
sidebar_label: Data Model
---

At the core of the OPQ system lies a centralized MongoDB database. The majority of this data is managed by the OPQMauka and OPQMakai systems, though some of it (Locations, Regions, Users) is managed by OPQ View. 

The set of MongoDB collections and their relationships constitutes the OPQ Data Model. At a high level, the data model consists of:

* measurements: Provides short term, low fidelity OPQBox data
* trends: Provides long term, aggregated OPQBox trend data
* events: Provides high fidelity data (potentially across multiple boxes) regarding anomalies detected by measurements.
* box_events: Provides high-fidelity data from a single box. 
* fs.files and fs.chunks: Internal to GridFS. Stores box_event binary waveform data.
* opq_boxes: Provides individual OPQBox information, such as its current (and prior) locations.
* users: Provides user information, such as the boxes currently owned by them.
* zipcodes: Provides a mapping from zipcode to latitude and longitude.

## Naming Conventions

The OPQ system is comprised of a multitude of different tools, libraries, and frameworks.  In order to minimize confusion, we follow a basic set of naming conventions for our collections and documents that we feel will keep things as simple as possible:

* All collection names and documents fields are in lower-case
* Collection names should always be plural
* Use underscores over camel-case to separate words

## Measurements 

The **measurements** collection provides low-fidelity OPQBox snapshot data for a specific moment in time. Documents in this collection are produced at a very rapid rate; OPQMakai requests data from each OPQBox at a rate of six times per second. As such, each measurement document can essentially be thought of as an OPQBox "heartbeat", providing a timestamp and some additional low-fidelity data. Documents are persisted in the collection for a period of 24 hours before expiring.

![Measurements Collection](/docs/assets/datamodel/measurements-collection.png)

Each measurement document always corresponds to a single OPQBox, as indicated by the **box_id** field.

The **voltage** and **frequency** fields are RMS calculations of voltage and frequency at the specified moment in time, indicated by the **timestamp_ms** field.

The **thd** field indicates the total harmonic distortion value for this measurement window.

The **expireAt** field that indicates the expiration date of the document. Currently, measurement documents are persisted for a period of 24 hours.

## Trends 

The **trends** collection provides long term OPQBox trend data. Each trend document represents data aggregated over a one minute data collection window for an individual OPQBox. At first glance, this collection may seem somewhat similar to the *measurements* collection, but there are some key differences between the two: documents in the measurements collection persists for only 24 hours, while documents in the trends collection do not expire. Measurement documents are created at a rate of 6 times per second, per OPQBox - while trend documents are created at a rate of once per minute, per OPQBox.

![Trends Collection](/docs/assets/datamodel/trends-collection.png)

It's important to note that **voltage**, **frequency**, and **thd** fields are *objects*, each with a **min**, **max**, and **average** sub-property. As each trend document represents one minute's worth of collected OPQBox data, these sub-properties represent the result of data analysis performed within this window.

The **box_id** field indicates the OPQBox from which this data was produced.

The **timestamp_ms** field indicates the (start or end?) timestamp of the collected data.

The **voltage** field is an *object* with **min**, **max**, and **average** sub-fields, which holds the minimum, maximum, and average voltage values encountered over a one minute data collection window.

The **frequency** field is an *object* with **min**, **max**, and **average** sub-fields, which holds the minimum, maximum, and average frequency values encountered over a one minute data collection window.

The **thd** field is an *object* with **min**, **max**, and **average** sub-fields, which holds the minimum, maximum, and average thd values encountered over a one minute data collection window.

The **location** field is the location of the opqbox.

## Events and Box Events

When a service (such as Mauka or Makai) notices an anomaly in the measurement data stream it creates an Event document, specifying a set of boxes from which it would like high fidelity data, as well as a time interval for which it would like high fidelity data from each box (if the box has this data avaiable to give).

When a service (such as Mauka or Makai) notices that a new Event document has been created, it then goes and requests high fidelity data from individual boxes.  The data received is stored as Box_Event documents. 

## Events

The **events** collection provides events detected by the OPQ System. These documents are generated by OPQMakai after being requested by OPQMauka upon event detection.

| Field | Type | Description |
|-------|------|-------------|
| event_id | int | A unique integer value generated for each event |
| description | str | Indicates additional information about the event |
| boxes_triggered | [str] | A list of all OPQBoxes associated with the given event - however it is important to note that this does not always correspond to all of the OPQBoxes for which we have received actual data from for the event. |
| boxes_received | [str] | List of all OPQBoxes from which high fidelity data was received for the event |
| latencies_ms | [int] | an array of timestamps (milliseconds since epoch) indicating the time when data from each OPQBox was received. Maintains a 1 to 1 correlation with boxes_received. |
| target_event_start_timestamp_ms | int | Unix timestamps indicating the requested start time for the high fidelity data |
| target_event_end_timestamp_ms | int | Unix timestamps indicating the requested end time for the high fidelity data |


## Box Events

The **box_events** collection provides the event meta-data for a given OPQBox.

As an event can be associated with multiple OPQBoxes, it is therefore important to understand that there can be (and often are) multiple box_event documents with the same event_id.
Together, the **event_id** and **box_id** fields are what one would query on in order to find data for a given OPQBox for a specific event.


| Field | Type | Description |
|-------|------|-------------|
| event_id | int | corresponds to the event_id generated by the aforementioned **events** document |
| box_id | str | indicates the OPQBox from which this data was produced |
| event_start_timestamp_ms | int | Unix timestamps indicating the requested start time for the high fidelity data |
| event_end_timestamp_ms | int | Unix timestamps indicating the requested end time for the high fidelity data |
| window_timestamps_ms | [int] | an array of unix timestamps that correlate with every 2000 samples (10 grid cycles) of recorded box data. This can be useful for debugging purposes, as we can determine the continuity of box data. |
| location | str | location slug see [Location](#location) for details. |
| data_fs_filename | str | indicates the GridFS filename that holds the box_event's actual raw waveform data |


## Anomalies

The **anomalies** collection contains documents that classify a PQ anomaly. An anomaly represents a deviation from the steady state that we've classified. An anomaly may also contain another anomalies which allow us to group related events. The data model for an anomaly is provided below.

| Field              | Type         | Notes                                            |
|--------------------|--------------|--------------------------------------------------|
| type               | str          | The type of classification of the anomaly        |
| box_id             | str          |                                                  |
| location           | str          | Location slug                                    |
| start_timestamp_ms | int          |                                                  |
| duration_ms        | int          |                                                  |
| data_fs_filename   | str          | Optional                                         |
| data_fs_idx        | int          | Optional sample index into data_fs_file          |
| measurements       | [Measurement]| List of measurements copied during time of event |
| anomalies          | [Anomaly]    | List of anomalies included in this anomaly       |
| statistics         | {min: float, max: float, mean: float, variance: float} | Optional statistics |


## Anomaly types

The following anomalies are currently classified:

* THD
* ITIC_PROHIBITED
* ITIC_NO_DAMAGE
* INSTANTANEOUS_VOLTAGE_SAG
* INSTANTANEOUS_VOLTAGE_SWELL
* MOMENTARY_VOLTAGE_INTERRUPTION
* MOMENTARY_VOLTAGE_SAG
* MOMENTARY_VOLTAGE_SWELL
* TEMPORARY_VOLTAGE_INTERRUPTION
* TEMPORARY_VOLTAGE_SAG
* TEMPORARY_VOLTAGE_SWELL
* FREQUENCY_SAG
* FREQUENCY_SWELL
* GLOBAL_ANOMALY
 

## GridFS

[GridFS](https://docs.mongodb.com/manual/core/gridfs/) is a MongoDB specification for storing large documents. As an OPQBox can collect a very large amount of data for each given event (often exceeding the 16 MB MongoDB document size limit), we've opted to utilize GridFS to store our high-fidelity data.
At its core, GridFS is a very simple system consisting of two collections, **fs.files** and **fs.chunks**. 

![GridFS Collections](/docs/assets/datamodel/gridfs-collections.png)

## FS.Files

The **fs.files** collection is internal to GridFS and stores file metadata.
All fields except **metadata.event_id** and **metadata.box_id** are generated by GridFS upon document creation.
Of all these fields internal to GridFS, the most noteworthy is the **filename** field, which corresponds to the box_event's **data_fs_filename** field.

The **metadata.event_id** and **metadata.box_id** fields are used to find the corresponding **box_event** document for which this file holds data for.

Note: The GridFS specification requires the **metadata** field be used to store any external information for the given file document. See [GridFS files.metadata](https://docs.mongodb.com/manual/core/gridfs/#files.metadata)  for more information.

## FS.Chunks

This collection is internal to GridFS and is used for storing file chunks.
The **files_id** field is a Mongo ObjectID reference to the chunk's corresponding **fs.files** document.
It might be interesting to note that this is the only occurrence in the data model where a Mongo ObjectID is being referenced.


## Locations 

The **locations** collection provides entities that define locations that can be associated with OPQBoxes, Trends, Events, and other entities in the system.

![Locations Collection](/docs/assets/datamodel/locations-collection.png)

 Initially, only admins can define locations, and they are defined and managed via the settings.development.json file. Locations have:

  * an array containing longitude and latitude coordinates in that order.
  * a “slug” (a unique, human-friendly string identifier)
  * a string description. 

For example:
```
{ slug: ‘Kailua-PMJ’, coordinates: [-157.751399,  21.409958], description: ‘House in Kailua’ }
```
Note that the coordinates array must list longitude first, then latitude. See [this StackOverflow Question](https://stackoverflow.com/questions/15274834/how-to-store-geospatial-information-in-mongodb) for more details. Mongo has great support for [GeoSpatial queries](https://docs.mongodb.com/manual/geospatial-queries/), so this will be fun to have.

Location slugs should be considered *permanent* once defined.  Since these slugs have the potential to appear in other documents throughout the database, you will have to guarantee that the location does not appear anywhere else in the database in order to delete it.

Likewise, you cannot change the coordinate values willy-nilly.  Only change them if they incorrectly specify the intended location.

## Regions 

“Regions” represent aggregations of Locations. A region consists of:
  * a region slug
  * a list of location slugs that define the region. 
  
![Regions Collection](/docs/assets/datamodel/regions-collection.png)

For example, to represent a region called “96734" with three Locations:

```
{ regionSlug: “96734”, locationSlug: “Kailua-PMJ” }
{ regionSlug: “96734”, locationSlug: “Kailua-DJ” }
{ regionSlug: “96734”, locationSlug: “Kailua-KK” }
```

The advantage of this "relational" representation is that it supports many-to-many relationships:

  * a single region can be related to multiple locations (as in the example above), and 

  * a single location can be related to multiple regions (the location “Kailua-PMJ” could be related to the regions “96734", “Oahu”, and “Hawaii”.)

Region and location slugs together constitute a single namespace (i.e. you can’t have two locations or two regions both called “96734”, nor can you have a location called “96734" and a region also called “96734”).

Unlike locations, users can feel free to manipulate region definitions, as they are only used to facilitate UI queries.


## OPQBoxes 

The **opq_boxes** collection provides information about each individual OPQBox in the system.

![OPQBoxes Collection](/docs/assets/datamodel/opqboxes-collection.png)

The **box_id** field is a unique string identifier for the OPQBox. This value is always referenced throughout the data model when we need to store a box_id value within a document.

The **name** field is a unique user-friendly string identifier for the OPQBox. Unlike the **box_id** value, which is often used internally throughout the data model, the **name** value should be thought of as the external representation of the OPQBox.

The **description** field is optional and can be used to further describe an OPQBox.

The **calibration_constant** field is the box specific value that is used to adjust the values returned by the ADC so that we get accurate voltage and frequency values.  

The **location** field is a string naming a location slug. This identifies the current location of this box. It is optional.

The **location_start_time_ms** field is a UTC millisecond time stamp indicating the time that data from the current
location began being transmitted. It is optional.

The **location_archive** field is an array containing objects with fields location and location_start_time_ms. This provides a historical record of the locations associated with this box. 

## Users

Users are represented by three collections: the Users collection (maintained by Meteor, which provides password and basic account information, which is not shown below), UserProfiles (additional profile information), and BoxOwners (which provides a two-way mapping between OPQ Boxes and their owner(s)):

![Users Collection](/docs/assets/datamodel/users-collection.png)

The **email** field is the user's email address. This field also serves as the username to log into OPQView.

The **first_name** and **last_name** fields are the user's first and last name.

The **role** field indicates the role of the user in the OPQ system. Currently, there are only two roles: "user" and "admin".

## Health

The OPQHealth service creates documents representing its findings on the current health of the system with the following structure:

<img src="/docs/assets/health/health.png" width="300px">

**timestamp**:  Each entry has a timestamp, which is a UTC string indicating the time at which the entry was generated.

**service**:  Indicates the OPQ Service whose status is being described in this entry.  Service should be one of the following: "box", "mauka", "makai", "view", "mongodb" and "health".  Yes, OPQHealth reports on its own health!

**serviceID**:  For some services, such as "box", additional identifying information is required.  The serviceID field provides that information. In the case of OPQBoxes, the serviceID field provides the boxID.

**status**:  Status is either "up" or "down".

**info**: Info is a field that can be used by OPQHealth to provide additional information about an entry.
