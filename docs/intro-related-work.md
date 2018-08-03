---
title: Related Work
sidebar_label: Related Work
---

The chapter explains how OPQ fits into current industry solutions and research on power quality monitoring. For the purposes of this review, we exclude utility-side power quality monitoring and analysis systems.

We'll first look at industry power quality monitoring devices and then discuss how they compare to OPQ Box. Then we'll look at industry power quality database software, and how that compares to OPQ Cloud. Finally, we'll look at recent research systems and how they compare to OPQ as a whole.

## Commercial PQ devices

Fluke provides a variety of [Power Quality Tools](http://www.fluke.com/fluke/inen/products/Power-Quality.htm).  They typically measure voltage, current, frequency, dips, swells, power factor, harmonic, current unbalance, inrush current values, and light flicker. They adhere to various standards, and use current transformers rather than plugging into a wall outlet. Depending on the model, these devices cost from approximately \$2,000 to \$10,000, and are designed for use by power engineers to diagnose power quality problems resulting from industrial machinery.

Dranetz provides the [HDPQ family of power quality analyzers](http://www.dranetz.com/product-services/hdpq-power-quality-analyzer-family/).  These are similar to Fluke devices in that they require connection to mains using current transformers and are intended for use by power quality engineers.  They cost from \$5,000 to \$17,000 depending upon the model. They also sell a set of software [answer modules](http://www.dranetz.com/product-services/software-dranetz-products/answer-modules/#tab-2) to provide additional analyses regarding the raw power quality data collected by the device. For example, the Sag Directivity module detects a voltage sag, identifies its characteristics, and determines whether the source is upstream or downstream of the monitoring point. Answer modules cost approximately \$1,000 each.

Elspec provides the [BlackBox family of multi functional waveform recorders](https://elspec-ltd.com/metering-protection/). These devices perform transient recording, disturbance recording, phasor measurements (synchrophasor), power quality analysis, and sequence of events recording. They cost from \$6,000 to \$12,000 depending upon the model. 

Power Standards Lab provides the [PQube3 family of power monitors](https://www.powerstandards.com/product/pqube-3/highlights/). Unlike the above devices, the PQube is both a revenue-grade energy meter as well as a power quality monitor.  It can also record environmental data such as temperature, humidity, barometric pressure, and certain process parameters such as fuel level and water flow. [QubeView](https://www.powerstandards.com/product/enterprise-software-solution/qubeview/) is a Windows-based software package that provides real-time monitoring of multiple PQube devices and trends and statistics over the data collected.

ACR Systems manufactures the [PowerWatch Voltage Disturbance Recorder](http://www.acrsystems.com/product/powerwatch-120v). Unlike the above devices, this device connects to a wall outlet. It measures surges and sags and is meant for monitoring medical instrumentation, point-of-sale terminals, computer servers, and other sensitive electronic equipment. It costs approximately \$625. A Windows-based program is available for a separate cost of \$135, and can be used to extract data from the device using a USB cable, and then display graphs of power quality.

## Comparison with OPQ Box

All of these commercially available devices contrast with the OPQ Box in similar ways.  First, all of them collect a wider variety of power quality measures than OPQ Box, and most have been certified according to one or more industry standards. They are generally designed to support industrial applications, where the goal is to ensure that the power being supplied to a building or plant is of adequate quality, and/or that the machinery in the plant is not degrading power quality. Apart from the PowerWatch monitor, all of them are attached to electrical mains using current transformers. Finally, all of them are designed for "stand alone" operation: each device can independently gather and assess power data.

While the OPQ Box has much more limited functionality, it is designed to be manufactured for approximately \$75, which is 10 to 100 times less expensive than these devices. OPQ Boxes are "cloud native", which means that they have no "stand alone" capabilities. Instead, they must be connected to an OPQ Cloud instance in order for power quality data to be collected and analyzed.

## Commercial PQ software

[PQView](http://www.pqview.com/) is a database system developed by [Electrotek](http://www.electrotek.com/) and [EPRI](http://www.epri.com/) to integrate data from a wide variety of digital relays, fault recorders, power quality monitors, smart meters, and SCADA historians into a relational database. PQView is not designed for real-time display, instead, the normal mode of operation is to poll the various devices containing power data once per day and upload the results, although polling as fast as once per minute is supported.  The software can generate reports regarding voltage sags, swells, and interruptions, THD, and overlay voltage sags/swells on CBEMA curves to indicate which ones exceed tolerances. PQView is built on Windows software and the data is stored in a SQL Server database. PQView costs \$5000 and is available as an [EPRI Product](https://www.epri.com/#/pages/product/1020808/). 

[PQSCADA Sapphire](https://elspec-ltd.com/power-quality-software-pqscada-software/) is another vendor-independent system for collecting and displaying data from a variety of power quality monitoring devices. It comes in three versions, a free "Express" version with limited import and analysis tools. To obtain additional capabilities, user can purchase the professional version for \$2500 or the Enterprise version for \$6400. The [data visualizations](https://elspec-ltd.com/power-quality-software-pqscada-software/data-visualization/) include trend charts, scatter event charts, histograms with summary statistics, and phasor charts. 

[PQDif](http://pqdif.info/), the "Power Quality Data Interchange Format", is a binary file format that specifies voltage, current, power, and energy measurements in standard fashion that allows this data to produced and consumed by devices in a vendor-independent fashion. 

## Comparison with OPQ Cloud

The differences between the way these systems store and manipulate power quality data and the way used by OPQ arise from fundamentally different architectural assumptions and the historical background of the technology. PQView and PQSCADA Sapphire are designed to operate in a technology environment consisting of a large number of installed, "stand alone" power quality monitors built by different vendors. Their goal is to aggregate the data collected by these devices, and in order to do so, they depend upon the PQDif standard as a way to obtain power quality data independent of the vendor and device generating it.  This results in a kind of "store and forward" process: power quality data is captured and stored on the device, and then periodically bundled into a PQDif file and sent to the database software.

OPQ Cloud, on the other hand, is designed only to support the capabilities of OPQ Boxes. OPQ Boxes, furthermore, have no "stand-alone" capability; they maintain continuous connection to the Internet and upload power quality data to cloud-based services as needed. This means that OPQ implements a very different approach to representing and transmitting data than PQDif. For details on the representation, see the [OPQ Data Model](cloud-datamodel.md), and for details on communication, see the [OPQ Protobuf protocol](cloud-protocol.md).

Note that it would be straightforward to develop an export function in OPQ Cloud to provide power quality data in PQDif format, but that functionality is not currently available.

## Research systems

[Di Manno et al](https://ieeexplore.ieee.org/document/7415246/) describes a PQ monitoring system called PiKu. Unlike OPQ, PiKu is designed as a hardware device for sensing power quality that is directly integrated into a PC. Systems with similar architectures include TRANSIENTMETER, described in [Da Ponte et al](https://ieeexplore.ieee.org/document/896868/), BK-ELCOM, described in [Bilik et al](https://ieeexplore.ieee.org/document/4424178/), and a system described in [Xu et al](https://ieeexplore.ieee.org/document/6991803/).

There are also research projects based upon leveraging existing monitoring infrastructure.  [Suslov et al](https://ieeexplore.ieee.org/document/6842882/) describes a distributed power quality monitoring system based upon existing phasor measurement units installed by utilities.  [Sayied et al](http://projects-web.engr.colostate.edu/ece-sr-design/AY12/storage/docs/PQ_Final_Report.pdf) describes a system designed using existing smart meters. [Kucuk et al](https://www.sciencedirect.com/science/article/pii/S0142061509001859) describes a similar system for the Turkish National Grid using utility grid monitoring infrastructure.

The research system most similar to OPQ is FNET, which is described in a recent publication by [Liu et al](https://ieeexplore.ieee.org/document/7849130/). Like OPQ, the FNET system consists of custom hardware that monitors the electrical signal from a wall outlet, and uploads data to the cloud for further processing.  Unlike OPQ, FNET is designed for monitoring of frequency disturbances, how they propagate across wide area (i.e. nation-wide) utility grids, and, if possible, where the frequency disturbance originated. This means that FNET devices must be synchronized using GPS, and that the data collected consists of frequency and voltage angle. OPQ is designed for more "local" grid analysis, and we are not interested in propagation. As a result, OPQ Boxes are synchronized using NTP rather than GPS, which reduces cost and simplifies installation (OPQ Boxes do not need line of site to a GPS satellite).  Finally, FNET hardware appears to support only "one way" communication from device to the cloud, while OPQ Boxes support "two way" communication (from box to cloud, and from cloud to box).















