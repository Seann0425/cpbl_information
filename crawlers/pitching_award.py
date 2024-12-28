import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
import time
# 初始化瀏覽器
browser = webdriver.Chrome()
browser.get("https://www.cpbl.com.tw/stats/yearaward")  # 替換為實際網址

# 找到下拉選單並選擇
dropdown = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.ID, "Award"))
)
select = Select(dropdown)
select.select_by_index(1)  # 選擇第二個選項

# 點擊按鈕
button = WebDriverWait(browser, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@id="MainForm"]/div[1]/div/div[2]/input'))
)
button.click()
time.sleep(3)
# 等待所有 <tr> 元素加載完成
WebDriverWait(browser, 10).until(
    EC.presence_of_all_elements_located((By.XPATH, "//tr"))
)

# 定義 CSV 的列名
columns = [
    "Year",
    "most_hits_player_id",
    "highest_batting_average_player_id",
    "most_RBI_player_id",
    "most_stolen_bases_player_id",
    "homerun_leader_player_id",
]
# 修正版本
with open("output.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=columns)
    writer.writeheader()  # 寫入列名

    index = 1  # 行索引
    while True:
        try:
            # 重新抓取所有行
            rows = browser.find_elements(By.XPATH, "//tr")

            # 如果索引超過行數，退出循環
            if index >= len(rows):
                break

            # 抓取單行
            row = rows[index]

            # 提取年份
            year_element = row.find_elements(By.XPATH, ".//td[contains(@class, 'num')]")
            year = year_element[0].text if year_element else "N/A"

            # 提取所有 stats_player 的 <a> 元素
            raw_players = row.find_elements(By.XPATH, ".//td[contains(@class, 'player')]")
            players = []

            for raw_player in raw_players:
                try:
                    href = raw_player.find_element(By.XPATH, ".//span[@class='name']//a").get_attribute("href")
                    if href:
                        if href and href.startswith("https") and "=" in href:
                            players.append(href.split('=')[-1][-4:])
                    else:
                        players.append("Null")
                except:
                    players.append("Null")

            # 構造數據字典
            data = {
                "Year": year,
                "most_hits_player_id": players[0] if len(players) > 0 else "Null",
                "highest_batting_average_player_id": players[1] if len(players) > 1 else "Null",
                "most_RBI_player_id": players[2] if len(players) > 2 else "Null",
                "most_Stolen_bases_player_id": players[3] if len(players) > 3 else "Null",
                "homerun_leader_player_id": players[4] if len(players) > 4 else "Null",
            }

            # 寫入數據
            writer.writerow(data)

            index += 1  # 處理下一行

        except Exception as e:
            print(f"Error processing row {index}: {e}")
            index += 1  # 跳過該行並處理下一行

print("數據已成功保存到 output.csv")
browser.quit()
