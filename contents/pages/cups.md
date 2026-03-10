---
title: "OpenPrinting CUPS"
permalink: /cups/
layout: single
header:
  overlay_color: "#616161"
  overlay_filter: "1"
excerpt: "The current standards-based, open source printing system for Linux® and other Unix®-like operating systems."
---

The current standards-based, open source printing system developed by [OpenPrinting](https://openprinting.github.io/) for Linux® and other Unix®-like operating systems. CUPS uses [IPP Everywhere™](https://www.pwg.org/ipp/everywhere.html) to support printing to local and network printers.

## Introduction

CUPS supports printing to:

- [AirPrint™](https://support.apple.com/en-us/HT201311) and [IPP Everywhere™](https://www.pwg.org/ipp/everywhere.html) printers,
- Network and local (USB) printers with Printer Applications, and
- Network and local (USB) printers with (legacy) PPD-based printer drivers.

CUPS provides the System V ("lp") and Berkeley ("lpr") command-line interfaces, a configurable web interface, a C API, and common print filters, drivers, and backends for printing. The [cups-filters](https://github.com/openprinting/cups-filters) project provides additional filters and drivers.

CUPS is licensed under the [Apache License Version 2.0](https://openprinting.github.io/cups/doc/license.html) with an exception to allow linking against GNU GPL2-only software.

## A Brief History of CUPS

CUPS was originally developed by [Michael R Sweet](https://www.msweet.org/) at Easy Software Products starting in 1997, with the first beta release on [May 14, 1999](https://web.archive.org/web/20000126074742/http://cups.org/news.html). Not long after, Till Kamppeter started packaging CUPS for Mandrake Linux and created the Foomatic drivers for CUPS, leading the adoption of CUPS for printing on Linux. Apple licensed CUPS for macOS in 2002, and in February 2007 Apple purchased CUPS and hired Michael to continue its development as an open source project.

In December 2019, Michael left Apple to start [Lakeside Robotics](https://www.lakesiderobotics.ca/). In September 2020 he teamed up with the OpenPrinting developers to fork Apple CUPS to continue its development. Today [Apple CUPS](https://github.com/apple/cups) is the version of CUPS that is provided with macOS® and iOS® while [OpenPrinting CUPS](https://github.com/OpenPrinting/cups) is the version of CUPS being further developed by OpenPrinting for all operating systems.

## Setting Up Printer Queues

CUPS includes a web-based administration tool that allows you to manage printers, classes, and jobs on your server. Open [http://localhost:631/admin/](http://localhost:631/admin/) in your browser to access the printer administration tools. You will be asked for the administration password (root or any other user in the "sys", "system", "root", "admin", or "lpadmin" group on your system) when performing any administrative function.

The `lpadmin` command is used to manage printers from the command-line. For example, the following command creates a print queue called "myprinter" for an IPP Everywhere printer at address "11.22.33.44":

```
lpadmin -p myprinter -E -v "ipp://11.22.33.44/ipp/print" -m everywhere
```

You can run the `lpinfo` command to list all of the available drivers (`lpinfo -m`) or printers (`lpinfo -v`).

## Printing Files

CUPS provides both the System V ("lp") and Berkeley ("lpr") commands for printing:

```
lp filename
lpr filename
```

Both the `lp` and `lpr` commands support printing options for the driver:

```
lp -o media=A4 -o resolution=600dpi filename
lpr -o media=A4 -o resolution=600dpi filename
```

CUPS recognizes many types of images files as well as PDF, PostScript, and text files, so you can print those files directly rather than through an application.

If you have an application that generates output specifically for your printer then you need to use the `-o raw` or `-l` options:

```
lp -o raw filename
lpr -l filename
```

This will prevent the filters from misinterpreting your print file.

## Documentation

### Getting Started

- [Command-Line Printer Administration](https://openprinting.github.io/cups/doc/admin.html)
- [Command-Line Printing and Options](https://openprinting.github.io/cups/doc/options.html)
- [Printer Applications and Printer Drivers](https://openprinting.github.io/cups/drivers.html)
- [Firewalls](https://openprinting.github.io/cups/doc/firewalls.html)
- [Glossary](https://openprinting.github.io/cups/doc/glossary.html)
- [Managing Encryption Policies](https://openprinting.github.io/cups/doc/encryption.html)
- [Managing Operation Policies](https://openprinting.github.io/cups/doc/policies.html)
- [Overview of CUPS](https://openprinting.github.io/cups/doc/overview.html)
- [Printer Accounting Basics](https://openprinting.github.io/cups/doc/accounting.html)
- [Printer Sharing](https://openprinting.github.io/cups/doc/sharing.html)
- [Release Notes](https://openprinting.github.io/cups/doc/relnotes.html)
- [Reporting Bugs](https://github.com/OpenPrinting/cups/issues)
- [Server Security](https://openprinting.github.io/cups/doc/security.html)

### Man Pages

- [cancel(1)](https://openprinting.github.io/cups/doc/man-cancel.html)
- [classes.conf(5)](https://openprinting.github.io/cups/doc/man-classes.conf.html)
- [client.conf(5)](https://openprinting.github.io/cups/doc/man-client.conf.html)
- [cups(1)](https://openprinting.github.io/cups/doc/man-cups.html)
- [cups-config(1)](https://openprinting.github.io/cups/doc/man-cups-config.html)
- [cups-files.conf(5)](https://openprinting.github.io/cups/doc/man-cups-files.conf.html)
- [cups-lpd(8)](https://openprinting.github.io/cups/doc/man-cups-lpd.html)
- [cups-snmp(8)](https://openprinting.github.io/cups/doc/man-cups-snmp.html)
- [cupsaccept(8)](https://openprinting.github.io/cups/doc/man-cupsaccept.html)
- [cupsctl(8)](https://openprinting.github.io/cups/doc/man-cupsctl.html)
- [cupsd(8)](https://openprinting.github.io/cups/doc/man-cupsd.html)
- [cupsd.conf(5)](https://openprinting.github.io/cups/doc/man-cupsd.conf.html)
- [cupsd-helper(8)](https://openprinting.github.io/cups/doc/man-cupsd-helper.html)
- [cupsd-logs(5)](https://openprinting.github.io/cups/doc/man-cupsd-logs.html)
- [cupsfilter(8)](https://openprinting.github.io/cups/doc/man-cupsfilter.html)
- [cupstestppd(1)](https://openprinting.github.io/cups/doc/man-cupstestppd.html)
- [ippeveprinter(1)](https://openprinting.github.io/cups/doc/man-ippeveprinter.html)
- [ippfind(1)](https://openprinting.github.io/cups/doc/man-ippfind.html)
- [ipptool(1)](https://openprinting.github.io/cups/doc/man-ipptool.html)
- [lp(1)](https://openprinting.github.io/cups/doc/man-lp.html)
- [lpadmin(8)](https://openprinting.github.io/cups/doc/man-lpadmin.html)
- [lpc(8)](https://openprinting.github.io/cups/doc/man-lpc.html)
- [lpinfo(8)](https://openprinting.github.io/cups/doc/man-lpinfo.html)
- [lpmove(8)](https://openprinting.github.io/cups/doc/man-lpmove.html)
- [lpoptions(1)](https://openprinting.github.io/cups/doc/man-lpoptions.html)
- [lpq(1)](https://openprinting.github.io/cups/doc/man-lpq.html)
- [lpr(1)](https://openprinting.github.io/cups/doc/man-lpr.html)
- [lprm(1)](https://openprinting.github.io/cups/doc/man-lprm.html)
- [lpstat(1)](https://openprinting.github.io/cups/doc/man-lpstat.html)
- [mime.convs(5)](https://openprinting.github.io/cups/doc/man-mime.convs.html)
- [mime.types(5)](https://openprinting.github.io/cups/doc/man-mime.types.html)
- [ppdc(1)](https://openprinting.github.io/cups/doc/man-ppdc.html)
- [ppdhtml(1)](https://openprinting.github.io/cups/doc/man-ppdhtml.html)
- [ppdi(1)](https://openprinting.github.io/cups/doc/man-ppdi.html)
- [ppdmerge(1)](https://openprinting.github.io/cups/doc/man-ppdmerge.html)
- [ppdpo(1)](https://openprinting.github.io/cups/doc/man-ppdpo.html)
- [printers.conf(5)](https://openprinting.github.io/cups/doc/man-printers.conf.html)
- [subscriptions.conf(5)](https://openprinting.github.io/cups/doc/man-subscriptions.conf.html)

### Programming

- [CUPS Programming Manual (HTML)](https://openprinting.github.io/cups/doc/cupspm.html)
- [CUPS Programming Manual (EPUB)](https://openprinting.github.io/cups/doc/cupspm.epub)
- [Administrative APIs](https://openprinting.github.io/cups/doc/api-admin.html)

### References

- [CUPS Design Description](https://openprinting.github.io/cups/doc/spec-design.html)
- [CUPS Implementation of IPP](https://openprinting.github.io/cups/doc/spec-ipp.html)
- [CUPS PPD Extensions](https://openprinting.github.io/cups/doc/spec-ppd.html)
- [CUPS Raster Format](https://openprinting.github.io/cups/doc/spec-raster.html)
- [CUPS Software Test Plan](https://openprinting.github.io/cups/doc/spec-stp.html)

### Additional Links

- [CUPS v3](https://openprinting.github.io/cups/cups3.html)
- [Mailing List](https://subspace.kernel.org/lists.linux.dev.html)
- [Report a Bug](https://github.com/openprinting/cups/issues/new)
- [Repository](https://github.com/openprinting/cups)
- [Wiki](https://github.com/openprinting/cups/wiki)
- [CUPS License](https://openprinting.github.io/cups/doc/license.html)
