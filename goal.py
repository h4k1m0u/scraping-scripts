#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Get football(soccer) news from goal.com
# using lxml & requests python modules,
# and send them by email using ssmtp
# to recipient given as cmdline arg.
# author h4k1m

from lxml import html
from datetime import datetime
import requests
import sys
import socket
import os

# get email recipient (cmdline arg) & sender (hostname)
if len(sys.argv) == 1:
    print 'Please give recipient of the email!'
    exit()
sender = socket.gethostname()
recipient = sys.argv[1]

# get breaking news from goal.com
page = requests.get('http://www.goal.com/de/module/breaking-news/content')
tree = html.fromstring(page.text)
times = tree.xpath('//time/text()')
titles = tree.xpath('//span[@class="title"]/text()')

# fill email file header
email_file = '/home/hakim/Code/Python/scraping-scripts/email.txt'
f = open(email_file, 'w')
f.write('To: %s\n' % recipient)
f.write('From: %s\n' % sender)
f.write('Subject: Goal.com Breaking-news [%s]\n\n' % datetime.now().strftime("%Y-%m-%d %H:%M"))

# write news to file
for (time, title) in zip(times, titles):
    f.write("- %s: %s.\n" % (time.encode('utf8'), title.encode('utf8')))
f.close()

# send news file by email
os.system('/usr/local/sbin/ssmtp %s < %s' % (recipient, email_file))
print 'Goal.com Breaking-news have been sent'
