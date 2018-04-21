---
title: Roadmap
---

## Milestone: Release OPQ Version 3.0 (Spring 2018)

Our immediate goal is to provide a system that is suitable for use for [Agile Power Monitoring](agile-power-monitoring.md).  For lack of a better term, let's call that system "Version 3.0".  Here are the essential requirements:

*Requirements for Box:*

  * V3 design completed. ([Issue 62](https://github.com/openpowerquality/opq/issues/62))
  * Submit V3 for UL Listing. ([Issue 108](https://github.com/openpowerquality/opq/issues/108))
  * 12 OPQ V3 boxes manufactured and ready for deployment. ([Issue 109](https://github.com/openpowerquality/opq/issues/109))
  
*Requirements for Mauka/Makai:*

  * Location and region entities implemented and available for analysis. ([Issue 103](https://github.com/openpowerquality/opq/issues/103))
  * Annotations are available (so that it is possible to develop analyses based on comparison of OPQ Box data with external environmental and other data). ([Issue 99](https://github.com/openpowerquality/opq/issues/99))
  * API End Points are available (so that external systems can both read and write data with appropriate permissions). ([Issue 107](https://github.com/openpowerquality/opq/issues/107))
  
*Requirements for View:*

  * Location and region-based user interface components available. ([Issue 104](https://github.com/openpowerquality/opq/issues/104))
  * Basic map-based components available. ([Issue 69](https://github.com/openpowerquality/opq/issues/69))
  
## Milestone: Start Agile Power Monitoring Study (Summer 2018)

The [Agile Power Monitoring project](agile-power-monitoring.md) will kick off in Summer 2018 and last for at least a year.  The basic goal of this project is to demonstrate the ability of OPQ to provide useful analytics for UH microgrid management.

More specifically, our goals for Summer 2018 are the following:

*Installation of 12 OPQ Boxes:* 

In consultation with the UH Microgrid manager, we should deploy around a dozen OPQ boxes on campus, and they should be successfully collecting and transmitting data to an ITS server (emilia or a new one). ([Issue 111](https://github.com/openpowerquality/opq/issues/111))

*Provide real-time situational awareness:*  

It should be possible to monitor microgrid stability in near real-time. This can be achieved through:

  * A real-time Location Trends component that shows max and min voltage, frequency, and THD for each location on campus, and which is updated each minute as new Trend documents are produced. ([Issue 104](https://github.com/openpowerquality/opq/issues/104))
  
  * An Alert Manager mechanism that allows the UH Microgrid manager to specify, for each location of interest, what constitutes an "interesting" event.  ([Issue 93](https://github.com/openpowerquality/opq/issues/93))
  
  * A real-time Location Alerts component that displays a description of most recent Alert observed for each location, along with the timestamp.  It can be color coded to indicate age (i.e. red if the Alert was within the last hour, yellow if within the last day, green if older than a day.) ([Issue 110](https://github.com/openpowerquality/opq/issues/110))
  
*Support data integration:*  

OPQ Annotations ([Issue 99](https://github.com/openpowerquality/opq/issues/99)) and API End Points ([Issue 107](https://github.com/openpowerquality/opq/issues/107)) should make it possible for OPQ to interoperate with other systems and other data sources. The UH Microgrid currently provides a set of utility-grade, building-level energy and power quality metering devices.  

For this part of the pilot study, we will explore how to best integrate the data produced by OPQ Boxes with the data produced by the building-level meters. 

The goal is to produce at least one form of data integration that provides actionable information about the UH microgrid.


## Milestone: Plan for helping Hawaii modernize its grid with OPQ (Fall 2018)

In February, 2018, the Hawaii Public Utilities Commission approved a [Grid Modernization Strategy](https://www.hawaiianelectric.com/about-us/our-commitment/investing-in-the-future/grid-modernization-strategy) for Oahu's electric grid.  HECO has created a document called [Modernizing Hawaii's Grid for our Customers](https://www.hawaiianelectric.com/Documents/about_us/investing_in_the_future/final_august_2017_grid_modernization_strategy.pdf) that details the strategy.

The Strategy's stated objectives are to:

  1. empower customers' choice and provide safe, reliable, and affordable services; 
  2. enable distributed resources to become vital part of Hawaii's renewable portfolio; and
  3. leverage the electric grid to spur economic growth in Hawaii's communities.
  
The goal of this Milestone is to develop a plan for deploying OPQ devices across Oahu in order to provide data to support the Grid Modernization Strategy. The plan should include:

  * Analysis of the Grid Modernization Plan, and how OPQ can support it.
  * Funding model design. We will need a way to finance the construction of 100 or more UL Listed OPQ Boxes, along with the expenses incurred for cloud-based hosting. The funding model could include a Kickstarter Campaign, grants from foundations like Blue Planet or HEI Charitable Foundation, or some combination. 
  * Implementation design. How do we get OPQ into the right places at the right time, and how do we obtain whatever complementary data is required in order to achieve the goal of supporting the Grid Modernization Plan?
  














 






