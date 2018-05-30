---
title: OPQ Box Software Design
sidebar_label: Software Design
---

## The OPQ Box software stack

OPQ Box uses a mix of software written in python and C/C++. There are three
main portions to the OPQBox software:

* DSP Firmware
* Kernel Driver
* Readout Software

### DSP Firmware

DSP firmware drives the STM32F373 ARM core located on the main OPQBox PCB. The DSP software is responsible for bringing up the ARM core, setting up the clocks and timers, and configuring the on board 16bit Sigma-Delta ADC. During the normal operation, the ADC is driven by the internal timer, to minimize the timing jitter. After every conversion an interrupt notifies the ARM core that the conversion is complete and the conversion result is stored in the ping-pong buffer. Once the buffer is full with 200 samples, the ARM core signals the Raspberry PI that another grid cycle is ready for readout. Finally, with the Raspberry PI acting as a master device, the ARM core transmits the cycle worth of raw data over SPI. DSP firmware is built using gcc arm, and thus can be compiled on the host Raspberry PI buffer. Furthermore, the UART bootloader on the STM32F373 allows the Pi to flash the new version of the dsp firmware to the device in-situ.

### Kernel Driver

The opq kernel module resides on the Raspberry Pi and is responsible for communicating with the DSP. Userland driver *spidev* combined with the userland interrupt handler proved too slow for our purposes. In order to cope with the data rate required by our application we developed a kernel driver which handles the DMA transfer of raw data from the DSP Firmware, into main memory. The driver is asynchronous to the readout software. Regardless of whether a userland application is requesting data or not, every time a new grid cycle is available, it will be transfered from the DSP. Internally the driver maintains a ring buffer of 60 cycles, in order to alleviate the timing requirements on the userland software. Once a data ready interrupt is received from the DSP opq driver sets up a dma transfer into the next available ringbuffer page. Userland access to the kernel driver is provided via */dev/opq0* character device handle. Each *read(2)* system call will transfer exatly one grid cycle of data into the user provided buffer. The *read(2)* system call will block until the next cycle becomes available. The structure of the user buffer is as follows:

```
    int16_t data[200];
    uint16_t last_gps_counter;
    uint16_t current_counter;
	uint32_t flags;
```

As evident in the layout above the first 400 bytes are signed 16 bit ADC samples. These are followed by the two optional GPS timestamps, and a 32 bit reserved field. While the kernel driver has some capacity for buffering data internally, it is still advisable to read out cycles via a dedicated thread, and perform analytics, while that thread is blocking on the *read(2)* call.
 
### Readout Software

Readout software is the userland component of the readout stack. It is responsible for transferring the data from the kernel driver, performing analytics and communicating with the cloud services. The readout software is currently undergoing a rewrite, and documentation for the new version will be available soon.

## Installation 

(How to configure the development environment to support development of the OPQ Box software stack.)

## Deployment to a box

(How to create an image and install it on a box.)
