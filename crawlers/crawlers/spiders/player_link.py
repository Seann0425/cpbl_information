import scrapy
from urllib.parse import urljoin


class PlayerLinkSpider(scrapy.Spider):
    name = "player_link"
    allowed_domains = ["cpbl.com.tw"]
    start_urls = ["https://cpbl.com.tw/player"]

    def parse(self, response):
        sel = scrapy.Selector(response)
        player_list = []
        for i in range(4, 10):
            player_list.append(sel.css(f'#Content > div:nth-child({i}) > dl > dd'))
        for list in player_list:
            for player in list:
                yield {
                    'player_link': urljoin('https://cpbl.com.tw', player.css('a::attr(href)').extract_first()),
                }