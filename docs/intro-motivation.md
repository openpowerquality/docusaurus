---
title: Motivation for OPQ
sidebar_label: Motivation for OPQ
---

## The problem with power

Power quality is not currently a concern for most people in the United States.  Just like most citizens assume that their tap water is of adequate quality to drink, most also assume that their electricity is of adequate quality to power their homes and appliances without causing harm. And, in both cases, most people assume that it is the responsibility of public utilities to both monitor and correct any quality problems if they occur.

Successfully maintaining adequate power quality and providing sufficient amounts of it to meet the rising needs of consumers has been a triumph of electrical utilities for over 100 years.  In recent times, however, there have been changes to the nature of electrical generation and consumption that make power quality of increasing public concern and interest.  

The vision of the Open Power Quality project is to support three major improvements to electrical infrastructure: 

  1. Increase the ability of grids to use distributed, intermittent forms of renewable energy.
  2. Increase the lifespan and reduce failure rates in consumer electronics due to poor power quality.
  3. Increase the availability of power quality data to consumers, researchers, and public policy makers.  

Let's look at this vision in a bit more detail.

## 1. We need more renewable energy

There is now a global movement away from centralized, fossil-fuel based forms of electrical energy generation and toward distributed, renewable alternatives such as wind and solar. This movement is particularly relevant to Hawaii, where over 80% of its electrical energy comes from oil, and where the average cost per kilowatt-hour of electricity is triple that of the mainland United States.  But the economic, environmental, and political advantages of renewable energy comes with significant new technical challenges.  Wind and solar are intermittent (for example, solar energy cannot be harvested at night) and unpredictable (for example, wind and solar energy fluctuate based upon cloud cover and wind speed).  In addition, renewable energy generation can be distributed throughout the grid (such as in the case of residential rooftop photovoltaic (PV) systems).  

One impact of adding renewable energy generation to an electrical grid is that maintaining adequate power quality is much more challenging.  This manifests itself in Hawaii in a very visible and negative way: the public demand for rooftop solar far exceeds Hawaiian Electric Company's ability to utilize it and maintain adequate power quality. As a result, in many neighborhoods, new rooftop solar installation is prohibited because Hawaiian Electric fears its impact on not just power quality but overall grid stability.  

OPQ intends to provide power quality data that can be used by utilities and renewable energy researchers to create technology that will enable the public to install more renewable energy.  

## 2. Consumer electronics require higher quality power 

The rise of consumer electronics has raised the bar for what constitutes "adequate" power quality. In only a few decades, computers have gone from being a rare presence outside of labs and factories to ubiquity: computers appear throughout society not just as stand-alone devices but embedded in phones, washers, refrigerators, thermostats, and so forth. Electronic devices not only have higher power quality requirements, but some of them actually introduce power quality problems in the form of harmonic distortion.  Poor power quality can result in electronic devices failing unpredictably, and/or decreasing their lifespan.

OPQ intends to provide power quality data that can be used to determine if potentially harmful fluctuations in power are being supplied to their appliances. 

## 3. Power quality data should be publicly available

Electrical utilities are not necessarily required to be transparent about the quality of power they provide to consumers.  For example, in Hawaii, the utilities are required to make a "best effort" to provide non-harmful voltage and frequency values, but are only required to publicly report on power outages of more than 3 minutes. There is no requirement for utilities to report potentially harmful deviations in voltage, frequency, or THD.  Indeed, in Hawaii, there is not yet infrastructure in place that would enable utilities to collect that information, even if they were asked to report on it.

OPQ intends is to provide an unbiased, independent, third party source of accurate power quality data. This can be used by consumers to better understand the performance of their public utilities, by researchers to devise improvements to grid control, and by public policy makers responsible for designing and implementing regulatory frameworks for electrical utilities.

## Immediate goals for OPQ

To make progress toward our vision, we are currently focused on achieving the following immediate goals.

* Design and implementation of hardware and software technology that supports fast deployment of a distributed sensor network for collecting accurate and useful power quality data. 

* Design and implementation of analyses and visualizations that provide useful and actionable feedback to users regarding the sensor network and any power quality problems it detects.

* Pilot deployment of OPQ to monitor the University of Hawaii at Manoa's microgrid as part of the [Agile Power Monitoring Project](agile-power-monitoring.md).

* Pilot deployment across Oahu to create a grid-wide distributed sensor network for power quality.

The next section provides more details on the design of OPQ.



