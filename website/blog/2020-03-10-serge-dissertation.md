---
title: "Serge Negrashov completes Ph.D. dissertation"
author: Philip Johnson
authorURL: http://philipmjohnson.org
---

<div style="padding-bottom: 50px">
<img src="/docs/assets/people/negrashov.jpg" class="center-block img-responsive" style="margin-left: 15px; margin-bottom: 10px; float: right" width="150px">

The OPQ team is delighted to announce that Serge Negrashov has successfully completed his Ph.D. dissertation: "Design, Implementation, and Evaluation of Napali: A novel distributed sensor network for improved power quality monitoring". The complete dissertation is available at [http://csdl.ics.hawaii.edu/techreports/2020/20-02/20-02.pdf](http://csdl.ics.hawaii.edu/techreports/2020/20-02/20-02.pdf).

Here's the abstract:

Today's big data world heavily relies upon providing precise, timely, and actionable intelligence, while being burdened by the ever increasing need for data cleaning and preprocessing.
While in the case of ingesting large quantity of unstructured data this problem is unavoidable, when it comes to sensor networks built for a specific purpose, such as anomaly detection, some of that computation can be moved to the edge of the network.
This thesis concerns the special case of sensor networks tailored for monitoring the power grid for anomalous behavior.
These networks monitor power delivery infrastructure with the intent of finding deviations from the nominal steady state, across multiple geographical locations.
Aforementioned deviations, known as power quality anomalies, may originate, and be localized to the location of the sensor, or may affect a sizable portion of the power grid.
The difficulty of evaluating the extent of a power quality anomaly stems directly from their short temporal and variable geographical impact.
I present a novel distributed power quality monitoring system called Napali which relies on extracted metrics from individual meters and their temporal locality in order to intelligently detect anomalies and extract raw data within temporal window and geographical areas of interest.

The claims of this thesis are that Napali outperforms existing power quality monitoring gridwide event detection methods in resource utilization and sensitivity.
Furthermore, Napali residential monitoring is capable of power grid monitoring without deployment on the high voltage transmission lines.
Final claim of this thesis is that Napali capability of extracting portions of the events which did not pass the critical thresholds used in other detection methods allows for better localization of power quality disturbances.
Napali claim validation was performed through deployment at the University of Hawaii.
Fifteen OPQ Box devices, designed specifically to operate with Napali were located in various locations on campus.
Data collected from these monitors was compared with smart meters already deployed across the University.
Additionally, Napali was compared with standard methods of power quality event detection running along side the Napali systems.

Napali methodology outperformed the standard methods of power quality monitoring in resource consumption, event quality and sensitivity.
Additionally, I was able to validate that residential utility monitoring is capable of event detection and localization without monitoring higher levels of the power grid hierarchy.
Finally, as a demonstration of Napali capabilities, I showed how data collected by my framework can be used to partition the power delivery infrastructure without prior knowledge of the power grid topology.
