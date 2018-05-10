---
title: Agile Power Monitoring for UH
---

## Abstract

To achieve net zero energy, the University of Hawaii must install significant solar generation on the Manoa campus while maintaining grid stability.  Achieving this requires data useful for creating models of the current UHM microgrid, which can then provide insight into the impact of future solar installation and other energy conservation measures (ECMs) on the UH grid.  To obtain this data, UHM is currently installing building-level energy meters that collect both consumption and power quality data. The utility grade meters costs approximately \$10,000 installed and are permanently attached to a building's main electrical feed. We propose to complement this effort with "agile" power quality monitoring:  our meters cost \$100, can be moved easily to different locations, and can assess PQ at any wall outlet location within a building, thus providing high resolution data regarding PQ effects on equipment and caused by equipment.  We believe that agile PQ monitoring will provide a complementary, cost-effective means for UHM to collect the data it needs to improve power quality, identify cause and effects, and fulfill its net zero energy mandate, not just during 2018, but for years to come.

## Project Description

The University of Hawaii system has a net zero power mandate that it is required to meet by 2035. In general, the net zero mandate requires UH to produce as much energy as it consumes each year.

To produce energy, the UH Office of Energy Management (OEM) recommends that UH consider installing up to 17 MW of solar generation on the UH Manoa campus. Unfortunately, installation of large amounts of solar generation can make it more difficult to maintain grid stability, which means (in part) maintaining stable and appropriate values for frequency, voltage, and total harmonic distortion (THD).  A "slightly" unstable grid in which frequency, voltage, and/or THD departs only occasionally and slightly from appropriate values has only "slight" impacts, such as the potential for reduced appliance life. As the grid becomes more unstable and values of frequency, voltage, and THD become more erratic, appliances can fail, and in the worst case, the grid itself must shut down. 

In addition to improving its energy generation capacity, UH is working toward net zero by reducing energy consumption through improved efficiency.  Examples of this approach include installing variable speed motors on HVAC units, more efficient lights, and Energy Star sub-zero freezers used in many research labs. Many of these efficiency technologies have more stringent requirements for power quality, and, ironically, some are even known to create power quality problems by pushing "noise" back into their circuits. 

To support either generation or efficiency initiatives, UH must develop a high quality understanding of its current electrical grid with respect to both consumption and power quality. To that end, OEM is installing building-level meters and using Blue Pillar software to collect and visualize the collected data.  These meters take approximately one year to procure and install, cost approximately $10,000 each, and are effectively "permanently" attached to a building's main electrical feed.

Building-level meters are an appropriate and crucial data collection capability. We propose to complement this capability with an "agile" approach to power quality monitoring, using Open Power Quality (http://openpowerquality.org) technology developed by Professor Philip Johnson and his students in the Collaborative Software Development Laboratory in the Department of Information and Computer Sciences.  OPQ technology is open source, inexpensive, quick to procure and install, easy to move from one location to another, and supports multiple monitoring points in a single building to provide more fine-grained insight into power quality. The following table compares and contrasts the approaches:

|  | OEM Meters | OPQ |
| - | - | - |
| Monitoring capability | Energy consumption and power quality | Power quality |
| Cost | $10,000/meter (installed)| $100/meter (installed) |
| Procurement | ~1 year | ~1 month |
| Installation | Fixed | Moveable |
| Connection type | Attached to building mains | Attached to any wall outlet |
| Communications | Wired Ethernet | WiFi |

We propose a series of pilot studies in partnership with OEM that support UH’s goal of net zero by 2035. These studies all require the manufacturing of 25 OPQ Boxes and the installation of OPQ Hub software on ITS servers. Once these initial steps are completed, we will deploy the OPQ Boxes across campus in different configurations for varying amounts of time, as summarized below:

1. We aim to improve HNEI’s grid stability modeling effort (DW) by providing more sources of power quality (PQ) data for integration into their model. We will work with HNEI to determine the best locations and durations for data collection.

2. We will assess the impact of HVAC systems on power quality and grid stability within and across campus. We will investigate whether HVAC systems affect the PQ of buildings in which they are installed. We will also investigate whether HVAC systems affect the PQ of neighboring buildings. Finally, we wish to assess whether multiple HVAC systems combine to create more PQ issues or perhaps even cancel each other out. 

3. We will install multiple OPQ Boxes within a single building to assess whether or not PQ varies according to location within a building, and perhaps determine if PQ issues propagate within a building. 

4. Using information about the electrical structure of the UH microgrid, we will assess how PQ issues relate to grid topology.  This study aims to understand if and how PQ events travel through the grid. For example, do PQ events travel downstream and/or through different connecting points of the microgrid?

5. We will verify that the meters being installed by the OEM are providing accurate measurements. We propose using data collected by our boxes to verify the function of each meter currently installed by OEM. This can help identify installation problems, such as the situation in which meters at Bachman Hall showed negative energy consumption. 

6. Provide a "lending library" of OPQ Boxes to OEM, HNEI, and other UH energy-related organizations that can be deployed anywhere on campus whenever the need for power quality monitoring arises. One example application is to check if newly installed electrical equipment affects the PQ of the building or surrounding areas. 

The results from these pilot studies will have impacts beyond the UHM campus. We can apply the lessons learned with UHM’s microgrid and renewable energy efforts to other microgrids and renewable energy efforts across Oahu and the neighbor islands. For the OPQ project itself, a successful Green Project award will significantly strengthen our ability to obtain funding from the state and local non-profits like Blue Planet Foundation and HEI Charitable Foundation. 

## Measurement and verification

If successful, this project will provide UHM with a power quality monitoring system that is: (a) accurate; and (b) able to provide useful information to UHM. 

To measure and verify accuracy, the Office of Energy Management (OEM) will provide us with access to data collected from their currently installed energy meters. These meters collect voltages, frequency, and THD values that we can use to measure and verify the accuracy of our meters and analysis mechanisms.

To measure and verify the ability of the system to provide useful information, we will work with OEM throughout the project period and provide them with a final report in Month 12 on the results of the pilot studies. OEM will be able to assess the project performance based on this data. 

