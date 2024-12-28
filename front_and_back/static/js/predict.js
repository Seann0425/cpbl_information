let selectedPitcherId = null; // 存選中投手 的 player_unique_id
let selectedBatterId = null; // 存選中投者 的 player.unique_id

function checkpitch(){
  // 拿投手名子
  const pitcherName = document.getElementById('pitcher-name').value;

  if(!pitcherName){
    alert('請輸入投手名子！');
    return;
  }

  // 發送 request 到 後端
  fetch(`/check-player?name=${encodeURIComponent(pitcherName)}`)
      .then(response => response.json()) // 將回傳值轉為 .json
      .then(result => {
        if(result.exists){
            // 把所有投手列在前端
            displayPitcherOptions(result.players);
        }
        else{
          alert('投手不存在, 請重新輸入！');
        }
      })
    
      .catch(error => {
        alert('後端出錯: ' + error.message);
       });
}

function displayPitcherOptions(players) {
  console.log("display");
  const optionDiv = document.getElementById('pitcher-options'); // 修正為 getElementById
  optionDiv.innerHTML = ''; // 清空之前的內容

  // 顯示符合條件的所有投手
  players.forEach(player => {
    const buttonHTML = `
        <button 
            id="pitcher-btn-${player.player_unique_id}" 
            style="display: block; width: 100%; margin-bottom: 10px; padding: 10px; font-size: 16px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;"
        >
            ${player.player_name} (${player.team}) ${player.height}cm ${player.weight}kg <br>
            背號: ${player.number} | 國籍: ${player.nationality} | 位置: ${player.position} <br>
        </button>
    `;
    optionDiv.innerHTML += buttonHTML;
  });

  // 為每個按鈕添加事件監聽器
  players.forEach(player => {
    const button = document.getElementById(`pitcher-btn-${player.player_unique_id}`);
    button.onclick = () => selectPitcher(player);
  });

  optionDiv.style.display = 'block';
}

function selectPitcher(player){
  alert(`您選擇了 ${player.player_name} (${player.team})`);

  selectedPitcherId = player.player_unique_id;
  // 顯示選擇的投手資訊
  const selectedPitcherDiv = document.getElementById('selected-pitcher');
  selectedPitcherDiv.innerHTML = `您選擇了 <strong>${player.player_name}</strong> (${player.team}) ${player.height}cm ${player.weight}kg 背號:${player.number}`;
  selectedPitcherDiv.style.display = 'block'; // 顯示文字容器

  // 隱藏按鈕列表
  const optionDiv = document.getElementById('pitcher-options');
  optionDiv.style.display = 'none';

  document.getElementById('batter-name').disabled = false; // 解鎖打者輸入框
  document.getElementById('pitcher-options').style.display = 'none'; // 隱藏選
}



// 打者
function checkbatter() {
  // 拿打者名字
  const batterName = document.getElementById('batter-name').value;

  if (!batterName) {
      alert('請輸入打者名字！');
      return;
  }

  // 發送 request 到後端
  fetch(`/check-player?name=${encodeURIComponent(batterName)}`)
      .then(response => response.json()) // 將回傳值轉為 .json
      .then(result => {
        console.log(result); // 確認後端返回的數據結構
          if (result.exists) {
              // 把所有打者顯示在前端
              displayBatterOptions(result.players);
          } else {
              alert('打者不存在，請重新輸入！');
          }
      })
      .catch(error => {
          alert('後端出錯');
          console.error(error);
      });
}

function displayBatterOptions(players) {
  
  const optionDiv = document.getElementById('batter-options'); // 獲取打者選項的容器
  optionDiv.innerHTML = ''; // 清空之前的內容

  // 顯示符合條件的所有打者
  players.forEach(player => {
      const buttonHTML = `
          <button 
              id="batter-btn-${player.player_unique_id}" 
              style="display: block; width: 100%; margin-bottom: 10px; padding: 10px; font-size: 16px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;"
          >
              ${player.player_name} (${player.team}) ${player.height}cm ${player.weight}kg <br>
              背號: ${player.number} | 國籍: ${player.nationality} | 位置: ${player.position} <br>
          </button>
      `;
      optionDiv.innerHTML += buttonHTML;
  });

  // 為每個按鈕添加事件監聽器
  players.forEach(player => {
      const button = document.getElementById(`batter-btn-${player.player_unique_id}`);
      button.onclick = () => selectBatter(player);
  });

  optionDiv.style.display = 'block'; // 顯示打者選項列表
}

function selectBatter(player) {
  selectedBatterId = player.player_unique_id;

  alert(`您選擇了 ${player.player_name} (${player.team})`);

  // 顯示選擇的打者資訊
  const selectedBatterDiv = document.getElementById('selected-batter');
  selectedBatterDiv.innerHTML = `您選擇了 <strong>${player.player_name}</strong> (${player.team}) ${player.height}cm ${player.weight}kg 背號:${player.number}`;
  selectedBatterDiv.style.display = 'block'; // 顯示文字容器

  // 隱藏按鈕列表
  const optionDiv = document.getElementById('batter-options');
  optionDiv.style.display = 'none';
}

