from app import create_app

flask_app=create_app()

#執行網頁執行
if __name__ == '__main__':
    flask_app.run(host='0.0.0.0',debug=True)