---
title: Related Work
sidebar_label: Related Work
---

The chapter explains how OPQ fits into current industry solutions and research on power quality monitoring. For the purposes of this review, we exclude utility-side power quality monitoring and analysis systems.

We'll first look at industry power quality monitoring devices and then discuss how they compare to OPQ Box. Then we'll look at industry power quality database software, and how that compares to OPQ Cloud.

## Power quality monitor devices

Fluke provides a variety of [Power Quality Tools](http://www.fluke.com/fluke/inen/products/Power-Quality.htm).  They typically measure voltage, current, frequency, dips, swells, power factor, harmonic, current unbalance, inrush current values, and light flicker, adhere to various standards, and use current transformers rather than plugging into a wall outlet. Depending on the model, these devices cost from approximately \$2,000 to \$10,000, and are designed for use by power engineers to diagnose power quality problems resulting from industrial machinery.

Dranetz provides the [HDPQ family of power quality analyzers](http://www.dranetz.com/product-services/hdpq-power-quality-analyzer-family/).  These are similar to Fluke devices in that they require connection to mains using current transformers and are intended for use by power quality engineers.  They cost from \$5,000 to \$17,000 depending upon the model. They also sell a set of software [answer modules](http://www.dranetz.com/product-services/software-dranetz-products/answer-modules/#tab-2) to provide additional analyses regarding the raw power quality data collected by the device. For example, the Sag Directivity module detects a voltage sag, identifies its characteristics, and determines whether the source is upstream or downstream of the monitoring point. Answer modules cost approximately \$1,000 each.

Elspec provides the [BlackBox family of multi functional waveform recorders](https://elspec-ltd.com/metering-protection/). These devices perform transient recording, disturbance recording, phasor measurements (synchrophasor), power quality analysis, and sequence of events recording. They cost from \$6,000 to \$12,000 depending upon the model. 

Power Standards Lab provides the [PQube3 family of power monitors](https://www.powerstandards.com/product/pqube-3/highlights/). Unlike the above devices, the PQube is both a revenue-grade energy meter as well as a power quality monitor.  It can also record environmental data such as temperature, humidity, barometric pressure, and certain process parameters such as fuel level and water flow. [QubeView](https://www.powerstandards.com/product/enterprise-software-solution/qubeview/) is a Windows-based software package that provides real-time monitoring of multiple PQube devices and trends and statistics over the data collected.

ACR Systems manufactures the [PowerWatch Voltage Disturbance Recorder](http://www.acrsystems.com/product/powerwatch-120v). Unlike the above devices, this device connects to a wall outlet. It measures surges and sags and is meant for monitoring medical instrumentation, point-of-sale terminals, computer servers, and other sensitive electronic equipment. It costs approximately \$625. A Windows-based program is available for \$135, and can be used to extract data from the device using a USB cable, and then display graphs of power quality.

## Comparison with OPQ Box

All of these devices contrast with the OPQ Box in similar ways.  First, all of the devices collect a wider variety of power quality measures than the OPQ Box, and most have been certified against industry standards. They are designed to support industrial applications, where the goal is to ensure that the power being supplied to a building or plant is of adequate quality, and/or that the machinery in the plant is not degrading power quality. Apart from the PowerWatch device, all of the devices are attached to electrical mains using current transformers. 

While the OPQ Box has more limited functionality, it is designed to be manufactured for approximately \$75, which is 10x to 100x cheaper than these devices. OPQ Boxes are designed for a networked environment where analyses and visualization are performed in the cloud, not via a Windows-based program. Finally, as an open source project, users are free to modify and enhance OPQ Boxes if they desire. 

## Power quality database software

[PQView](http://www.pqview.com/) is a database system developed by [Electrotek](http://www.electrotek.com/) and [EPRI](http://www.epri.com/) to integrate data from a wide variety of digital relays, fault recorders, power quality monitors, smart meters, and SCADA historians into a relational database. PQView is not designed for real-time display, instead, the normal mode of operation is to poll the various devices containing power data once per day and upload the results, although polling as fast as once per minute is supported.  The software can generate reports regarding voltage sags, swells, and interruptions, THD, and overlay voltage sags/swells on CBEMA curves to indicate which ones exceed tolerances. PQView is built on Windows software and the data is stored in a SQL Server database. PQView costs \$5000 and is available as an [EPRI Product](https://www.epri.com/#/pages/product/1020808/). 

[PQSCADA Sapphire](https://elspec-ltd.com/power-quality-software-pqscada-software/) is another vendor-independent system for collecting and displaying data from a variety of power quality monitoring devices. It comes in three versions, a free "Express" version with limited import and analysis tools. To obtain additional capabilities, user can purchase the professional version for \$2500 or the Enterprise version for \$6400. The [data visualizations](https://elspec-ltd.com/power-quality-software-pqscada-software/data-visualization/) include trend charts, scatter event charts, histograms with summary statistics, and phasor charts. 

[PQDif](http://pqdif.info/), the "Power Quality Data Interchange Format", is a binary file format that specifies voltage, current, power, and energy measurements in standard fashion that allows this data to produced and consumed by devices in a vendor-independent fashion. 

## Comparison with OPQ Cloud

The differences between the way these systems and OPQ store and manipulate power quality data arise from fundamentally different architectural assumptions and the historical background of the technology.  Unlike OPQ, these other systems are based on an historical approach where power quality data is stored onboard a single device, and a primary use case is to inspect the data onboard that single device. Over time, vendors of competing devices recognized that there was a market opportunity from aggregating historical power quality data, and so they developed a standard format for representing and communicating the power quality data previously collected and stored on the devices.   

OPQ is designed from the start with a radically different architectural premise: OPQ Boxes have no "stand-alone" capability; they must maintain continuous connection to the Internet and upload power quality data to cloud-based services immediately. This means that OPQ requires a very different approach to representing and transmitting data. For details on the representation, see the [OPQ Data Model](cloud-datamodel.md), and for details on communication, see the [OPQ Protobuf protocol](cloud-protocol.md).

It would be straightforward to develop an export function in OPQ Cloud to provide power quality data in PQDif format, but that ability is not currently available.



