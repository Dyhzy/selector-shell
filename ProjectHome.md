# Selector Shell #

_Creates a browser "shell" to test what CSS selectors become._

Author: `Lindsey Simon <elsigh@google.com>`

## Introduction ##

The Selector Shell is a browser-based tool for testing what CSS
becomes in different browsers.
It works by taking some raw text, inserting a dynamic STYLE element
into the HEAD with that raw text as its content, and then reading the
CSSOM to see what the browser has parsed it into. It is written in
Javascript.

## Getting the code ##

View the trunk at:

> http://selector-shell.googlecode.com/svn/trunk/

## Using ##

This was developed as a Google App Engine application.
Locally, run the dev\_appserver.py against the selector-shell directory.
Externally, you can use http://selector-shell.appspot.com/

## Bugs, Patches ##

Patches and bug reports are very welcome, just please keep the style
consistent with the original source.

## Contributors ##

Thanks to the Erik Arvidsson for his original code review of parts of the
relevant code here, as well as the UX Webdev team at Google for aid in testing.