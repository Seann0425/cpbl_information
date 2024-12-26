import csv
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import random


columns = [
    "game_status",
    "game_date",
    "home_team",
    "away_team",
    "home_score",
    "away_score",
    "game_id",
    "HP",
    "B1",
    "B2",
    "B3",
    "time",
    "audience"
]

chrome_options = Options()
chrome_options.add_argument("--headless")  
chrome_options.add_argument("start-maximized")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36")

def wait_for_page_load(browser):
    try:
        WebDriverWait(browser, 60).until(
            lambda driver: browser.execute_script("return document.readyState") == "complete"
        )
        print("Page loaded successfully.")
    except Exception:
        print("Page did not load completely. Proceeding with caution.")

def safe_get_text_with_retry(browser, xpath, description, url, retries=5):
    for attempt in range(retries):
        try:
            element = WebDriverWait(browser, 30).until(
                EC.element_to_be_clickable((By.XPATH, xpath))
            )
            return element.text
        except Exception as e:
            print(f"Attempt {attempt + 1} to find {description} failed. Retrying...")
            time.sleep(2)  
            browser.get(url)  
            wait_for_page_load(browser)
    print(f"Could not find {description} after {retries} attempts. Setting it to Null.")
    return "Null"

with open("output.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=columns)
    writer.writeheader()  

    for year in range(2008, 2025):
        for type in range(ord('G'), ord('H') + 1):
            for game_id in range(1, 400):
                browser = webdriver.Chrome(options=chrome_options)

                try:
                    url = f"https://www.cpbl.com.tw/box/index?gameSno={game_id}&year={year}&kindCode={chr(type)}"
                    print(f"Processing URL: {url}")
                    browser.get(url)

                    wait_for_page_load(browser)

                    date = safe_get_text_with_retry(browser, ".//div[@class='date']", "game date", url)

                    if date != "0001/01/01":
                        game_status = safe_get_text_with_retry(browser, 
                                    "//li[contains(@class, 'actived')]//div[contains(@class,'tag game_status') or contains(@class,'tag game_note')]//span", "game_status", url)
                        
                        if game_status == "取消比賽":
                            game_status = 0
                            awayteam = safe_get_text_with_retry(browser, "//li[contains(@class, 'actived')]//div[@class='team away']//span", "away team", url)
                            hometeam = safe_get_text_with_retry(browser, "//li[contains(@class, 'actived')]//div[@class='team home']//span", "home team", url)
                            homescore = "NULL"
                            awayscore = "NULL"

                            type_number = ord(chr(type)) - ord('A') + 1
                            game_number = int(f"{year}{type_number:02d}{game_id:03d}")

                            hp = "NULL"
                            B1 = "NULL"
                            B2 = "NULL"
                            B3 = "NULL"
                            game_time = "NULL"
                            audience = "NULL"
                        else:    
                            game_status = 1
                            awayteam = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[3]/div[2]/div[2]/div/div[3]/div[1]/a", "away team", url)
                            hometeam = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[3]/div[2]/div[2]/div/div[5]/div[1]/a", "home team", url)
                            homescore = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[3]/div[2]/div[2]/div/div[5]/div[2]", "home score", url)
                            awayscore = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[3]/div[2]/div[2]/div/div[3]/div[2]", "away score", url)

                            type_number = ord(chr(type)) - ord('A') + 1
                            game_number = int(f"{year}{type_number:02d}{game_id:03d}")

                            hp = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[7]/ul/li[1]", "HP", url)
                            B1 = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[7]/ul/li[2]", "B1", url)
                            B2 = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[7]/ul/li[3]", "B2", url)
                            B3 = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[7]/ul/li[4]", "B3", url)
                            game_time = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[9]/ul/li[1]", "time", url)
                            audience = safe_get_text_with_retry(browser, "//*[@id='MainForm']/div[9]/ul/li[2]", "audience", url)

                        writer.writerow({
                            "game_status": game_status,
                            "game_date": date,
                            "home_team": hometeam,
                            "away_team": awayteam,
                            "home_score": homescore,
                            "away_score": awayscore,
                            "game_id": game_number,
                            "HP": hp,
                            "B1": B1,
                            "B2": B2,
                            "B3": B3,
                            "time": game_time,
                            "audience": audience
                        })

                        print(f"{date},{awayteam},{hometeam},{homescore},{awayscore},{game_number},{hp},{B1},{B2},{B3},{game_time},{audience},{game_status}")
                    else:
                        break

                except Exception as e:
                    print(f"Error processing game ID {game_id} in year {year}: {e}")
                finally:
                    browser.quit()

                time.sleep(random.uniform(1, 3))
