---
title: OPQ Information Architecture
sidebar_label: OPQ Information Architecture
---

OPQ's "information architecture" is designed to facilitate the process of generating actionable, useful insights into the nature of the electrical grid starting with the data collected from a wall outlet. It is a five layer architecture, currently under development, in which data in the form of *Measurements* collected by an OPQ Box can eventually yield insights in the form of *Phenomena*.  The following table provides an overview of the five layers from lowest level (Box) to highest level (Phenomena):

| Layer | TTL |  Purpose |
| ------| --- |  ------- |
| Box | 1 hour | Collects and holds a rolling window of power data (frequency, voltage, THD, transients) from a single location. Box data is lost after one hour. |
| Measurement | 1 day | Low fidelity summaries of Box data for a given location pushed to OPQ Cloud each second. Measurements give OPQ Cloud basic situational awareness of the overall grid. Measurements exist for one day, though a daily summary of Measurement data called "Trends" persists indefinitely.  |
| Event    | 1 month | When OPQ Cloud's Makai service detects non-nominal values in the stream of Measurements, it can decide to request high fidelity (i.e. wave form) data from one or more boxes. Note that Makai only has 1 hour to request high fidelity wave form data, since after 1 hour it will no longer be available in the Box.   |
| Incident | 6 months | Not every non-nominal power data value is significant.  Over the years, electrical engineers have developed a variety of standards (IEEE 1159, ITIC, SEMA, etc.) for characterizing significant power quality events.  OPQ Cloud's Mauka service provides classification algorithms to analyze each Event to see if it satisfies any of the standards for significance. If so, an Incident is created, indicating that a significant PQ event has occurred at a specific time in a specific location.   |
| Phenomena  | 1 year | All of the prior levels represent behaviors of a individual Boxes in a single location at a given point in time.  For OPQ to provide insightful, actionable information, it must |
