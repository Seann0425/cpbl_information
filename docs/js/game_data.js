document.addEventListener("DOMContentLoaded", () => {
  // 定義 Endpoints
  const scoreboardEndpoint = "http://localhost:3000/scoreboard";
  const teamsEndpoint = "http://localhost:3000/teams";
  const detailsEndpoint = "http://localhost:3000/details";

  // 同步獲取多個 Endpoint 的數據
  Promise.all([
    fetch(scoreboardEndpoint).then((res) => res.json()), // 獲取 Scoreboard 數據
    fetch(teamsEndpoint).then((res) => res.json()), // 獲取 Teams 數據
    fetch(detailsEndpoint).then((res) => res.json()), // 獲取 Details 數據
  ])
    .then(([scoreboard, teams, details]) => {
      // 確認數據是否正確
      console.log("Scoreboard Data:", scoreboard);
      console.log("Teams Data:", teams);
      console.log("Details Data:", details);

      // 插入場次和比賽編號
      document.getElementById("venue").textContent = `${scoreboard.venue} 場次: ${scoreboard.gameId}`;

      // 插入隊伍資料
      const team1 = document.getElementById("team1");
      const team2 = document.getElementById("team2");

      const createTeamHTML = (team) => `
        <img src="${team.logo}" alt="${team.name} Logo">
        <p>${team.name}</p>
        <p class="score">${team.score}</p>
        <p>${team.record}</p>
      `;

      team1.innerHTML = createTeamHTML(teams[0]);
      team2.innerHTML = createTeamHTML(teams[1]);

      // 插入比賽細節
      const detailsTable = document.getElementById("gameDetailsTable");

      detailsTable.innerHTML = `
        <tr>
          <th>比賽日期</th>
          <td>${details.date}</td>
        </tr>
        <tr>
          <th>比賽編號</th>
          <td>${scoreboard.gameId}</td>
        </tr>
        <tr>
          <th>主場球隊</th>
          <td>${teams[0].name}</td>
        </tr>
        <tr>
          <th>客場球隊</th>
          <td>${teams[1].name}</td>
        </tr>
        <tr>
          <th>主審</th>
          <td>${details.umpires.home}</td>
        </tr>
        <tr>
          <th>一壘審</th>
          <td>${details.umpires.first}</td>
        </tr>
        <tr>
          <th>二壘審</th>
          <td>${details.umpires.second}</td>
        </tr>
        <tr>
          <th>三壘審</th>
          <td>${details.umpires.third}</td>
        </tr>
        <tr>
          <th>觀眾數</th>
          <td>${details.attendance}</td>
        </tr>
        <tr>
          <th>比賽耗時</th>
          <td>${details.duration}</td>
        </tr>
        <tr>
          <th>MVP 選手</th>
          <td>${details.mvp}</td>
        </tr>
      `;
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // 捕捉錯誤
    });
});
