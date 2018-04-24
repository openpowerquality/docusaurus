---
title: OPQ Box User Guide
sidebar_label: OPQ Box
---

## Obtain an OPQ Box

First, obtain an OPQ Box and plug it in within range of a wireless access point. Currently, your options for obtaining an OPQ Box are to contact the Open Power Quality research via Professor Philip Johnson (johnson@hawaii.edu). We are working on manufacturing options. 

When plugged in, it looks like this:

<img src="/docs/assets/box/opqbox.jpg" width="400px">

## Provide the box with your wireless access credentials

The OPQ Box needs to be able to send data to the OPQ cloud services over the Internet. To accomplish this, it needs to know the name and (if required) password for your wireless network.  

To obtain these credentials, you must first wait approximately 30 seconds to a minute after plugging in your OPQ Box, at which point you should find that there is a public wireless access point called "OPQ".  Connect to that access point with your laptop.

Once you are connected, bring up a browser and go to `http://10.42.0.1/`.  Your browser should then display a page that lists all the wireless access points found by the OPQ Box. Here's an example screen image:
   
<img src="/docs/assets/box/OPQBox-connect-1.png" width="100%">

You can click either an existing network, or press the "+" buttons to connect to hidden networks.

In this example, the wireless access point of interest (pmj) was hidden, and so the user clicked "Connect to Hidden WPA Network" and then entered the access point name (pmj) and its password in the supplied form fields.

After clicking "Connect to Network", the OPQ Box attempts to make the connection, and the following page is displayed:

<img src="/docs/assets/box/OPQBox-connect-2.png" width="100%">

If the connection is successful, then after 30 seconds, the following page will be displayed:

<img src="/docs/assets/box/OPQBox-connect-3.png" width="100%">

This page indicates that you should reconnect to your normal wireless network, and check OPQ View (currently http://emilia.ics.hawaii.edu) to see if data from your OPQ Box is being transmitted successfully

## Verify power quality data transmission

To check your OPQ Box is transmitting data successfully, go to the landing page for OPQ View, and use the System Health component to see if your Box is green:

<img width="400px" src="/docs/assets/view/components/system-health.png" >

To see the actual data for your Box, you can login and go the Live Data page. For example, you can see Measurement data in real time: 

<img src="/docs/assets/view/components/live-measurements.png" >








