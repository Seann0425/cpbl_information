import csv
import time
import random
from playwright.sync_api import sync_playwright

output_path = ""
input_path = "" # player_information.csv here

# initialize CSV file and writer header
with open(output_path, mode="w", newline="", encoding="utf-8") as output_file:
    writer = csv.writer(output_file)
    writer.writerow(["year", "opponent", "player", "PA", "AB", "RBI", "Hits", "2B", "3B", "HR", "Bases", "BB", "IBB", "DB", "K"])
    
with open(input_path, mode="r", encoding="utf-8") as file:
    reader = csv.reader(file)
    next(reader) # skip header
    for (row_number, row) in enumerate(reader):
        if row_number < 1040 or row_number > 1170: # skip rows that have been processed
            continue
        if row[10] == "投手":
            continue
        
        # initialize data storage structure
        data = {}
        
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            url = f"https://cpbl.com.tw/team/fighting?Acnt=000000{int(row[1]):04d}"
            page.goto(url)
            
            # wait for season selector
            page.wait_for_selector("xpath=//*[@id='bindVue']/div[1]/div/div[1]/select")
            season_options = page.locator("xpath=//*[@id='bindVue']/div[1]/div/div[1]/select/option").all()
            
            for (season_idx, season) in enumerate(season_options):
                # choose season
                current_season = season.inner_text()
                page.select_option("xpath=//*[@id='bindVue']/div[1]/div/div[1]/select", label=current_season)
                page.wait_for_timeout(500)
                
                # wait for year selector
                page.wait_for_selector("xpath=//*[@id='bindVue']/div[1]/div/div[2]/select")
                year_options = page.locator("xpath=//*[@id='bindVue']/div[1]/div/div[2]/select/option").all()
                
                for (year_idx, year) in enumerate(year_options):
                    if year_idx == 0:
                        continue # skip "年度纍計"
                
                    # choose year
                    current_year = year.inner_text()
                    page.select_option("xpath=//*[@id='bindVue']/div[1]/div/div[2]/select", label=current_year)
                    page.wait_for_timeout(500)
                    
                    # initialize year data structure
                    if current_year not in data:
                        data[current_year] = {}
                    
                    # wait for team selector
                    page.wait_for_selector("xpath=//*[@id='bindVue']/div[1]/div/div[3]/select")
                    team_options = page.locator("xpath=//*[@id='bindVue']/div[1]/div/div[3]/select/option").all()
                    
                    for (team_idx, team) in enumerate(team_options):
                        if team_idx == 0:
                            continue # skip "請選擇球隊"
                        team_name = team.inner_text()
                        page.select_option("xpath=//*[@id='bindVue']/div[1]/div/div[3]/select", label=team_name)
                        page.wait_for_timeout(500)
                        
                        # click search button
                        page.wait_for_selector("xpath=//*[@id='bindVue']/div[1]/div/div[5]/input")
                        page.click("xpath=//*[@id='bindVue']/div[1]/div/div[5]/input")
                        
                        # wait for page to load
                        page.wait_for_timeout(500)
                        
                        # get player data
                        page.wait_for_selector("xpath=//*[@id='bindVue']/div[2]/div[3]/div/table/tbody/tr")
                        players = page.locator("xpath=//*[@id='bindVue']/div[2]/div[3]/div/table/tbody/tr").all()
                        for (i, player) in enumerate(players):
                            if i == 0:
                                continue # skip header
                            opponent = player.locator("xpath=//span[@class='name']//a").get_attribute("href").split('=')[-1][-4:]
                            PA = player.locator("xpath=//td[2]").inner_text()
                            AB = player.locator("xpath=//td[3]").inner_text()
                            RBI = player.locator("xpath=//td[4]").inner_text()
                            hits = player.locator("xpath=//td[5]").inner_text()
                            two_base = player.locator("xpath=//td[6]").inner_text()
                            three_base = player.locator("xpath=//td[7]").inner_text()
                            home_run = player.locator("xpath=//td[8]").inner_text()
                            bases = player.locator("xpath=//td[9]").inner_text()
                            BB = player.locator("xpath=//td[11]").inner_text()
                            IBB = player.locator("xpath=//td[12]").inner_text().strip("（）")
                            DB = player.locator("xpath=//td[13]").inner_text()
                            K = player.locator("xpath=//td[14]").inner_text()
                            
                            if opponent not in data[current_year]:
                                data[current_year][opponent] = {
                                    "PA": int(PA),
                                    "AB": int(AB),
                                    "RBI": int(RBI),
                                    "hits": int(hits),
                                    "two_base": int(two_base),
                                    "three_base": int(three_base),
                                    "home_run": int(home_run),
                                    "bases": int(bases),
                                    "BB": int(BB),
                                    "IBB": int(IBB),
                                    "DB": int(DB),
                                    "K": int(K)
                                }
                            else:
                                existing_data = data[current_year][opponent]
                                existing_data["PA"] += int(PA)
                                existing_data["AB"] += int(AB)
                                existing_data["RBI"] += int(RBI)
                                existing_data["hits"] += int(hits)
                                existing_data["two_base"] += int(two_base)
                                existing_data["three_base"] += int(three_base)
                                existing_data["home_run"] += int(home_run)
                                existing_data["bases"] += int(bases)
                                existing_data["BB"] += int(BB)
                                existing_data["IBB"] += int(IBB)
                                existing_data["DB"] += int(DB)
                                existing_data["K"] += int(K)
                        
                        page.wait_for_timeout(random.uniform(1000, 3000)) # simulate user behavior delay
                        
            browser.close()
        
        # write data to CSV file
        with open(output_path, mode="a", newline="", encoding="utf-8") as output_file:
            writer = csv.writer(output_file)
            for year in data:
                for opponent in data[year]:
                    stats = data[year][opponent]
                    db_value = (stats["hits"] + stats["BB"]) / stats["PA"] if stats["PA"] > 0 else 0
                    k_value = stats["hits"] / stats["AB"] if stats["AB"] > 0 else 0
                    writer.writerow(
                        [year, opponent, row[1]]
                        + list(stats.values())
                        + [round(db_value, 3), round(k_value, 3)]
                    )
        print(f"Row {row_number} done.")