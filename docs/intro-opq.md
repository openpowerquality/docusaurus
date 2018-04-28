---
title: What is OPQ? 
sidebar_label: What is OPQ?
---

The OPQ system consists of four major open source hardware and software components that provide end-to-end support for the capture, triggering, analysis, and reporting of consumer level local and global PQ events. 

  1. OPQ Box is a hardware device that detects the electrical waveform from a standard residential outlet and communicates both low and high fidelity representations of the waveform to other OPQ system components. 
  2. OPQ Makai monitors incoming low fidelity data from OPQ Boxes, requests high fidelity data when necessary, and stores the results in a MongoDB database.
  3. OPQ Mauka analyzes data, creates "events" when it detects anomolies, and can tell OPQ Makai to request high fidelity data from one or more OPQ Boxes to facilitate analysis.
  4. OPQ View is a visualization platform for displaying the results for data capture and analysis.
  
The following image illustrates how these components work together to take information from wall outlets (on the left side) to the display of analyses in a browser (on the right hand side):

<img src="/docs/assets/intro/system-diagram.png" width="100%">

This image illustrates the following high level data and control flow:

  * OPQ Boxes analyze power from wall outlets, and send low fidelity measurements to OPQMakai.
  * OPQ Makai analyzes low fidelity measurements, and requests high fidelity waveforms when desirable.
  * Both measurements and waveforms are saved in a MongoDB database.
  * OPQ Mauka analyzes low and high fidelity data, and creates "events" to represent anomalies.
  * OPQ View notifies users of events and allows them to drill down into low and high fidelity data.
  
OPQ Makai, OPQ Mauka, and OPQ View are all cloud-based software services that collectively form a single "instance" with respect to data transmission, storage, analysis, and visualization.  We refer to this collection of software-side components as OPQ Cloud.  Every OPQ Box connects to a single instance of an OPQ Cloud.  It is possible to have multiple OPQ Cloud instances. For example, a company might install an OPQ Cloud instance behind their firewall along with OPQ Boxes to provide a private mechanism for collecting and analyzing power quality data. 
  
Our approach has a number of benefits. The combination of low and high fidelity data reduces both network overhead and storage requirements, which increases the scalability of the system in terms of the number of OPQ Boxes that can be tied to a single OPQ Cloud instance. OPQ Makai and OPQ Mauka have a plugin architecture, making it easier to extend their functionality to incorporate new triggers for high quality data (in the case of OPQ Makai) and new events and analyses (in the case of OPQ Mauka). Finally, the open source licensing of both hardware and software makes it possible to incorporate new ideas, bug fixes, and enhancements from technologists across the power quality community.
