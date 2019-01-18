---
title: OPQ Box User Guide
sidebar_label: OPQ Box
---

## Obtain an OPQ Box

First, obtain an OPQ Box and plug it in within range of a wireless access point. Currently, your options for obtaining an OPQ Box are to contact the Open Power Quality research via Professor Philip Johnson (johnson@hawaii.edu). We are working on manufacturing options. 

When plugged in, it looks like this:

<img src="/docs/assets/box/opqbox.jpg" width="400px">

## Provide the box with your wireless access credentials

The OPQ Box needs to be able to send data to the OPQ cloud services over the Internet. To accomplish this, it needs to know the name and (if required) password for your wireless network.  

To obtain these credentials, you must first wait approximately 1 to 2 minutes after plugging in your OPQ Box, at which point you should find that there is a public wireless access point called "OPQ".  Connect to that access point with your laptop or mobile device.

Once you are connected, bring up a browser and go to `http://10.42.0.1:8888/`.  Your browser should then display a page that lists all the wireless access points found by the OPQ Box as well as Box configuration options. Here's an example screen image:
   
<img src="/docs/assets/box/wifi_connect_1.png" width="100%">

You can click either an existing available network which will copy the network name to the SSID field or you can edit the SSID and Password fields directly. 

If the network is hidden, you can enter the name of the hidden network directly into the SSID field.

If a network is open and does not require a password, only enter the network name in the SSID field and leave the password field blank.

After clicking "Update", the OPQ Box attempts to make the connection. You should see a green status with a message similar to: "Attempting to connect OPQ Box to [network name]. If the connection is successful, this device will drop the OPQ connection and reconnect to the previously connected network. If the connection is unsuccessful, the OPQ Box will go back into AP mode and the OPQ network will reappear to attempt to setup the connection again."

An example of this is displayed in the following screenshot.

<img src="/docs/assets/box/wifi_connect_2.png" width="100%">

Clicking "Refresh Network List" will refresh and update the list of available, non-hidden networks.

If there are issues with communicating with the box-configuration-daemon when attempting to retrieve the list of available SSIDs or attempting to connect to a network, the status box will turn red and display an error message. Please note, that an error message is only displayed when there are issues communicating with the box-configuration-daemon and you will not see an error message if the box fails to connect to a network.

### Example: Connecting to a open network
In this example, the UHM network is an open network that does not require a password to connect. UHM is selected and the SSID is copied into the SSID field. The update button is selected and an attempt to connect message is displayed. After about 30 seconds, the OPQ network disappears and this indicating that the OPQ Box is connected to the UHM wireless network.

<img src="/docs/assets/box/wifi_connect_3.png" width="100%">

### Example: Connecting to a password protected network
In this example, the CSDL network is a password protected network. CSDL is selected and the SSID is copied into the SSID field. A password is supplied to the Password field. The update button is selected and an attempt to connect message is displayed. After about 30 seconds, the OPQ network disappears indicating that the OPQ Box is connected to the CSDL wireless network.

<img src="/docs/assets/box/wifi_connect_2.png" width="100%">

### Example: Connecting to a hidden network
In this example, the pmj network is a hidden password protected network. Since the network is hidden, pmj is manually typed into the SSID field. A password is supplied to the Password field. The update button is selected and an attempt to connect message is displayed. After about 30 seconds, the OPQ network disappears indicating that the OPQ Box is connected to the pmj wireless network.

<img src="/docs/assets/box/wifi_connect_4.png" width="100%">

## Verify power quality data transmission

To check your OPQ Box is transmitting data successfully, go to the landing page for OPQ View, and use the System Health component to see if your Box is green:

<img width="400px" src="/docs/assets/view/components/system-health.png" >

To see the actual data for your Box, you can login and go the Live Data page. For example, you can see Measurement data in real time: 

<img src="/docs/assets/view/components/live-measurements.png" >

## Modify Box configuration options

The box-configuration-daemon provides a low level interface for setting the configuration options of the OPQ Box. To access the Box configuration options, connect to the OPQ access point and navigate to `http://10.42.0.1:8888/`. If the box is already connected to a wireless network and the OPQ AP is not coming up, then you will need to determine the Box'es IP address and connect to the box-configuration-daemon from the same network at `http://ip-address-of-box:8888/`. 

Once connected, scroll to the bottom of the page and you should see a section titled "OPQ Box Configuration". The following screenshot shows what this should look like:

<img src="/docs/assets/box/opqbox_config.png" width="100%"> 

The configuration is provided in the form of a JSON file. Only valid JSON will be posted back to the box. The configuration is provided as sets of key-pair values. The current list of configuration keys are described in the following table.

| Configuration Key | Type | Description |
|-------------------|------|-------------|
| cmd_sub_ep | String | Subscription endpoint for acquisition (tcp://ip:port) |
| cmd_push_ep | String | Push endpoint for acquisition (tcp://ip:port) |
| trg_push_ep | String | Push endpoint for triggering (tcp://ip:port) |
| updates_ep | String | Endpoint to check and pull OPQ Box updates (http[s]://url:port/path) |
| server_public_key | String | The public key of the acquisition server for data encryption |
| box_id | Integer | The id of the box. Must be positive and unique. |
| device_path | String | Unknown |
| calibration | Float | The calibration constant for this box |
| windows_per_measurement | Integer | Number of window rolled into a single measurement |
| windows_in_storage_buffer | Integer | Number of windows to buffer on the OPQ Box |
| plugins | List[String] | List of plugins to load on OPQ Box |
 

When you are done editing the OPQ Box configuration, click the "Update" button. A green status message indicates success and a red status message indicates an error and provides an error message.

### Example Box configuration success 
In this example, we update the box_id from 0 to 10 and then click Update.


<img src="/docs/assets/box/opqbox_config_2.png" width="100%">

### Example Box configuration error
In this example, we remove the closing quote " from the plugin, making the JSON invalid. Notice how the error message displays the location of the error.

<img src="/docs/assets/box/opqbox_config_3.png" width="100%">