//////////////////////
// predict 按鍵
function predictOutcome() {
  // 獲取選擇的投手和打者 ID
  const pitcherId = selectedPitcherId;
  const batterId = selectedBatterId;

  // 獲取年份區間
  const year1 = document.getElementById('year-range-1').value;
  const year2 = document.getElementById('year-range-2').value;

  if (year1 > year2) {
    alert('區間設定錯誤!');
    return;
  }

  if (!selectedPitcherId) {
    alert('請先確定你要選擇那一位投手！');
    return;
  }

  if (!selectedBatterId) {
    alert('請先確定你要選擇那一位打者！');
    return;
  }

  // 清空表格內容（確保舊結果被清除）
  const tableBody = document.getElementById('result-table').querySelector('tbody');
  tableBody.innerHTML = '';

  const url = `/predict-outcome?pitcher_id=${encodeURIComponent(pitcherId)}&batter_id=${encodeURIComponent(batterId)}&year1=${encodeURIComponent(year1)}&year2=${encodeURIComponent(year2)}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === false) {
        alert(data.message);
        return;
      }
      const the_result = data.the_result;

      // 顯示結果
      if (the_result.length > 0) {
        document.getElementById('prediction-result').style.display = 'block';
      }
      displayPredictionResult(the_result);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('發送請求時發生錯誤，請稍後再試！');
    });
}

// 做表格用的
function displayPredictionResult(the_result) {
  const tableBody = document.getElementById('result-table').querySelector('tbody');

  // 確保清空表格
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  if (the_result.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.textContent = '無結果';
    emptyCell.colSpan = 5;
    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
    return;
  }

  the_result.forEach((record) => {
    const row = document.createElement('tr');

    const playerOBPCell = document.createElement('td');
    playerOBPCell.textContent = record.player_on_base_percentage;
    row.appendChild(playerOBPCell);

    const leagueOBPCell = document.createElement('td');
    leagueOBPCell.textContent = record.league_on_base_percentage;
    row.appendChild(leagueOBPCell);

    const playerSLGCell = document.createElement('td');
    playerSLGCell.textContent = record.player_slugging_percentage;
    row.appendChild(playerSLGCell);

    const leagueSLGCell = document.createElement('td');
    leagueSLGCell.textContent = record.league_slugging_percentage;
    row.appendChild(leagueSLGCell);

    const opsPlusCell = document.createElement('td');
    opsPlusCell.textContent = record.ops_plus;
    row.appendChild(opsPlusCell);

    tableBody.appendChild(row);
  });
}


function showOutcome(){
  // 獲取選擇的投手和打者 ID
  const pitcherId = selectedPitcherId; // 假設你已經存儲了選中的投手 ID
  const batterId = selectedBatterId;  // 假設你已經存儲了選中的打者 ID

  // 獲取年份區間
  const year1 = document.getElementById('year-range-1').value;
  const year2 = document.getElementById('year-range-2').value;
  
  if(year1 > year2){
    alert('區間設定錯誤!');
    return;
  }

  if (!selectedPitcherId) {
    alert('請先確定你要選擇那一位投手！');
    return;
  }

  if (!selectedBatterId) {
    alert('請先確定你要選擇那一位打者！');
    return;
  }

  // 測試前端是否有成功傳參數給後端 可刪
  console.log(pitcherId);
  console.log(batterId);
  console.log(year1)
  console.log(year2);

  const url = `/show-outcome?pitcher_id=${encodeURIComponent(pitcherId)}&batter_id=${encodeURIComponent(batterId)}&year1=${encodeURIComponent(year1)}&year2=${encodeURIComponent(year2)}`;

  fetch(url, {
        method: 'GET',
        headers: {
         'Content-Type': 'application/json'
        }
  })
    .then(response => response.json())
    .then(data => {
      if(data.success){
        displayOutcome(data.battles); // 顯示查詢結果
      }
      else{
        alert("查詢失敗");
      }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert("後端有誤");
      });
}

function displayOutcome(battles) {
  const outcomeDiv = document.getElementById('outcome');
  outcomeDiv.innerHTML = ''; // 清空之前的結果

  if (battles.length === 0) {
      outcomeDiv.innerHTML = '<p>查無對戰紀錄！</p>';
      return;
  }

  // 動態生成對戰紀錄表格
  const table = document.createElement('table');
  table.border = 1;

  // 表格標題
  const headerRow = table.insertRow();
  ['Year', '打席', '打數', '打點', '安打', '全壘打', '壘打數', '打擊率', '四壞', '故四', '死球', '三振', '上壘率'].forEach(headerText => {
      const cell = headerRow.insertCell();
      cell.textContent = headerText;
  });

  // 插入對戰數據
  battles.forEach(record => {
      const row = table.insertRow();
      row.insertCell().textContent = record.year;
      row.insertCell().textContent = record.plate_appearances;
      row.insertCell().textContent = record.at_bats;
      row.insertCell().textContent = record.runs_batted_in;
      row.insertCell().textContent = record.hits;
      row.insertCell().textContent = record.home_runs;
      row.insertCell().textContent = record.total_bases;
      row.insertCell().textContent = record.batting_average;
      row.insertCell().textContent = record.walks;
      row.insertCell().textContent = record.intentional_walks;
      row.insertCell().textContent = record.hit_by_pitch;
      row.insertCell().textContent = record.strikeouts;
      row.insertCell().textContent = record.on_base_percentage;
  });

  outcomeDiv.appendChild(table);
}