# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class PlayerItem(scrapy.Item):
    name = scrapy.Field() # varchar(50)
    player_unique_id = scrapy.Field() # int
    number = scrapy.Field() # int
    t_b = scrapy.Field() # throw and bat, varchar(50)
    height = scrapy.Field() # int
    weight = scrapy.Field() # int
    born = scrapy.Field() # date
    debut = scrapy.Field() # date
    nationality = scrapy.Field() # varchar(50)
    draft_order = scrapy.Field() # varchar(50)
    position = scrapy.Field() # varchar(50)

