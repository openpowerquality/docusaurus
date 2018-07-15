---
title: The Heilmeier Catechism for OPQ
sidebar_label: The Heilmeier Catechism
---

This section summarizes the OPQ Project in terms of the [Heilmeier Catechism](https://www.darpa.mil/work-with-us/heilmeier-catechism).

## Objectives

**What are we trying to do?**

The objective of the OPQ Project is to develop a low-cost, extensible, high quality distributed sensor network technology that will enable breakthroughs based on power quality data collection and analysis. These breakthroughs include:

  * Significant increases in the use of distributed, renewable energy sources while maintaining high power quality.
  * Application of machine learning and other analytic techniques to significantly improve grid design and problem diagnosis.
  * Integration endpoints for environmental and other data sources that enable new predictive capabilities.
  * Acquisition of electrical data useful for research on side channel attacks such as simple or differential power analysis.

## Current practice

**How is it done today? What are the limitations of current practice?**

Current practice suffers from the following paradox: incorporation of distributed, intermittent renewables makes it more difficult to maintain power quality, while modern electronics require higher power quality than appliances in the past. Thus, renewable energy tends to increase variability of power quality at the same time that the need for consistently high quality power is higher than ever before. 

Use of uninterruptable power supplies and line conditioners are a "band-aid" solution:  they work fine if the underlying grid is fundamentally healthy and reliable. But, to continue the metaphor, band-aids don't cure cancer. If the grid is fundamentally unstable, point-of-use devices like UPS are expensive and ultimately ineffective.

The state of the art in power quality monitoring and analysis is PQView, a database system developed by Electrotek and EPRI to integrate data from a wide variety of digital relays, fault recorders, power quality monitors, smart meters, and SCADA historians into a relational database. Support for such a wide range of hardware devices has resulted in a "lowest common denominator" architecture: devices are normally polled once a day for data, there is no real-time analysis, and reporting is limited to simple trends. PQView is architecturally incapable of supporting the kinds of data acquisition and analysis required for the kinds of breakthroughs that OPQ is striving to deliver. 

## Advantages of OPQ

**What is new in our approach? Why do we think it will be successful?**

Unlike traditional solutions where hardware and software are developed independently, often by different vendors, OPQ's hardware and software are co-designed for maximal compatibility and capability. This results in significant advantages, including: 

1. OPQ hardware devices cost around $75 each, 10x to 100x cheaper than competing devices. 

2. OPQ hardware and software have bi-directional communication. In essence, the power quality data collected by each OPQBox can change based upon the power quality data being collected by any other box. This makes it possible to "tune" an OPQ system to collect increasingly relevant data over time. 

3. OPQ's software is open source and based on a plugin architecture, making it significantly easier to extend and tailor to new purposes.

4. OPQ's hardware monitors power quality at wall outlets rather than through installation at power mains. This means OPQ boxes are trivial to install and trivial to move to new locations.  

## Why OPQ?

**Who cares? If we are successful, what difference will it make?**

The rise of "smart grids" that include distributed, intermittent and unpredictable power generation (i.e. solar and wind) make power quality stability much more challenging than in the past.  OPQ provides a low-cost, extensible platform that enables organizations who wish to build electrical grids new access to information and analytics that can improve their ability to provide high quality electrical power. In addition, OPQ is useful to other areas involving power quality data, such as security attacks based on simple or differential power analysis.

## Risks

**What are the risks of the OPQ project?**

There are some measurements that OPQ does not collect:
 
 * Current (i.e. instantaneous power) or energy (power over time) data.
 * Phase angle
 
The lack of this data may limit the effectiveness of OPQ for some forms of monitoring and analysis. In these cases, the data collected by OPQ will need to be augmented by data collected by other devices. 

The current OPQ development team is small (3 Professors, 2 Ph.D. students, several undergraduates) and located at one university. The strength of the development organization would be improved by incorporation of new organizations.

The current OPQ development team is under-resourced.  All students and faculty currently volunteer on the project.    

## Time and Cost

**How long will it take? How much will it cost to finish in this time period?**

We estimate that OPQ technology can be ready for widespread deployment within a calendar year if adequate resources are made available. 

We estimate $200K to provide adequate resources to finish in this time period. This includes salaries for graduate students and staff and equipment and materials.

## Deliverables

**What are the mid-term and final "exams" to check for success?**

Within six months, we should have a pilot deployment on the University of Hawaii microgrid that is providing continuous and useful power quality data not formerly available.

Within a year, we should have verified operations through the pilot deployment and have a manufacturing process in place that can make OPQ systems available on demand to organizations. 

