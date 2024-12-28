fetch('/latest-games')
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
      gameDiv.classList.add('game'); // 使用一致的 class 名稱
      gameDiv.setAttribute('data-id', game.game_number); // 將比賽 ID 設置為屬性

      // 動態生成比賽的 HTML 結構
      gameDiv.innerHTML = `
        <p class="date">${new Date(game.game_date).toLocaleDateString()}</p>
        <h1 class="score">${game.home_score}</h1>
        <div class="team">
          <img class="logo" src="${game.home_team_logo}" alt="${game.home_team} Logo">
          <p class="teamName">${game.home_team}</p>
        </div>
        <h1 class="middle"> / </h1>
        <div class="team">
          <img class="logo" src="${game.away_team_logo}" alt="${game.away_team} Logo">
          <p class="teamName">${game.away_team}</p>
        </div>
        <h1 class="score">${game.away_score}</h1>
      `;

      // 為每個比賽區塊添加點擊事件
      gameDiv.addEventListener("click", () => {
        const gameId = gameDiv.dataset.id;
        const gameDate = new Date(game.game_date); // 将字符串解析为日期对象
        
        // 提取年份、月份、日期并格式化
        const year = gameDate.getFullYear();
        const month = String(gameDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
        const day = String(gameDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // 格式化为yyyy-MM-DD
      
        if (gameId && formattedDate) {
          window.location.href = `/game_details?id=${gameId}&data=${formattedDate}`;
        }
      });
      

      // 將比賽區塊添加到父容器中
      allGamesDiv.appendChild(gameDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error); // 處理錯誤
  });