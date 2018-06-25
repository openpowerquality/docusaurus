---
title: OPQ Mauka
sidebar_label: Mauka
---

OPQ Mauka is a distributed plugin-based middleware for OPQ that provides higher level analytic capabilities. OPQ Mauka provides analytics for classification of PQ events, aggregation of triggering data for long term trend analysis, community detection, statistics, and metadata management. It is intended to provide the following capabilities:

* Recording long term trends from triggering measurements
* Classification of voltage dip/swells
* Classification of frequency dip/swells
* Requests of raw data for higher level analytics, including:
  * Community detection
  * Grid topology
  * Global/local event detection/discrimination
  * Integration with other data sources (_i.e._ PV production) 

## Design

### Overview

OPQMauka is written in Python 3 and depends on 2 ZMQ brokers as well as a Mongo database. The architecture of OPQMauka is designed in such a way that all analytics are provided by plugins that communicate using publish/subscribe semantics using ZMQ. This allows for a distributed architecture and horizontal scalability. 

### Mauka Services

Mauka utilizes several services that are started as separate processes in order to function. A diagram of these services and utilized ports is provided below. Followed by their descriptions.

<img src="/docs/assets/mauka/mauka-services.png">

| Service | Description |
|---------|-------------|
| Makai Measurement Bridge | Provides low fidelity measurements to the `Measurement` topic. Data is bridged over a ZMQ proxy. |
| Makai Event Bridge | Provides event id numbers to the `RequestDataEvent` topic. Data is bridged over a ZMQ proxy.  |
| Mauka Pub/Sub Broker | Provides a Publish/Subscribe ZMQ broker to all Mauka plugins. This is how plugins within Mauka communicate. |
| Mauka Plugin Manager | This is a process that manages plugin processes. It also allows developers to interact with plugins at runtime. Plugins can be hot loaded at run time as well. |

### Mauka Plugins

The OPQMauka processing pipeline is implemented as a directed acyclic graph (DAG). Communication between vertexes in the graph is provided via ZeroMQ. Each node in the graph is implemented by an OPQMauka Plugin. Each plugin runs as a seperate process allowing scalability to distributed systems. Additional analysis plugins can be added to OPQMauka at runtime, without service interruption.

Each OPQMauka Plugin provides a set of topics that it subscribes to and a set of topics that it produces. These topics form the edges between vertexes in our graph. Because each plugin is independent and only relies on retrieving and transmitting data over ZeroMQ, plugins can be implemented in any programming language and executed on any machine in a network. This design allows us to easily scale plugins across multiple machines in order to increase throughput.3.

Below is a figure of the current plugin architecture.

<img src="/docs/assets/mauka/mauka-plugins.png">


### Base Plugin (MaukaPlugin)

The [base plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/base.py) is a base class which implements common functionally across all plugins. This plugin in subclassed by all other OPQMauka plugins. The functionality this plugin provides includes:

* Access to the underlying Mongo database
* Automatic publish subscribe semantics with ```on_message``` and ```publish``` APIs (via ZMQ)
* Configuration/JSON parsing and loading
* Python multiprocessing primitives 
* Status/heartbeat notifications

### Threshold Plugin

The [threshold plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/ThresholdPlugin.py) is a base plugin that implements functionality for determining preset threshold crossings over time. That is, this plugin, given a steady state, will detect deviations from the steady using percent deviation from the steady state as a discriminating factor. 

When subclassing this plugin, other plugins will define the steady state value, the low threshold value, the high threshold value, and the duration threshold value.

This plugin is subclassed by the voltage and frequency threshold plugins.

Internally, the threshold plugin looks at individual measurements and determines if the value is low, stable, or high (as defined by the subclass). A finite state machine is used to switch between the following states and define events.

**Low to low.** Still in a low threshold event. Continue recording low threshold event.

**Low to stable.** Low threshold event just ended. Produce an event message.

**Low to high.** Low threshold event just ended. Produce and event message. Start recording high threshold event.

**Stable to low.** Start recording low threshold event.

** Stable to stable.** Steady state. Nothing to record.

**Stable to high.** Start recording high threshold event.

**High to low.** High threshold event just ended. Produce event message. Start recording low threshold event.

**High to stable.** High threshold event just ended. Produce event message.

**High to high.** Still in high threshold event. Continue recording event. 

