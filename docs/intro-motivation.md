---
title: Motivation for OPQ
sidebar_label: Motivation for OPQ
---

## The problem with power

Power quality is not currently a concern for most people in the United States.  Just like most citizens assume that their tap water is of adequate quality to drink, most also assume that their electricity is of adequate quality to power their homes and appliances without causing harm. And, in both cases, most people assume that it is the responsibility of public utilities to both monitor and correct any quality problems if they occur.

Successfully maintaining adequate power quality and providing sufficient amounts of it to meet the rising needs of consumers has been a triumph of electrical utilities for over 100 years.  In recent times, however, there have been two important changes to the nature of electrical generation and consumption that make power quality of increasing public concern and interest.

First, there is now a global movement away from centralized, fossil-fuel based forms of electrical energy generation and toward distributed, renewable alternatives such as wind and solar. This movement is particularly relevant to Hawaii, where over 80% of its electrical energy comes from oil, and where the average cost per kilowatt-hour of electricity is triple that of the mainland United States.  But the economic, environmental, and political advantages of renewable energy comes with significant new technical challenges: wind and solar are intermittent (for example, solar energy cannot be harvested at night) and unpredictable (for example, wind and solar energy fluctuate based upon cloud cover and wind speed).  In addition, renewable energy generation can be distributed throughout the grid (such as in the case of residential rooftop photovoltaic (PV) systems).  

One impact of adding renewable energy generation to an electrical grid is that maintaining adequate power quality is much more challenging.  This manifests itself in Hawaii in a very visible and negative way: the public demand for rooftop solar far exceeds the ability of the Hawaiian Electric Company to allow it while maintaining adequate power quality. In many neighborhoods, new rooftop solar installation is prohibited because Hawaiian Electric fears its impact on not just power quality but overall grid stability.  

Second, the rise of consumer electronics has raised the bar for what constitutes "adequate" power quality. In only a few decades, computers have gone from being a rare presence outside of labs and factories to ubiquity: computers appear throughout society not just as stand-alone devices but embedded in phones, washers, refrigerators, thermostats, and so forth. Electronic devices not only have higher power quality requirements, but some of them actually introduce power quality problems in the form of harmonic distortion.  Poor power quality can result in electronic devices failing unpredictably, or decreasing their lifespan.

So, on the one hand, adequate power quality is becoming more difficult to maintain, while on the other hand, our need for adequate power quality is increasing.  This leads to a third issue: electrical utilities are not necessarily required to be transparent about the quality of power they provide to consumers.  For example, in Hawaii, the utilities are required to make a "best effort" to provide voltage and frequency within 5% of nominal values, but are only required to publicly report on  outages of more than 3 minutes. There is no requirement to report potentially harmful deviations in voltage, frequency, or THD. 

These issues together motivate the Open Power Quality project.  

## Goals of OPQ

We are creating open source hardware and software technology to make it both simple and affordable to provide publicly available, useful data on the quality of power provided to consumers and their homes and appliances. Our immediate project goals include:

* Design and implementation of hardware and software technology that supports fast deployment of a distributed sensor network for collecting accurate and useful power quality data. 

* Design and implementation of analyses and visualizations that provide useful and actionable feedback to users regarding the sensor network and any power quality problems it detects.

* Pilot deployment of OPQ to monitor the University of Hawaii at Manoa's microgrid as part of the [Agile Power Monitoring Project](agile-power-monitoring.md).

Our longer range goals include:

* Pilot deployment across Oahu to create a grid-wide distributed sensor network for power quality.

* Creation of an independent, third-party resource regarding power quality and grid stability that is useful to citizens, researchers, and policy makers.

* Fostering improved public awareness about power quality and empirical data regarding the quality of power they are provided; 

* Provide a source of power quality data that, when combined with other forms of information, results in better modelling and analysis that ultimately leads to the ability to support increased amounts of renewable energy on Oahu's grid. 

The next section provides more details on the design of OPQ.



