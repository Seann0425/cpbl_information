document.addEventListener("DOMContentLoaded", () => {
    // 從 URL 中提取 'id' 參數
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        console.error("URL 中缺少 'id' 參數");
        document.body.innerHTML = "<h2>無法載入比賽詳情，缺少 'id' 參數。</h2>";
        return;
    }
    console.log("Extracted ID:", id);

    // 設置 API endpoint
    const endpoint = `http://localhost:3000/game_details?id=${id}`;
    console.log(endpoint);

    // 發起請求以獲取特定比賽的詳細資訊
    fetch(endpoint)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Fetched Data:", data);

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("API 返回的數據格式不正確或數組為空");
            }

            // 直接使用平展結構的第一筆資料
            const gameData = data[0];

            // 插入場次與比賽資訊
            document.getElementById("venue").textContent = `${gameData.venue} 場次: ${gameData.id}`;

            // 插入隊伍資料
            const team1 = document.getElementById("team1");
            const team2 = document.getElementById("team2");

            const createTeamHTML = (name, logo, score, record) => `
                <img src="${logo}" alt="${name} Logo">
                <p>${name}</p>
                <p class="score">${score}</p>
                <p>${record}</p>
            `;

            team1.innerHTML = createTeamHTML(gameData.home_team, gameData.home_team_logo, gameData.home_team_score, gameData.home_team_record);
            team2.innerHTML = createTeamHTML(gameData.away_team, gameData.away_team_logo, gameData.away_team_score, gameData.away_team_record);

            // 插入比賽細節
            const detailsTable = document.getElementById("gameDetailsTable");

            detailsTable.innerHTML = `
                <tr>
                    <th>比賽日期</th>
                    <td>${gameData.date}</td>
                </tr>
                <tr>
                    <th>比賽編號</th>
                    <td>${gameData.id}</td>
                </tr>
                <tr>
                    <th>主場球隊</th>
                    <td>${gameData.home_team}</td>
                </tr>
                <tr>
                    <th>客場球隊</th>
                    <td>${gameData.away_team}</td>
                </tr>
                <tr>
                    <th>主審</th>
                    <td>${gameData.umpires_home}</td>
                </tr>
                <tr>
                    <th>一壘審</th>
                    <td>${gameData.umpires_first}</td>
                </tr>
                <tr>
                    <th>二壘審</th>
                    <td>${gameData.umpires_second}</td>
                </tr>
                <tr>
                    <th>三壘審</th>
                    <td>${gameData.umpires_third}</td>
                </tr>
                <tr>
                    <th>觀眾數</th>
                    <td>${gameData.attendance}</td>
                </tr>
                <tr>
                    <th>比賽耗時</th>
                    <td>${gameData.duration}</td>
                </tr>
                <tr>
                    <th>MVP 選手</th>
                    <td>${gameData.mvp}</td>
                </tr>
            `;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            document.body.innerHTML += `<h2>載入比賽詳情時發生錯誤：${error.message}</h2>`;
        });
});
