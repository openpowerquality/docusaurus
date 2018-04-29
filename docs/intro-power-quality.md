---
title: A beginners guide to power quality
sidebar_label: A beginners guide to power quality
---

Power quality is a very complex subject, but to understand the overall goals of the Open Power Quality project, a simplified understanding should suffice.
 
## Voltage, frequency, and "perfect" power quality

In OPQ, we are concerned with measuring the quality of power from a wall outlet, which means we focus on an approach to providing power called "alternating current" (AC). The following image illustrates what "perfect" quality AC power for U.S. wall outlets might look like:

<img src="/docs/assets/intro/sinewave.png" width="100%">

This image illustrates three criteria that must be satisfied for AC power in US households to have "perfect" power quality: 

  1. The voltage must vary from a maximum value of +170 volts to a minimum value of -170 volts. 
  2. The voltage must switch between the maximum and minimum values exactly six times in a tenth of a second, or 60 times per second. 
  3. The voltage must vary between its maximum and minimum values in a precise manner called a sine wave.

Even though voltage does not have a constant value in alternating current, it is useful to have a measurement consisting of a single number for voltage. By convention, a measure called "root mean square" (RMS) is used to represent the voltage in an alternating current, as it generally corresponds to the "average" value of the voltage. RMS Voltage for AC turns out to be approximately 70% of the maximum voltage, so the RMS voltage in our example is 170 Volts * 0.7 = 120 Volts.  Put another way, if power is specified as 120 Volts RMS, then the voltage is actually varying between +170 Volts and -170 Volts. In the remainder of this discussion, we will use "Volts" as a shorthand for "RMS Voltage".

The rate at which the voltage switches back and forth between its maximum and minimum values in alternating current is called its "frequency", and the unit of measurement is called "hertz" (Hz). In this illustration, the voltage switches back and forth 60 times per second, which is measured as 60 Hz.

So, in the US, the standard for power from a wall outlet is 120 volts, 60 Hz AC.  (Parenthetically, other countries have different standards. Australia uses 240 Volts, 50 Hz AC. Japan uses 100 Volts but some regions use 50 Hz AC while others use 60 Hz AC. For a full list, see [List of Worldwide AC Voltages and Frequencies](https://www.school-for-champions.com/science/ac_world_volt_freq_list.htm#.WuUwEdPwad0)). 

## Types of power quality problems

For the purposes of OPQ, power fails to achieve "perfect" quality when one or more of the three criteria listed above fails to hold. Here are examples of how each of the three criteria can fail to be satisfied:

* If the max/min voltage is significantly less than +170/-170, the result is a power quality problem known as a "voltage lag".
* If the voltage varies between its maximum and minimum values more than 60 times per second, the result is known as a "frequency surge".
* Various situations can result in the insertion of "harmonics" into the power line, or voltage sine waves that are multiples of 60 Hz. These various waves combine together to form a new wave that is a distortion of the desired sine wave. "Total Harmonic Distortion" is a measure of the level of distortion of the voltage sine wave due to this problem.

Power quality problems due to frequency fluctuations are fairly uncommon.  Most power quality problems are due to deviations in voltage.   For example, the PurePower company created an illustrated list of [ten common power quality problems](http://www.purepoweraps.com/gremlins.htm), nine of which involve voltage-related issues:

<img src="/docs/assets/intro/power-gremlins.png" width="500px">

[IEEE 1156](https://standards.ieee.org/develop/wg/1156.html) provides a complementary characterization of voltage-related power quality problems which emphasizes the duration of the deviation:  

<img src="/docs/assets/intro/voltage-dip.jpg" width="500px">

## Impact of power quality problems

Although characterizing how power can deviate from perfection is interesting, at the end of the day, we want to understand whether a given deviation is actually harmful or not.  

The [Information Technology Industry Council](http://www.itic.org/) has created a standard that specifies what kinds of power quality problems should be tolerated by electronic devices.  The latest version of this standard was published in 1999, and it defines what kinds of voltage fluctuations should be tolerated by electronic devices.  Basically, for very short periods of time, very large deviations from normal voltage should be tolerated, but as the length of time of the deviation increases, the amount of deviation that should be tolerated decreases: 

<img src="/docs/assets/intro/itic-curve.png" width="500px">

Note that this standard is simply a recommendation, and there is no requirement that electronic devices actually observe this tolerance to voltage deviations. 




