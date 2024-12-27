from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.sql import text

db=SQLAlchemy()

def create_app():
    app=Flask(__name__,template_folder='templates')
    #mysql+pymysql://使用者名稱:密碼@聯結網域（本機測試用localhost）:端口3306/資料庫名稱test
    app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:22080585@localhost:3306/test'
    db.init_app(app)

    from route import register_routes
    register_routes(app,db)

    try:
        with app.app_context():
            db.session.execute(text('SELECT 1'))  # 測試執行簡單查詢
            print("資料庫連接成功！")
    except Exception as e:
        print(f"資料庫連接失敗：{e}")
    migarte=Migrate(app,db)
    return app