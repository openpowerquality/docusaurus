---
title: OPQ View User Guide
sidebar_label: OPQ Cloud
---

For users, all access to OPQ Cloud is via a web application called OPQ View. So, the remainder of this user guide will refer to "View" rather than "Cloud" as a way to clarify the actual user interface system.    

## Landing Page

The first OPQ View page you normally encounter is the landing page, which looks like this: 

<img src="/docs/assets/view/opqview-landing-page.png" >

The landing page provides "public" data about the state of the OPQ system. It is public in the sense that anyone who can retrieve the top-level URL for OPQ View can see this information without further authorization or authentication.  If you need this page to be private, please put the URL behind a firewall. 

### System Stats

<img width="400px" src="/docs/assets/view/components/system-stats.png" >

System Stats shows summary statistics about the size of various collections in the OPQ Mongo database.  This component should automatically refresh every few seconds as new measurements are produced.  
  
Trends are produced once per minute per box. Trends indicate the high, low, and average values for frequency, voltage, and THD observed by a single box over a given minute.
  
Events are produced whenever a box measures frequency, voltage, or THD in excess of a default threshold (currently +/- 5% of nominal value.
  
Measurements are produced six times a second. They provide instantaneous values for frequency, voltage, and THD. Only the last 24 hours of Measurement data points are stored in the database.

There are many other collections in the OPQ Mongo database beyond those shown here. See the [data model](datamodel.md) for details.

### System Health

<img width="400px" src="/docs/assets/view/components/system-health.png" >

For OPQ to function correctly, all of its services and boxes should be functioning.  System Health provides a visual indication of the current status of OPQ services and boxes. It should automatically update approximately once a minute.
  
Services can either be 'up' (green), 'down' (red), or 'unknown' (grey). All services should always be up.
  
Boxes can be 'up' (green), 'down' (red), 'unknown' (grey), or 'unplugged' (yellow). When a user wants a box to be registered in the system but isn't using it currently, they can set its status to unplugged to indicate that the lack of data transmission is not an indication of system malfunction. Boxes should always be 'up' or 'unplugged'.
  
This data is provided by the [OPQ Health middleware service](health.md). 'Unknown' means that the Health service has not reported a value for this service or box in the last minute.

### Box Trends

<img width="400px" src="/docs/assets/view/components/box-trends.png" >

Box Trends uses Trend data to show changes in frequency, voltage, or THD for one or more boxes over time.
  
Measurement control: select either voltage, frequency, or THD.
  
Boxes control: select one or more boxes whose values you wish to graph over time. Once you specify a box, you will be able to specify whether you want to graph its maximum, minimum, or average value of the measurement.
  
Start and End controls: Specify the start and end date for the visualization.
  
Fetch Data button: Click this button to see the visualization.
  
This visualization supports panning and zooming.  Scroll the mouse up or down over the visualization to change the time interval. Click and drag right or left to change the window of time displayed.

### Events Timeline

<img width="600px" src="/docs/assets/view/components/events-timeline.png" >

Events Timeline shows a visual summary of the numbers and types of events noticed by OPQ Boxes.
  
See the legend to determine the types of events noticed.
  
This visualization supports panning and zooming.  Scroll the mouse up or down over the visualization to change the time interval. Click and drag right or left to change the window of time displayed.

## Box Map Page

<img width="600px" src="/docs/assets/view/components/box-map-page.png" >

The Box Map page provides a location-oriented perspective on the OPQ Boxes associated with this OPQ Cloud instance. As the above screen shot shows, boxes are represented either by an OPQ icon and current power data (when there is no additional boxes nearby) or by a a "roll-up" consisting or a circle (when two or more boxes are present nearby with respect to that zoom level).  When boxes are represented by a circle, zooming in with eventually reveal their location. 

Clicking on the icon associated with a box reveals additional details about its status, as shown next:

<img width="400px" src="/docs/assets/view/components/box-map-status.png" >


## Live Data Page

If you have login credentials for OPQ, you can login by clicking on the "Login" link in the upper right corner.  To obtain login credentials for an OPQ View system, you must request them from an administrator. After logging in, you can acess the Live Data page from the navbar. 

<img src="/docs/assets/view/opqview-livedata-page.png" >

The Live Data page, as its name suggests, enables the user to see power quality data sent from OPQ Boxes in real time.

### Live Trends

<img width="600px" src="/docs/assets/view/components/live-trends.png" >

Trends, as mentioned before, are entities that are generated once per minute with a summary of the maximum, minimum, and average frequency, voltage and THD for a given box during the prior minute.

Live Trends enables the user to monitor this Trend data in real time. It will update automatically once per minute as Mauka generates new Trend data.

Boxes control: select one or more boxes whose values you wish to graph over time. Once you specify a box, you will
  be able to specify whether you want to see its maximum, minimum, and/or average values in its measurements. 
  
Length control: Specify how much data you want to see.
  
Measurements control: select voltage, frequency, and/or THD.

This visualization supports panning and zooming.  Scroll the mouse up or down over the visualization to change the time interval. Click and drag right or left to change the window of time displayed.

### Live Measurements

<img width="600px" src="/docs/assets/view/components/live-measurements.png" >

Measurements, as mentioned before, are generated approximately six times a second by OPQ Boxes with instantaneous values for frequency, voltage, and THD. 

Live Measurements visualizes the last 30 seconds of live changes in frequency and/or voltage for one box. This is a data intensive visualization, so you can only monitor the data stream from one box at a time. 
  
Boxes: select one box whose values you wish to graph over time.
  
Measurements: Click on voltage and/or frequency.

## Profile Page

After logging in, all users will have a Profile page that can be accessed from the NavBar.  Here is an example of that page:

<img src="/docs/assets/view/opqview-profile-page.png" >

The profile page provides information about your account, as well as information about all of the OPQBoxes for which you are a designated "owner". Note that it is possible for a single box to have more than one OPQ owner. It is also possible for an OPQBox to not have an owner.  

### My boxes

<img width="600px" src="/docs/assets/view/components/my-boxes.png" >

This component provides summary information about each OPQ Box owned by this user. The edit button enables users to change certain fields.

## Admin Page

If your account has admin privileges, after logging in you will have access to an Admin page as well as a Profile page.  The admin page looks like this:

<img src="/docs/assets/view/opqview-admin-page.png" >

The Admin page provides information about every OPQ Box in the system, regardless of whether the user is an owner or not. It also indicates who is an owner of each OPQ Box.

## About Page

The About page provides some background information about OPQ.  You do not have to be logged in to see this page.  It looks like this:

<img src="/docs/assets/view/opqview-about-page.png" >