Event messages are produced by passing the contents of a recorded event to the ```on_event``` method call. This method call needs to be implemented in all subclassing plugins in order to deal with the recorded event.

### Frequency Threshold Plugin

The [frequency threshold plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/FrequencyThresholdPlugin.py) subclasses the threshold plugin and classifies frequency dips and swells.

By default, this plugin assumes a steady state of 60Hz and will detect dips and swells over 0.5% in either direction. The thresholds can be configured by setting the keys ```plugins.ThresholdPlugin.frequency.ref```, ```plugins.ThresholdPlugin.frequency.threshold.percent.low```, and ```plugins.ThresholdPlugin.frequency.threshold.percent.high``` in the configuration file.

When thresholds are tripped, frequency events are generated and published to the system. These are most importantly used to generate event triggering requests to OPQMauka to request raw data from affected devices.

### Voltage Threshold Plugin

The [voltage threshold plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/VoltageThresholdPlugin.py) subclasses the threshold plugin and classifies voltage dips and swells.

By default, this plugin assumes a steady state of 120hz and will detect dips and swells over 5% in either direction. The thresholds can be configured by setting the keys plugins.ThresholdPlugin.voltage.ref, plugins.ThresholdPlugin.voltage.threshold.percent.low, and plugins.ThresholdPlugin.voltage.threshold.percent.high in the configuration file.

When thresholds are tripped, voltage events are generated and published to the system. These are most importantly used to generate event triggering requests to OPQMauka to request raw data from affected devices.

### Total Harmonic Distortion Plugin
The [total harmonic distortion (THD) plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/ThdPlugin.py) subscribes to all events that request data, waits until the data is realized, performs THD calculations over the data, and then stores the results back to the database.

This plugin subscribes to events that request data and also THD specific messages so that this plugin can be triggered to run over historic data as well. The amount of time from when this plugin receives a message until it assumes the data is in the database can be configured in the configuration file. 

The THD calculations are computed in a separate thread and the results are stored back to the database. 

### ITIC Plugin 

The [ITIC plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/IticPlugin.py) subscribes to all events that request data, waits until the data is realized, performs ITIC calculations over the data, and then stores the results back to the database.

This plugin subscribes to events that request data and also ITIC specific messages so that this plugin can be triggered to run over historic data as well. The amount of time from when this plugin receives a message until it assumes the data is in the database can be configured in the configuration file. 

The ITIC calculations are computed in a separate thread and the results are stored back to the database. 

ITIC regions are determined by plotting the curve and performing a point in polygon algorithm to determine which curve the point falls within.


### Acquisition Trigger Plugin

The [acquistion trigger plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/AcquisitionTriggerPlugin.py) subscribes to all events and forms event request messages to send to OPQMakai to enable the retrieval of raw power data for higher level analytics.

This plugin employs a deadzone between event messages to ensure that multiple requests for the same data are not sent in large bursts, overwhelming OPQBoxes or OPQMakai. The deadzone by default is set to 60 seconds, but can be configured by setting the ```plugins.AcquisitionTriggerPlugin.sDeadZoneAfterTrigger``` key in the configuration. If this plugin encounters an event while in a deadzone, a request is still generated and sent to OPQMakai, however a flag is set indicating to Makai that raw data should not be requested.

### Status Plugin

The [status plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/StatusPlugin.py) subscribes to heatbeat messages and logs heartbeats from all other plugins (including itself). Also provides an HTTP endpoint so the status can be ascertained by other services.

### Print Plugin

The [print plugin](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/PrintPlugin.py) subscribes to all topics and prints every message. This plugin is generally disabled and mainly only useful for debugging purposes.

## Development

### Obtaining the sources

1. Clone the master branch of the OPQ project at: https://github.com/openpowerquality/opq
2. OPQ Mauka sources can be located at opq/mauka

### Directory structure and layout

The top level of the `opq/mauka` directory contains the following files:

| Files | Description |
|-------|-------------|
| OpqMauka.py | Entry point into OPQ Mauka. Provides high level management of plugins. Starts and manages Mauka services. |
| config.json | Default key-value based configuration values for Mauka |
| requirements.txt | List of Python dependencies required by Mauka. |
| mongo.py | Python module providing high level access to the OPQ Mongo database. |
| constants.py | Python module providing constant values. |

