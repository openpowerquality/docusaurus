---
title: Related Work
sidebar_label: Related Work
---

The chapter explains how OPQ fits into current industry solutions and research on power quality monitoring. For the purposes of this review, we exclude utility-side power quality monitoring and analysis systems.

## Power quality monitor devices

Fluke manufactures a variety of [Power Quality Tools](http://www.fluke.com/fluke/inen/products/Power-Quality.htm).  They typically measure voltage, current, frequency, dips, swells, power factor, harmonic, current unbalance, inrush current values, and light flicker, adhere to various standards, and use current transformers rather than plugging into a wall outlet. Depending on the model, these devices cost from approximately $2,000 to $10,000, and are designed for use by power engineers to diagnose power quality problems resulting from industrial machinery.

ACR Systems manufactures the [PowerWatch Voltage Disturbance Recorder](http://www.acrsystems.com/product/powerwatch-120v). Unlike Fluke devices, this device connects to a wall outlet. It measures surges and sags and is meant for monitoring medical instrumentation, point-of-sale terminals, computer servers, and other sensitive electronic equipment. It costs approximately $625. A Windows-based program is available for $135, and can be used to extract data from the device using a USB cable, and then display graphs of power quality.

Dranetz manufactures the [HDPQ family of power quality analyzers](http://www.dranetz.com/product-services/hdpq-power-quality-analyzer-family/).  These are similar to Fluke devices in that they require connection to mains using current transformers and are intended for use by power quality engineers.  They cost from $5,000 to $17,000 depending upon the model. They also sell a set of software [answer modules](http://www.dranetz.com/product-services/software-dranetz-products/answer-modules/#tab-2) to provide additional analyses regarding the raw power quality data collected by the device. For example, the Sag Directivity module detects a voltage sag, identifies its characteristics, and determines whether the source is upstream or downstream of the monitoring point. Answer modules cost approximately $1,000 each.

Elspect provides the [BlackBox family of multi functional waveform recorders](https://elspec-ltd.com/metering-protection/).


## Power quality database software

[PQView](http://www.pqview.com/) is a database system developed by [Electrotek](http://www.electrotek.com/) and [EPRI](http://www.epri.com/) to integrate data from a wide variety of digital relays, fault recorders, power quality monitors, smart meters, and SCADA historians into a relational database. PQView is not designed for real-time display, instead, the normal mode of operation is to poll the various devices containing power data once per day and upload the results, although polling as fast as once per minute is supported.  The software can generate reports regarding voltage sags, swells, and interruptions, THD, and overlay voltage sags/swells on CBEMA curves to indicate which ones exceed tolerances. PQView is built on Windows software and the data is stored in a SQL Server database. PQView costs $5000 and is available as an [EPRI Product](https://www.epri.com/#/pages/product/1020808/). 





## Utility-scale power quality

## Power quality classification
