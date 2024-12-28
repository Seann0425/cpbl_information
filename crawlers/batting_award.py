import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 初始化瀏覽器
browser = webdriver.Chrome()
browser.get("https://www.cpbl.com.tw/stats/yearaward")

# 等待所有 <tr> 加載完成
rows = WebDriverWait(browser, 10).until(
    EC.presence_of_all_elements_located((By.XPATH, "//tr"))
)

# 定義列名
columns = [
    "Year",
    "most_hits_player_id",
    "highest_batting_average_player_id",
    "most_RBI_player_id",
    "most_Stolen_bases_player_id",
    "homerun_leader_player_id",
]

# 打開 CSV 文件並使用 DictWriter
with open("output.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=columns)
    writer.writeheader()  # 寫入列名

    # 遍歷每行，跳過第一行
    for index, row in enumerate(rows):
        if index == 0:  # 跳過標題行
            continue

        # 提取數據
        try:
            year = row.find_element(By.XPATH, ".//td[@class='num sticky']").text
            players = row.find_elements(By.XPATH, ".//td[@class='stats_player']//a")

            # 提取基數索引的 href
            def extract_href_at_odd_index(players_list, index):
                if index < len(players_list):
                    href = players_list[index].get_attribute("href")
                    if href and href.startswith("https") and "=" in href:
                        return href.split('=')[-1][-4:]  # 提取最後四位數字
                return "N/A"

            # 构造數據字典，僅記錄基數索引的玩家
            data = {
                "Year": year,
                "most_hits_player_id": extract_href_at_odd_index(players, 1),  # 第一位玩家（索引 0）
                "highest_batting_average_player_id": extract_href_at_odd_index(players, 3),  # 第三位玩家（索引 2）
                "most_RBI_player_id": extract_href_at_odd_index(players, 5),  # 第五位玩家（索引 4）
                "most_Stolen_bases_player_id": extract_href_at_odd_index(players, 7),  # 第七位玩家（索引 6）
                "homerun_leader_player_id": extract_href_at_odd_index(players, 9),  # 第九位玩家（索引 8）
            }

            # 寫入數據
            writer.writerow(data)

        except Exception as e:
            print(f"Error processing row {index}: {e}")

print("數據已成功保存到 output.csv")
browser.quit()
