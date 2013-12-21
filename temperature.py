#!/usr/bin/python
# Get temperature in the country given as argument
# from http://openweathermap.org
# author: h4k1m
import urllib2
import json
import sys

country = sys.argv[1]

fp = urllib2.urlopen('http://api.openweathermap.org/data/2.5/weather?units=metric&mode=json&q=' + country)
data = json.load(fp)
print "Temperature in %s: %d" % (country, data['main']['temp'])

fp.close()
