#!/usr/bin/python
# Get football(soccer) news from goal.com
# using lxml & requests python modules
# author h4k1m

from lxml import html
import requests

page = requests.get('http://www.goal.com/en/module/breaking-news/content')
tree = html.fromstring(page.text)
times = tree.xpath('//time/text()')
titles = tree.xpath('//span[@class="title"]/text()')

for (time, title) in zip(times, titles):
    print "- %s: %s." % (time, title)
