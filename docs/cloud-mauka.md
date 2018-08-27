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

### IEEE 1159 Voltage Plugin
The IEEE1159 voltage event plugin subscribes to all events that request data, analyzes the waveforms, and stores classified incidents back in the database. A received waveform is analyzed for continuous segments with non-nominal amplitudes. There are two important features of these segments that are considered for classification: duration and relative amplitude. The duration is the length of the segment in periods and/or seconds. The relative amplitude, which is defined per window (e.g period) of a waveform, is given as the actual divided by the nominal amplitude (where nominal is as specified by country/region).

The IEE1159 documentation specifies incidents by ranges of values for duration and relative amplitudes of a segment. The categories include undervoltage, overvoltage, and interruption (describing events lasting longer than a minute) and instantaneous, momentary, and temporary dips and swells (for shorter timescales). For example, a stretch with relative amplitudes between 0.1 and 0.9 that lasts 0.5 to 30 periods is classified as an instantaneous dip.

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

An example of this layout can be seen at `mauka/tests/plugins/test_itic_plugin.py`.

To run all unit tests, run `python -m unittest discover` from the `opq/mauka` directory. This command will recursively discover all unittests in the tests directory and run them.

```
(venv-opq) [anthony@localhost mauka]$ python3 -m unittest discover
......
----------------------------------------------------------------------
Ran 6 tests in 0.003s

OK
```

### Development Guidelines

1. Follow the [pep 8](https://www.python.org/dev/peps/pep-0008/) Python coding convention (see also http://pep8.org/#introduction). If any of the other following guidelines contradict the pep 8 standard, use the following instead of the standard.
2. Lines must be < 120 characters 
2. Variables, functions, methods, and modules should be [snake_case](https://en.wikipedia.org/wiki/Snake_case)
3. Classes should use [CapitalCamelCase](https://en.wikipedia.org/wiki/Camel_case)
4. Constants and enumeration values should be SNAKE_CASE_ALL_CAPS
5. Modules should provide module level documentation at the top of every .py file that briefly describes the purpose and contents of the module
6. Functions and methods should document their purpose, input, and output as Python [docstrings](http://docs.python-guide.org/en/latest/writing/documentation/).
7. Do not add type information to documentation, instead provide type information using Python's built-in [type hints](https://docs.python.org/3/library/typing.html) (see also https://www.python.org/dev/peps/pep-0484/)
8. Whenever practical and when types are known, provide type hints for class variables, instance variables, and function/method inputs and return types. The type hints are not enforced at runtime, but merely provide compile time hints. These are most useful in conjunction with an IDE so that your editor can highlight when input or return types do not match what is expected.
9. Whenever a new plugin is developed, update OPQ's docusaurus to provide a high-level and technical documentation on the plugin. Mauka Diagrams may also need to be updated.  
10. Whenever you commit or merge to master, ensure the Mauka code base passes all static analysis checks and all unit tests pass.

[The Zen of Python (pep 20)](https://www.python.org/dev/peps/pep-0020/)
```
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

When in doubt, ask.

### Static Analysis

[Coala](https://coala.io/#/home) is used to perform static analysis of the Mauka code base. Coala utilizes a plugin architecture to wrap several linters for Python (and other) code bases.

See https://github.com/coala/bear-docs/blob/master/README.rst#python to find information about linters that are supported for Python.

Static code analysis in Mauka is controlled by the .coafile at [opq/mauka/.coafile](https://github.com/openpowerquality/opq/blob/master/mauka/.coafile) 

To perform static code analysis ensure that coala is installed. Change to the `mauka` directory and invoke `coala --ci`. This will load the .coafile settings, run the linters, and display any errors tha the linters find. The following is an example of such a run.

```
anthony:~/Development/opq/mauka [12:28:11 Tue Jul 03]
> coala --ci
Executing section mauka...
Executing section mauka.spacing...
Executing section mauka.pep8...
Executing section mauka.pylint...
Executing section mauka.pyflakes...
Executing section mauka.bandit...
Executing section cli...
```

Here, we can see the different sections and linters running over the Mauka code base. Let's discuss each of the sections in detail.

#### Static Analysis Configuration

Configuration for Mauka's static analysis is performed in the [opq/mauka/.coafile](https://github.com/openpowerquality/opq/blob/master/mauka/.coafile) file.

The `mauka` section sets up ignored files and files that need to be linted. In our case, we want to ignore the auto-generated protobuf files and the tests directory. We want to lint all other files under mauka/ that end with the `.py` extension.

`mauka.spacing` ensures that all whitespace consists of space characters and not tabs.

`mauka.pep8` ensures that the code base conforms to Python pep8 standard. We make one change which is to set max line length to 120 characters.

`mauka.pylint` runs [pylint](https://www.pylint.org/) over the Mauka code base which catches a wide range common style and bug prone code. We disable [C0301](http://pylint-messages.wikidot.com/messages:c0301) since this already checked and configured in the mauka.pep8 linter. We also disable C1801 which disallows the following:

```python
if len(some_collection) == 0:
    # do something
else:
    # do something else    
```

in favor of the more Pythonic

```python
if some_collection:
    # do something
else:
    # do something else
```

which tests if the collection is empty directly using the if statement. This issue with this approach is that this idiom does not work for numpy arrays. These are so prevailent in our code that we decided to use the len(collection) idiom to test for all empty collections since this approach does work with numpy.


`mauka.pyflakes` (https://github.com/PyCQA/pyflakes) performs similar linting to pylint.

`mauka.bandit` performs security checks over the code base. B322 is disabled since it only applies to Python 2 code bases.

