---
title: OPQ Mauka Developer Guide
sidebar_label: Mauka
---

## Prerequisites

Familiarize yourself with [high-level design and goals](cloud-mauka.md).

### Obtaining the sources

1. Clone the master branch of the OPQ project at: https://github.com/openpowerquality/opq
2. OPQ Mauka sources can be located at opq/mauka

### Directory structure and layout

The top level of the `opq/mauka` directory contains the following files:

The top level of the `opq/mauka` directory contains the following directories:

## Running in development

To test OPQ Mauka in a development environment, you can use OPQ Sim.

1. Install and become familiar with [OPQ Sim](developerguide-virtual-machine.md).
2. Use the [included deployment scripts](deploy-mauka.md) to deploy an OPQ Mauka bundle to to OPQ Sim.
3. Follow the instructions included with the VM guide to generate PQ events on the simulator.


## Plugin Development

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

4. Create the following module level function
```
def run_plugin(config):
      plugins.base.run_plugin(MyFancyPlugin, config)
```

5. Provide the following constructor for your class. Ensure the a call to super provides the configuration, list of topics to subscribe to, and the name of the plugin.
```
def __init__(self, config):
      super().__init__(config, ["foo", "bar"], "MyFancyPlugin")
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
    def __init__(self, config):
         super().__init__(config, ["foo", "bar"], "MyFancyPlugin")

    def on_message(self, topic, message):
          print(topic, message)
```

## Message Injection

It's nice to think of Mauka as a perfect DAG of plugins, but sometimes its convenient to dynamically publish (topic, message) pairs directly into the Mauka system.

This is useful for testing, but also useful for times when we want to run a plugin of historical data. For instance, let's say a new plugin Foo is developed. In order to apply Foo's metric to data that has already been analyzed, we can inject messages into the system targetting the Foo plugin and triggering it to run over the old data.

This functionality is currently contained in [plugins/mock.py](https://github.com/openpowerquality/opq/blob/master/mauka/plugins/mock.py).

The script can either be used as part of an API or as a standalone script. As long as the URL of Mauka's broker is known, we can use this inject messages into the system. This provides control over the topic, message contents, and the type of the contents (string or bytes). 