The top level of the `opq/mauka` directory contains the following directories:

| Directory | Description |
|-------|-------------|
| deploy | Contains scripts for building and deploying Mauka to emilia or OPQ Sim. |
| plugins | Contains all Mauka plugin modules |
| protobuf | Contains the Python protobuf wrapper for OPQ as well as some utilities. This is mainly needed for working with Makai. |
| services | Contains modules that build the Mauka services layer. |
| tests | Mauka tests directory. |


### Running in development

To test OPQ Mauka in a development environment, you can use OPQ Sim.

1. Install and become familiar with [OPQ Sim](developerguide-virtual-machine.md).
2. Use the [included deployment scripts](deploy-mauka.md) to deploy an OPQ Mauka bundle to to OPQ Sim.
3. Follow the instructions included with the VM guide to generate PQ events on the simulator.


### Plugin Development

The following steps are required to create a new OPQMauka plugin:

1. Create a new Python module for the plugin in the plugins package (i.e. MyFancyPlugin.py).

2. import the plugin base
```
import plugins.base
```

3. Create a class that extends the base plugin.
```
class MyFancyPlugin(plugins.base.MaukaPlugin):
      ...
```

5. Provide the following constructor for your class. Ensure the a call to super provides the configuration, list of topics to subscribe to, and the name of the plugin. Finally, a multiprocess exit event object is passed to the base class with allows the plugin manager to safely terminate plugins.
```
def __init__(self, config, exit_event):
      NAME = "MyFancyPlugin"
      super().__init__(config, ["foo", "bar"], NAME, exit_event)
```

6. Overload the ```on_message``` from the base class. This is how you will receive all the messages from topics you subscribe to.
```
def on_message(self, topic, message):
      ...
```

7. Produce messages by invoking the superclasses produce method.
```
self.produce("topic", "message")
```

8. Import and add your plugin in plugins/```__init__.py```.
```
from plugins import MyFancyPlugin
```

9. Add your plugin to the plugin list in ```OpqMauka.py```.

An example plugin template might look something like:

```
# plugins/MyFancyPlugin.py
import plugins.base

def run_plugin(config):
    plugins.base.run_plugin(MyFancyPlugin, config)

def MyFancyPlugin(plugins.base.MaukaPlugin):
    def __init__(self, config, exit_event):
         NAME = "MyFancyPlugin"
         super().__init__(config, ["foo", "bar"], NAME, exit_event)

    def on_message(self, topic, message):
          print(topic, message)
```

### Message Injection

It's nice to think of Mauka as a perfect DAG of plugins, but sometimes its convenient to dynamically publish (topic, message) pairs directly into the Mauka system.

This is useful for testing, but also useful for times when we want to run a plugin of historical data. For instance, let's say a new plugin Foo is developed. In order to apply Foo's metric to data that has already been analyzed, we can inject messages into the system targetting the Foo plugin and triggering it to run over the old data.

This functionality is currently contained in [plugins/mock.py](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/mock.py).

The script can either be used as part of an API or as a standalone script. As long as the URL of Mauka's broker is known, we can use this inject messages into the system. This provides control over the topic, message contents, and the type of the contents (string or bytes).

### Testing

Mauka utilizes Python's built-in support for [unit testing](https://docs.python.org/3/library/unittest.html). 

Unit tests should be used to test the analysis functionality of every Mauka plugin. Tests are currently laid out in the following manner.

```
opq/mauka/tests
  + /services
  + /plugins 
``` 

Unit tests that tests Mauka services (such as the brokers or plugin manager) should reside in `tests/services`. Unit tests for plugins should reside in `tests/plugins`. Every testing sub-directory must include a `__init__.py` file.

Every plugin should have a module in the `tests/plugins` directory that directly tests a Mauka plugin. Every plugin module should be named test_<i>PluginName</i>.py

Each test plugin module must contain a class (which is the same name as the module) that then extends `unittest.TestCase`.

An example of this layout can be seen at `mauka/tests/plugins/test_IticPlugin.py`.

To run all unit tests, run `python -m unittest discover` from the `opq/mauka` directory. This command will recursively discover all unittests in the tests directory and run them.

```
(venv-opq) [anthony@localhost mauka]$ python3 -m unittest discover
......
----------------------------------------------------------------------
Ran 6 tests in 0.003s

OK
```
