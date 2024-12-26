import logging

import scrapy
from scrapy import Selector
from scrapy import Request
from scrapy.http import HtmlResponse

from crawlers.items import PlayerItem

class PlayerInformationSpider(scrapy.Spider):
    name = 'player_information'
    allowed_domains = ['cpbl.com.tw']

    custom_settings = {
        # Field order
        'FEED_EXPORT_FIELDS': [
            'name',
            'player_unique_id',
            'number',
            't_b',
            'height',
            'weight',
            'born',
            'debut',
            'nationality',
            'draft_order',
            'position',
            'team',
        ]
    }

    def start_requests(self):
        logging.getLogger('scrapy').propagate = False
        logging.getLogger('protego').propagate = False
        input_file = "" # player_link.csv path here
        with open(input_file, mode='r') as file:
            for line in file:
                yield Request(url=line.strip())

    def parse(self, response: HtmlResponse):
        sel = Selector(response)
        player = PlayerItem()
        player['name'] = sel.css('#Content > div.ContHeader > div > div > dl > dt > div.name::text').extract()[0].lstrip('*◎#')
        player['player_unique_id'] = int(response.url[-10:])
        player['number'] = sel.css('#Content > div.ContHeader > div > div > dl > dt > div.name > span::text').extract()
        player['t_b'] = sel.css('#Content > div.ContHeader > div > div > dl > dd.b_t > div.desc::text').extract()
        player['height'] = sel.xpath('//*[@id="Content"]/div[3]/div/div/dl/dd[3]/div[2]/text()[1]').extract()
        player['weight'] = "".join( ele for ele in sel.xpath('//*[@id="Content"]/div[3]/div/div/dl/dd[3]/div[2]/text()[2]').extract()[0] if ele.isdigit())
        born = sel.css('#Content > div.ContHeader > div > div > dl > dd.born > div.desc::text').extract_first()
        player['born'] = None if born is None else born.replace('/', '-')
        debut = sel.css('#Content > div.ContHeader > div > div > dl > dd.debut > div.desc::text').extract_first()
        player['debut'] = None if debut is None else debut.replace('/', '-')
        player['nationality'] = sel.css('#Content > div.ContHeader > div > div > dl > dd.nationality > div.desc::text').extract()
        player['draft_order'] = sel.css('#Content > div.ContHeader > div > div > dl > dd.draft > div.desc::text').extract()
        player['position'] = sel.css('#Content > div.ContHeader > div > div > dl > dd.pos > div.desc::text').extract()
        player['team'] = sel.css('#Content > div.ContHeader > div > div > dl > dt > div.team::text').extract()
        yield player