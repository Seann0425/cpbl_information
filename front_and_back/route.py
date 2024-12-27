from model import Player,Games,WinnerList,match_results,LeagueStats
from datetime import datetime
from flask import Flask, render_template, jsonify, request
from sqlalchemy import func

TEAM_LOGOS = {
    # "隊名" : "連結"
    "兄弟": "/static/picture_repository/brotherelephant.jpg",
    "兄弟二軍": "/static/picture_repository/brotherelephant.jpg",
    "中信": "/static/picture_repository/whale.jpg",
    "中信二軍": "/static/picture_repository/whale.jpg",
    "三商": "/static/picture_repository/tiger.png",
    "統一7-ELEVEn獅": "/static/picture_repository/team_logo_lions_500x500.png",
    "統一7-ELEVEn獅二軍": "/static/picture_repository/team_logo_lions_500x500.png",
    "味全龍": "/static/picture_repository/dragon.png",
    "味全龍二軍": "/static/picture_repository/dragon.png",   
    "俊國": "/static/picture_repository/bear.png", 
    "時報": "/static/picture_repository/eagle.jpg",
    "興農": "/static/picture_repository/ox.png", 
    "興農二軍": "/static/picture_repository/ox.png",   
    "第一": "/static/picture_repository/kingkon.jpg",  
    "誠泰": "/static/picture_repository/snake.png",  
    "Lamigo": "/static/picture_repository/Lamigo.jpg",  
    "Lamigo二軍": "/static/picture_repository/Lamigo.jpg",
    "米迪亞": "/static/picture_repository/Dmedia.jpg",
    "義大": "/static/picture_repository/rhino.jpg",
    "義大二軍": "/static/picture_repository/rhino.jpg",
    "中信兄弟": "/static/picture_repository/brother.png",
    "中信兄弟二軍": "/static/picture_repository/brother.png",   
    "富邦悍將": "/static/picture_repository/Fubon_Guardians.png",
    "富邦悍將二軍": "/static/picture_repository/Fubon_Guardians.png",         
    "樂天桃猿": "/static/picture_repository/Rakuten_Monkeys.png",
    "樂天桃猿二軍": "/static/picture_repository/Rakuten_Monkeys.png",  
    "台鋼雄鷹": "/static/picture_repository/TsgHawks.png",
    "台鋼雄鷹二軍": "/static/picture_repository/TsgHawks.png"
    # 添加更多團隊和對應的圖標路徑
}

