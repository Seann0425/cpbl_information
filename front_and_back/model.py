from app import db

class Player(db.Model):
    __tablename__ = 'players'
    player_name = db.Column(db.String(50), nullable=False)  # 球員姓名
    player_unique_id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # 自增的球員唯一ID
    number = db.Column(db.Integer, nullable=False)
    t_b = db.Column(db.String(50))  # 投打習慣
    height = db.Column(db.Integer)  # 身高
    weight = db.Column(db.Integer)  # 體重
    born = db.Column(db.Date)  # 生日
    debut = db.Column(db.Date)  # 初登場
    nationality = db.Column(db.String(50))  # 國籍
    draft_order = db.Column(db.String(50))  # 選秀順位
    position = db.Column(db.String(50))  # 位置

class Games(db.Model):
    __tablename__ = 'games'
    game_date = db.Column(db.Date, nullable=False)
    home_team = db.Column(db.String(50), nullable=False)
    away_team = db.Column(db.String(50), nullable=False)
    home_score = db.Column(db.Integer, nullable=False)
    away_score = db.Column(db.Integer, nullable=False)
    game_number = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)  # 自增 ID
    hp = db.Column(db.String(50), nullable=True)
    first_base = db.Column(db.String(50), nullable=True)
    second_base = db.Column(db.String(50), nullable=True)
    third_base = db.Column(db.String(50), nullable=True)
    audience = db.Column(db.Integer, nullable=True)
    game_time = db.Column(db.Integer, nullable=True)
    game_status =db.Column(db.Integer, nullable=True)


class WinnerList(db.Model):
    __tablename__ = 'winner_list'
    years = db.Column(db.Integer, primary_key=True)                       # 年份
    most_hits_player_id = db.Column(db.Integer)                          # 安打王球員編號
    highest_batting_average_player_id = db.Column(db.Integer)            # 打擊王球員編號
    most_RBI_player_id = db.Column(db.Integer)                           # 打點王球員編號
    most_stolen_bases_player_id = db.Column(db.Integer)                  # 盜壘王球員編號
    homerun_leader_player_id = db.Column(db.Integer)                     # 全壘打王球員編號
    most_wins_player_id = db.Column(db.Integer)                          # 勝投王球員編號
    strikeout_leader_player_id = db.Column(db.Integer)                   # 奪三振王球員編號
    lowest_ERA_player_id = db.Column(db.Integer)                         # 防禦王球員編號
    most_saves_player_id = db.Column(db.Integer)                         # 最佳救援投手球員編號
    most_holds_player_id = db.Column(db.Integer)                         # 最佳中繼投手球員編號

class match_results(db.Model):
    __tablename__ = 'match_results'
    
    year = db.Column(db.Integer, autoincrement=True, nullable=False)                      # 年份
    pitcher_id = db.Column(db.Integer, autoincrement=True, nullable=False)                # 投手
    batter_id = db.Column(db.Integer,autoincrement=True, nullable=False)                 # 打者
    plate_appearances = db.Column(db.Integer)                          # 打席
    at_bats = db.Column(db.Integer)                                    # 打數
    runs_batted_in = db.Column(db.Integer)                             # 打點
    hits = db.Column(db.Integer)                                       # 安打
    doubles = db.Column(db.Integer)                                    # 二安
    triples = db.Column(db.Integer)                                    # 三安
    home_runs = db.Column(db.Integer)                                  # 全壘打
    total_bases = db.Column(db.Integer)                                # 壘打數
    batting_average = db.Column(db.Numeric(5, 3))                      # 打擊率
    walks = db.Column(db.Integer)                                      # 四壞
    intentional_walks = db.Column(db.Integer)                          # 故四
    hit_by_pitch = db.Column(db.Integer)                               # 死球
    strikeouts = db.Column(db.Integer)                                 # 三振
    on_base_percentage = db.Column(db.Numeric(5, 3))                  # 上壘率

    # Composite Primary Key (year, pitcher, batter)
    __table_args__ = (
        db.PrimaryKeyConstraint('year', 'pitcher_id', 'batter_id'),
    )

class LeagueStats(db.Model):
    __tablename__ = 'league_status'
    
    year = db.Column(db.Integer,autoincrement=True, nullable=False, primary_key=True)     # 年份
    league_plate_appearances = db.Column(db.Integer)                    # 聯盟打席數
    league_at_bats = db.Column(db.Integer)                              # 聯盟打數
    league_total_bases = db.Column(db.Integer)                          # 聯盟壘打數
    league_slugging_percentage = db.Column(db.Numeric(5, 3))            # 聯盟長打率
    league_on_base_percentage = db.Column(db.Numeric(5, 3))            # 聯盟上壘率