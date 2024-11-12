import logging

import scrapy
from scrapy import Selector
from urllib.parse import urljoin
from scrapy.http import HtmlResponse


class PlayerLinkSpider(scrapy.Spider):
    name = "player_link"
    allowed_domains = ["cpbl.com.tw"]
    
    def start_requests(self):
        logging.getLogger('scrapy').propagate = False
        logging.getLogger('protego').propagate = False
        for i in range(1, 7500):
            yield scrapy.Request(url=f'https://cpbl.com.tw/team/person?acnt=000000{i:04}')

    def parse(self, response: HtmlResponse):
        # some of the links might be 'https://cpbl.com.tw/'
        # write some program to filter out those links
        if response.status == 200:
            return {'player_link': response.url}