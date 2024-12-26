# cpbl_information
Final Project of DBMS

* crawlers/crawlers/spiders/ 内的蜘蛛透過scrapy runspider來運行
* playwright使用playwright install chromium做web自動化

## 更新：
1. games_deatails.html -> game_details.html (檔名改了）
2. score 的相關功能即和版面，包含不同隊伍圖片的顯示
3. Player、Game的insert完成
4. Player、winnerlist的update完成
5. predict ops+計算完成


### 已完成:
Player / Winlist / Delete / Score /Predict / Update

### 等待對接: （ route_test.py 成功 但 route.py 還沒試）
player顯示(預計根據隊伍顯示)

### 未完成:
player顯示(預計根據隊伍顯示)

# 前端
.css .js放在 static 裡
.html (網頁）放在 templates

# 後端
route.py / app.py / model.py / run.py / requirements.txt 是最主要的後端程式
route_test是曾另外編輯的 是為了測試特定功能而架的後端 僅有特地功能
