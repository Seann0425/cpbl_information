console.log("Script loaded"); // 檢查腳本是否被加載
fetch('http://localhost:3000/games')
  .then((response) => {
    return response.json(); // 解析 JSON
  })
  .then(data => {
    console.log(data); // 查看獲取的數據是否正確
    const allGamesDiv = document.getElementById('allGames');

    // 遍歷每場比賽數據
    data.forEach(game => {
      // 創建每場比賽的容器
      const gameDiv = document.createElement('div');
      gameDiv.classList.add('game');
      gameDiv.setAttribute('data-id', game.id); // 將比賽 ID 設置為屬性

      // 動態生成比賽的 HTML 結構
      gameDiv.innerHTML = `
        <p class="date">${new Date(game.game_date).toLocaleDateString()}</p>
        <h1 class="score">${game.home_score}</h1>
        <div class="team">
          <img class="logo" src="../picture_repository/team_logo_lions_500x500.png">
          <p class="teamName">${game.home_team}</p>
        </div>
        <h1 class="middle"> / </h1>
        <div class="team">
          <img class="logo" src="../picture_repository/team_logo_lions_500x500.png">
          <p class="teamName">${game.away_team}</p>
        </div>
        <h1 class="score">${game.away_score}</h1>
      `;

      //為比賽區塊添加點擊事件
      gameDiv.addEventListener('click', () => {
        const endpoint = `http://localhost:3000/game_deatails?id=${game.id}`;
        // 跳轉到對應的 game_details.html，並帶上比賽的 ID
        window.location.href = `../web_page/game_details.html?id=${game.id}`;
      });
      

      // 將比賽區塊添加到父容器中
      allGamesDiv.appendChild(gameDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error); // 處理錯誤
  });
