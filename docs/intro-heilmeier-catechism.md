---
title: The Heilmeier Catechism for OPQ
sidebar_label: The Heilmeier Catechism
---

This section summarizes the OPQ Project in terms of the [Heilmeier Catechism](https://www.darpa.mil/work-with-us/heilmeier-catechism).

## Objectives

**What are we trying to do?**

The objective of the OPQ Project is to design and implement novel, low-cost hardware and software to improve the ability of organizations to independently monitor, visualize, and analyze their power quality. 

By "power quality", we mean data about frequency, voltage, and transients occurring at the point of measurement. OPQ does not measure current nor the total amount of power consumed over a period of time at a location. 

## Current practice

**How is it done today? What are the limitations of current practice?**

Power quality monitoring is currently done either by electrical utilities or in-house.

Power quality data collected by utilities tends to be proprietary information.  Utility scale power quality monitoring is expensive and typically involves substation-level monitors.  

In-house monitoring involves installation of monitors into electrical mains. Individual monitors are architecturally independent of each other. Monitors cost from $700 - $1200 each and are permanently installed. 

Current power quality hardware and software is fixed and very difficult to tailor and enhance for new purposes.

## Advantages of OPQ

**What is new in our approach? Why do we think it will be successful?**

OPQ leverages advances in IoT hardware and software technologies to provide the following advantages:

1. OPQ hardware devices cost around $75 each, 10x to 100x cheaper than competing devices. 

2. OPQ hardware and software have bi-directional communication. In essence, the power quality data collected by each OPQBox can change based upon the power quality data being collected by any other box.

3. OPQ's software is open source and has a plugin architecture, making it significantly easier to extend and tailor to new purposes.

4. OPQ's hardware monitors power quality at wall outlets rather than through installation at power mains. This means OPQ boxes are trivial to install and trivial to move to new locations.  

## Why OPQ?

**Who cares? If we are successful, what difference will it make?**

The rise of "smart grids" that include distributed, intermittent and unpredictable power generation (i.e. solar and wind) make power quality stability much more challenging than in the past.  OPQ provides a low-cost, extensible platform that enables organizations who wish to build electrical grids new access to information and analytics that can improve their ability to provide high quality electrical power.

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