def register_routes(app,db):
    #主頁連結
    @app.route('/')
    def home():
        return render_template('index.html')

    @app.route('/allPlayers')
    def allPlayers():
        return render_template('allPlayers.html')  
    
    #球賽紀錄
    @app.route('/score')
    def score():
        return render_template('score.html')

    #歷年年度獎項讀主
    @app.route('/winnerlist')
    def winnerlist():
        return render_template('winnerList.html')
     

    #插入球員頁面
    @app.route('/insertplayer')
    def insertplayer():
        return render_template('insertPlayer.html')

    #插入比賽頁面
    @app.route('/insertgame')
    def insertgame():
        return render_template('insertGame.html')
    
    #球賽詳細資訊
    @app.route('/getgamedetail')
    def getgamedetail():
        return render_template('games_deatails.html')

    #個別球員詳細資料
    @app.route('/player')
    def player():
        return render_template('player.html')

    #預測功能
    @app.route('/predict')
    def predict():
        return render_template('predict.html')
    
    #更新球員資料庫
    @app.route('/updateplayer')
    def updateplayer():
        return render_template('updatePlayer.html')

    #更新年度獎項資料庫
    @app.route('/updatewinnerlist')
    def updatewinnerlist():
        return render_template('updateWinnerList.html')
    
    #刪除資料庫
    @app.route('/delete')
    def delete():
        return render_template('delete.html')

    #取得特定年分的年度獎項名單
    @app.route('/winnerlist/searchyear', methods=['GET'])
    def get_winner_list():
        # 從查詢參數中獲取年份
        year = request.args.get('years')
        
        # 檢查是否提供年份
        if not year:
            return jsonify({"error": "Year parameter is required"}), 400
        try:
            # 查詢年份的資料
            
            winner = WinnerList.query.filter_by(years=int(year)).first()
            # 檢查是否找到資料
            if not winner:
                print("error1\n")
                return jsonify({"error": f"No winners found for the year {year}"}), 404

            # 將查詢結果轉為字典格式返回
            result =[{
                "years": winner.years,
                "most_hits_player_id": winner.most_hits_player_id,
                "highest_batting_average_player_id": winner.highest_batting_average_player_id,
                "most_RBI_player_id": winner.most_RBI_player_id,
                "most_stolen_bases_player_id": winner.most_stolen_bases_player_id,
                "homerun_leader_player_id": winner.homerun_leader_player_id,
                "most_wins_player_id": winner.most_wins_player_id,
                "strikeout_leader_player_id": winner.strikeout_leader_player_id,
                "lowest_ERA_player_id": winner.lowest_ERA_player_id,
                "most_saves_player_id": winner.most_saves_player_id,
                "most_holds_player_id": winner.most_holds_player_id
            }]
            return jsonify(result)

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # API：取得球員詳細資料
    @app.route('/players/searchplayer', methods=['GET'])
    def get_player():
        # 從請求中獲取 player_unique_id 參數
        player_unique_id = request.args.get('player_unique_id')

        # 檢查是否提供 player_unique_id
        if not player_unique_id:
            return jsonify({"error": "Player unique ID is required"}), 400

        try:
            # 查詢資料庫中的球員資訊
            player = Player.query.filter_by(player_unique_id=int(player_unique_id)).first()

                # 如果未找到球員，返回錯誤訊息
            if not player:
                return jsonify({"message": "Player not found"}), 404

            # 將 ORM 對象轉換為字典格式返回
            result2 = [{
                    "player_name": player.name,
                    "player_unique_id": player.player_unique_id,
                    "number": player.number,
                    "t_b": player.t_b,
                    "height": player.height,
                    "weight": player.weight,
                    "born": player.born,
                    "debut": player.debut,
                    "nationality": player.nationality,
                    "draft_order": player.draft_order,
                    "position": player.position,
                    "team": player.team
            }]
            return jsonify(result2)

        except ValueError:
            return jsonify({"error": "Invalid player unique ID format"}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    #回傳所有球員的id和名字
    @app.route('/player/getallplayer', methods=['GET'])
    def get_all_players():
        try:
            players = Player.query.all()
            if not players:
                return jsonify({"message": "No players found"}), 404

            # 將 ORM 對象轉換為 JSON
            result = [
                {
                    "player_name": player.name,
                    "player_unique_id": player.player_unique_id,
                    "team":player.team
                }
                for player in players
            ]
            return jsonify(result)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    #用日期取得在該日期的所有球賽資訊
    @app.route('/games', methods=['GET'])
    def get_games_by_date():
        # 從請求中獲取 game_date 查詢參數
        game_date = request.args.get('game_date')

        # 驗證 game_date 是否存在
        if not game_date:
            return jsonify({"error": "game_date is required"}), 400

        try:
            print(game_date)
            # 查詢資料庫中符合 game_date 的比賽
            games = Games.query.filter_by(game_date=game_date).all()
            # 如果沒有找到比賽，返回提示訊息
            if not games:
                return jsonify({"message": f"No games found for the date {game_date}"}), 404

            # 將比賽數據轉為 JSON 格式返回
            results = []
            for game in games:
                results.append({
                    "game_date": game.game_date,
                    "home_team": game.home_team,
                    "away_team": game.away_team,
                    "home_score": game.home_score,
                    "away_score": game.away_score,
                    "game_number": game.game_number,
                    "hp": game.hp,
                    "first_base": game.first_base,
                    "second_base": game.second_base,
                    "third_base": game.third_base,
                    "audience": game.audience,
                    "game_time": game.game_time,
                    "game_status": game.game_status,
                    "home_team_logo": TEAM_LOGOS.get(game.home_team, "/static/picture_repository/baseball.jpg"),
                    "away_team_logo": TEAM_LOGOS.get(game.away_team, "/static/picture_repository/baseball.jpg")
                })

            return jsonify(results)

        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    #回傳最近三場的比賽資料
    @app.route('/latest-games', methods=['GET'])
    def get_latest_games():
        # 默認限制返回3場比賽
        limit = int(request.args.get('limit', 3))
        
        try:
            # 按日期降序排列並限制比賽數量
            games = Games.query.order_by(Games.game_date.desc()).limit(limit).all()

            if not games:
                return jsonify({"message": "No games found"}), 404

            # 將比賽數據轉為 JSON 格式返回
            results = []
            
            for game in games:
                results.append({
                    "game_date": game.game_date,
                    "home_team": game.home_team,
                    "away_team": game.away_team,
                    "home_score": game.home_score,
                    "away_score": game.away_score,
                    "game_number": game.game_number,
                    "hp": game.hp,
                    "first_base": game.first_base,
                    "second_base": game.second_base,
                    "third_base": game.third_base,
                    "audience": game.audience,
                    "game_time": game.game_time,
                    "game_status": game.game_status,
                    "home_team_logo": TEAM_LOGOS.get(game.home_team, "/static/picture_repository/baseball.jpg"),
                    "away_team_logo": TEAM_LOGOS.get(game.away_team, "/static/picture_repository/baseball.jpg")
                })

            return jsonify(results)

            
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500
        

    #刪除某一年的winnerlist
    @app.route('/winlist/delete', methods=['POST'])
    def delete_winlist_entry():
        data = request.get_json()
        year = data.get('year')

        # 檢查是否有提供年份
        if not year:
            return jsonify({"error": "Year is required"}), 400

        try:
            # 查詢資料庫中對應年份的資料
            winner = WinnerList.query.filter_by(years=year).first()

            if not winner:
                return jsonify({"message": f"No data found for year {year}"}), 404

            # 刪除資料
            db.session.delete(winner)
            db.session.commit()

            return jsonify({"message": f"Data for year {year} deleted successfully"}), 200

        except Exception as e:
            db.session.rollback()  # 回滾資料庫變更
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500
        

    # 刪除比賽資料
    @app.route('/delete_game', methods=['POST'])
    def delete_game():
        data = request.get_json()
        game_date = data.get('game_date')
        game_number = data.get('game_number')

        # 驗證請求參數
        if not game_date or not game_number:
            return jsonify({"error": "Both 'game_date' and 'game_number' are required."}), 400

        try:
            # 確認日期格式
            game_date = datetime.strptime(game_date, "%Y-%m-%d").date()

            # 查詢資料庫中的比賽
            game = Games.query.filter_by(game_date=game_date, game_number=game_number).first()
            if not game:
                return jsonify({"error": "Game not found for the specified date and number."}), 404

            # 刪除比賽
            db.session.delete(game)
            db.session.commit()

            return jsonify({"message": "Game deleted successfully."}), 200

        except Exception as e:
            db.session.rollback()  # 發生異常時回滾變更
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500

    # 查詢投手對打者的比賽結果
    @app.route('/show-outcome', methods=['GET'])
    def show_outcome():
        pitcher_id = request.args.get('pitcher_id')
        batter_id = request.args.get('batter_id')
        year1 = request.args.get('year1')
        year2 = request.args.get('year2')

        # 檢查必要的參數是否存在
        if not pitcher_id or not batter_id or not year1 or not year2:
            return jsonify({'error': 'Missing required parameters'}), 400

        try:
            # 查詢符合條件的比賽結果
            battles = match_results.query.filter(
                match_results.pitcher_id == pitcher_id,
                match_results.batter_id == batter_id,
                match_results.year.between(year1, year2)
            ).all()

            # 構建回應資料
            if battles:
                battles_data = [
                    {
                        'year': battle.year,
                        'pitcher_id': battle.pitcher_id,
                        'batter_id': battle.batter_id,
                        'plate_appearances': battle.plate_appearances,
                        'at_bats': battle.at_bats,
                        'runs_batted_in': battle.runs_batted_in,
                        'hits': battle.hits,
                        'doubles': battle.doubles,
                        'triples': battle.triples,
                        'home_runs': battle.home_runs,
                        'total_bases': battle.total_bases,
                        'batting_average': battle.batting_average,
                        'walks': battle.walks,
                        'intentional_walks': battle.intentional_walks,
                        'hit_by_pitch': battle.hit_by_pitch,
                        'strikeouts': battle.strikeouts,
                        'on_base_percentage': battle.on_base_percentage
                    }
                    for battle in battles
                ]
                return jsonify({'success': True, 'battles': battles_data})

            return jsonify({'success': True, 'battles': []})

        except Exception as e:
            return jsonify({'error': f'Database error: {str(e)}'}), 500
    
    #計算給定投手和打者的ops+，若打者和投手無對戰紀錄。會特別通知前端
    @app.route('/predict-outcome', methods=['GET'])
    def predict_outcome():
        try:
            # 獲取請求中的參數
            batter_id = request.args.get('batter_id')  # 打者 ID
            pitcher_id = request.args.get('pitcher_id')  # 投手 ID
            start_year = request.args.get('year1')  # 開始年份
            end_year = request.args.get('year2')  # 結束年份

            # 驗證參數是否齊全
            if not (batter_id and pitcher_id and start_year and end_year):
                return jsonify({"success": False, "message": "缺少必要參數"}), 400

            # 查詢對戰紀錄
            match_data = db.session.query(
                func.sum(match_results.hits).label('total_hits'),
                func.sum(match_results.at_bats).label('total_at_bats'),
                func.sum(match_results.walks).label('total_walks'),
                func.sum(match_results.total_bases).label('total_bases'),
            ).filter(
                match_results.batter_id == batter_id,
                match_results.pitcher_id == pitcher_id,
                match_results.year >= start_year,
                match_results.year <= end_year
            ).first()

            # 如果無對戰紀錄
            if not match_data or not match_data.total_at_bats:
                return jsonify({"success": False, "message": "無對戰紀錄"}), 404

            # 計算球員 OBP 和 SLG
            hits = match_data.total_hits or 0
            at_bats = match_data.total_at_bats or 0
            walks = match_data.total_walks or 0
            total_bases = match_data.total_bases or 0

            obp = (hits + walks) / (
                at_bats + walks ) if at_bats > 0 else 0
            slg = total_bases / at_bats if at_bats > 0 else 0

            # 查詢聯盟數據
            league_data = db.session.query(
                func.sum(LeagueStats.league_plate_appearances).label('total_pa'),
                func.sum(LeagueStats.league_at_bats).label('total_ab'),
                func.sum(LeagueStats.league_total_bases).label('total_tb'),
                func.sum(LeagueStats.league_on_base_percentage * LeagueStats.league_plate_appearances).label('weighted_obp'),
                func.sum(LeagueStats.league_slugging_percentage * LeagueStats.league_at_bats).label('weighted_slg'),
            ).filter(
                LeagueStats.year >= start_year,
                LeagueStats.year <= end_year
            ).first()

            # 驗證聯盟數據
            if not league_data or not league_data.total_pa or not league_data.total_ab:
                return jsonify({"success": False, "message": "無聯盟數據"}), 404

            # 加權平均計算
            league_obp = league_data.weighted_obp / league_data.total_pa if league_data.total_pa > 0 else 0
            league_slg = league_data.weighted_slg / league_data.total_ab if league_data.total_ab > 0 else 0

            # 計算 OPS+
            ops_plus = 100 * ((obp / league_obp) + (slg / league_slg) - 1)

            # 返回計算結果
            return jsonify({
                "success": True,
                "the_result": [{
                    "player_on_base_percentage": f"{obp:.3f}",
                    "league_on_base_percentage": f"{league_obp:.3f}",
                    "player_slugging_percentage": f"{slg:.3f}",
                    "league_slugging_percentage": f"{league_slg:.3f}",
                    "ops_plus": f"{ops_plus:.2f}"
                }]
            })

        except Exception as e:
            return jsonify({"success": False, "message": f"後端發生錯誤: {str(e)}"}), 500

    #新增新的資料進入player 
    @app.route('/add_player', methods=['POST'])
    def add_player():
        # 從前端接收 JSON 請求
        data = request.get_json()

        # 確保接收到必需的字段
        if not all(field in data for field in ['player_name','number', 't_b', 'height', 'weight', 'born', 'debut', 'nationality', 'draft_order', 'position','team']):
            return jsonify({"message": "Missing required fields"}), 400

        # 創建 Player 實例
        new_player = Player(
            name=data['player_name'],
            number=data['number'],
            t_b=data['t_b'],
            height=data['height'],
            weight=data['weight'],
            born=data['born'],
            debut=data['debut'],
            nationality=data['nationality'],
            draft_order=data['draft_order'],
            position=data['position'],
            team=data['team']
        )

        # 儲存資料到資料庫
        try:
            db.session.add(new_player)
            db.session.commit()
            return jsonify({"message": "Player added successfully!", "player_unique_id": new_player.player_unique_id}), 201
        except Exception as e:
            db.session.rollback()  # 發生錯誤時回滾
            return jsonify({"message": f"Error: {str(e)}"}), 500
        
    @app.route('/insert_game', methods=['POST'])
    def insert_game():
        # 確保請求內容為 JSON 格式
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 415

        try:
            # 獲取請求數據
            data = request.get_json()

            # 提取字段
            game_date = data.get('game_date')
            home_team = data.get('home_team')
            away_team = data.get('away_team')
            home_score = data.get('home_score')
            away_score = data.get('away_score')
            hp = data.get('hp')
            first_base = data.get('first_base')
            second_base = data.get('second_base')
            third_base = data.get('third_base')
            audience = data.get('audience')
            game_time = data.get('game_time')

            # 驗證必要字段是否存在
            if not game_date:
                return jsonify({"error": "Missing required fields"}), 400

            # 創建新遊戲記錄
            new_game = Games(
                game_date=game_date,
                home_team=home_team,
                away_team=away_team,
                home_score=home_score,
                away_score=away_score,
                hp=hp,
                first_base=first_base,
                second_base=second_base,
                third_base=third_base,
                audience=audience,
                game_time=game_time
            )

            # 保存到數據庫
            db.session.add(new_game)
            db.session.commit()

            return jsonify({"message": "Game inserted successfully"}), 201

        except Exception as e:
            db.session.rollback()  # 回滾數據庫
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500
        
    @app.route('/game_details', methods=['GET'])
    def game_details():
        # 提取 URL 参数
        game_id = request.args.get('id')
        game_date = request.args.get('data')

        # 确保参数存在
        if not game_id or not game_date:
            return "Game ID and Date are required!", 400

        try:
            # 查詢資料庫中的比賽
            game = Games.query.filter_by(game_date=game_date, game_number=game_id).first()

            print(game)
            if not game:
                return jsonify({"error": "Game not found for the specified date and number."}), 404

            # 直接傳 html
            return render_template('game_details.html', game=game)

            

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # 查詢投手端點
    @app.route('/check-player', methods=['GET'])
    def check_player():
        player_name = request.args.get('name')  # 獲取前端傳遞的投手名字

        # 檢查是否提供了名字
        if not player_name:
            return jsonify({"error": "Player name is required"}), 400

        try:
            # 查詢符合名字的投手
            players = Player.query.filter(Player.name.like(f"%{player_name}%")).all()

            if not players:
                return jsonify({"exists": False, "players": []}), 200

            # 將查詢結果轉為字典
            player_list  =[]

            for player in players:
                 player_list.append({
                    "player_unique_id": player.player_unique_id,
                    "player_name": player.name,
                    "t_b": player.t_b,
                    "number":player.number,
                    "team":player.team,
                    "height": player.height,
                    "weight": player.weight,
                    "born": player.born,
                    "debut": player.debut,
                    "nationality": player.nationality,
                    "position": player.position,
                })

            return jsonify({"exists": True, "players": player_list}), 200

        except Exception as e:
             return jsonify({'exists': False, 'players': []}),500
        
    #更新player資訊
    @app.route('/players/<int:id>', methods=['PATCH'])
    def update_player(id):
        # 解析請求數據
        data = request.get_json()
        #print("Received data:", data)
        # 確保請求包含需要更新的數據
        required_fields = [
            "player_name", "number", "t_b", "height", "weight",
            "born", "debut", "nationality", "draft_order", "position"
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": "Data is not complete"}), 404

        try:
            # 根據 ID 查找球員
            player = Player.query.get(id)
            if not player:
                return jsonify({"error": "Player not found"}), 404

            # 更新球員信息
            player.player_name = data["player_name"]
            player.number = data["number"]
            player.t_b = data["t_b"]
            player.height = data["height"]
            player.weight = data["weight"]
            player.born = data["born"]
            player.debut = data["debut"]
            player.nationality = data["nationality"]
            player.draft_order = data["draft_order"]
            player.position = data["position"]

            # 保存更改到數據庫
            db.session.commit()

            return jsonify({
            "success": f"Player {id} data updated successfully",
            "message": f"Player {id} data updated successfully"}), 200

        except Exception as e:
            # 捕獲並處理異常
            db.session.rollback()
            return jsonify({"success": False,"message": f"Error occurred: {str(e)}"}), 500
        
    # 更新得獎者列表資訊
    @app.route('/winnerlist/<int:year>', methods=['PATCH'])
    def update_winnerlist(year):

        data = request.get_json()
        # 根據年份查找相應的獲獎資料
        print(data)
        winner_data = WinnerList.query.filter_by(years=year).first()
        if not winner_data:
            return jsonify({"success": False, "message": f"No winner records found for year {year}"}), 404
        try:
            # 更新資料
            winner_data.most_hits_player_id = int(data.get('most_hits_player_id'))
            winner_data.highest_batting_average_player_id = int(data.get('highest_batting_average_player_id'))
            winner_data.most_RBI_player_id = int(data.get('most_RBI_player_id'))
            winner_data.most_stolen_bases_player_id = int(data.get('most_stolen_bases_player_id'))
            winner_data.homerun_leader_player_id = int(data.get('homerun_leader_player_id'))
            winner_data.most_wins_player_id = int(data.get('most_wins_player_id'))
            winner_data.strikeout_leader_player_id = int(data.get('strikeout_leader_player_id'))
            winner_data.lowest_ERA_player_id = int(data.get('lowest_ERA_player_id'))
            winner_data.most_saves_player_id = int(data.get('most_saves_player_id'))
            winner_data.most_holds_player_id = int(data.get('most_holds_player_id'))
            
            # 提交變更
            db.session.commit()
            return jsonify({"success": True, "message": f"Updated records for year {year}"}), 200

        except Exception as e:
            # 捕獲異常並回滾事務
            db.session.rollback()
            return jsonify({"success": False, "message": f"Error occurred: {str(e)}"}), 500

    # 搜尋球員
    @app.route('/search_player_bypartname', methods=['GET'])
    def search_players():
        player_name = request.args.get('player_name', '').strip()

        try:
            # 如果提供了 player_name，進行模糊搜尋
            if player_name:
                players = Player.query.filter(Player.name.ilike(f"%{player_name}%")).all()
            else:
                return jsonify({"error": "Missing 'player_name' parameter"}), 400

            # 將搜尋結果格式化為 JSON
                        # 將查詢結果轉為字典
            player_list  =[]
            a=34
            for player in players:
                 if(a<=34 and a>=0):
                    a=a-1
                    player_list.append({
                        "player_unique_id": player.player_unique_id,
                        "player_name": player.name,
                    })

            return jsonify(player_list), 200

        except Exception as e:
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500