---
title: "OPQ Ph.D. proposals now available"
author: Philip Johnson
authorURL: https://philipmjohnson.org/
---

<div style="padding-bottom: 50px">
We are delighted to announce the publication of two Ph.D. proposals related to Open Power Quality.  These proposals provide you with an nice overview of the major innovations we intend to implement within OPQ during 2019. Enjoy!

### Design, implementation, and evaluation of Napali: A novel distributed sensor network for improved power quality monitoring, Serge Negrashov. 

Abstract: Today’s big data world is heavily relied on to bring precise, timely, and actionable intelligence, while being burdened by the ever increasing need for data cleaning and preprocessing. While in the case of ingesting large quantity of unstructured data this problem is unavoidable, when it comes to sensor networks built for a specific purpose, such as anomaly detection, some of that computation can be moved to the edge of the network. This thesis concerns the special case of sensor networks tailored for monitoring the power grid for anomalous behavior. These networks consist of meters connected to the grid across multiple geographically separated locations, while monitoring the power delivery infrastructure with the intent of finding deviations from the nominal steady state. These deviations, known as power quality anomalies, may originate, and be localized to the location of the sensor, or may affect a sizable portion of the power grid. The difficulty of evaluating the extent of a power quality anomaly stems directly from their short temporal and variable geographical impact. I propose a novel distributed power quality monitoring system called Napali which relies on extracted metrics from individual meters and their temporal locality in order to intelligently detect anomalies and extract raw data within temporal window and geographical areas of interest. The results of this research should be useful in other disciplines, such as general sensor network applications, IOT, and intrusion detection systems.

Available at: [http://csdl.ics.hawaii.edu/techreports/2018/18-03/18-03.pdf](http://csdl.ics.hawaii.edu/techreports/2018/18-03/18-03.pdf)

### Laha: A framework for adaptive optimization of distributed sensor networks, Anthony Christe.

Abstract: Distributed Sensor Networks (DSNs) are faced with a myriad of technical challenges. This dissertation examines two important DSN challenges. One problem that is apparent in any DSN is converting “primitive” sensor data into actionable products and insights. For example, a DSN for power quality (PQ) might gather primitive data in the form of raw voltage waveforms and produce actionable insights in the form of classified power quality events such as voltage sags or frequency swells or provide the ability to predict when PQ events are going to occur by observing cyclical data. For another example, a DSN for infrasound might gather primitive data in the form of microphone counts and produce actionable insight in the form of determining what, when, and where the signal came from. 

To make progress towards this problem, DSNs typically implement one or more of the following strategies: detecting signals in the primitive data (deciding if something is there), classification of signals from primitive data (deciding what is there), localization of signals (when and where did the signals come from), and by forming relationships between primitive data by finding correlations between spatial attributes, temporal attributes, and by associating metadata with primitive data to provide contextual information not collected by the DSN. These strategies can be employed recursively. As an example, the result of aggregating typed primitive data provides a new higher level of types data which contains more context than the data from which is was derived from. This new typed data can itself be aggregated into new, higher level types and also participate in relationships. A second important challenge is managing data volume. Most DSNs produce large amounts of (increasingly multimodal) primitive data, of which only a tiny fraction (the signals) is actually interesting and useful. The DSN can either utilize one of two strategies: keep all of the information and primitive data forever, or employ some sort of strategy for systematically discarding (hopefully uninteresting and not useful) data. As sensor networks scale in size, the first strategy becomes unfeasible. Therefore, DSNs must find and implement a strategy for managing large amounts of sensor data. The difficult part is finding an effective and efficient strategy deciding what data is interesting and must be kept and what data to discard. 

This dissertation investigates the design, implementation, and evaluation of the Laha framework, which is intended to address both of these problems. First, the Laha framework provides a multi-leveled representation for structuring and processing DSN data. The structure and processing at each level is designed with the explicit goal of turning low-level data into actionable insights. Second, each level in the framework implements a “time-to-live” (TTL) strategy for data within the level. This strategy states that data must either “progress” upwards through the levels towards more abstract, useful representations within a fixed time window, or be discarded and lost forever. The TTL strategy is interesting because when implemented, it allows DSN designers to calculate upper bounds on data storage at each level of the framework and supports graceful degradation of DSN performance.
    
Available at: [http://csdl.ics.hawaii.edu/techreports/2018/18-02/18-02.pdf](http://csdl.ics.hawaii.edu/techreports/2018/18-02/18-02.pdf)
 
</div>
 

 
