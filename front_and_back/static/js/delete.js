 // 按鈕功能設定
 document.getElementById("winlist").addEventListener("click", function () {
    // 彈出提示框讓使用者輸入年份
    const year = prompt("請輸入年份（西元年）：");
    if (!year || isNaN(year) || year.length !== 4) {
        alert("請輸入正確的四位數年份！");
        return;
    }

    // 將年份發送到後端
    fetch('/winlist/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ year: year }) // 將年份包裝成 JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`錯誤: ${data.error}`);
        } else {
            alert(`${data.message}`);
        }
    })
    .catch(error => {
        console.error('錯誤:', error);
        alert('請求失敗，請檢查伺服器是否正在運行。');
    });
});

document.getElementById("game").addEventListener("click", function () {
    const dialog = createDatePickerDialog((year, month, day) => {
        // 將 year, month, day 組合為 YYYY-MM-DD 格式
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        fetch(`/games?game_date=${formattedDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`錯誤: ${data.error}`);
            } else if (data.message) {
                alert(data.message); // 處理沒有比賽的情況
            } else {
                displayGames(data); // 如果有比賽，顯示結果
            }
        })
        .catch(error => {
            console.error("錯誤:", error);
            alert("請求失敗，請檢查伺服器是否正在運行。");
        });

        document.body.removeChild(dialog); // 關閉對話框
    });

    document.body.appendChild(dialog);
});

function createDatePickerDialog(onSubmit) {
    const dialog = document.createElement("div");
    dialog.style.position = "fixed";
    dialog.style.left = "50%";
    dialog.style.top = "50%";
    dialog.style.transform = "translate(-50%, -50%)";
    dialog.style.background = "#fff";
    dialog.style.padding = "20px";
    dialog.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    dialog.style.zIndex = "1000";

    const yearSelect = createSelect(1990, new Date().getFullYear());
    const monthSelect = createSelect(1, 12);
    const daySelect = document.createElement("select");

    function updateDays() {
        const year = parseInt(yearSelect.value, 10);
        const month = parseInt(monthSelect.value, 10);
        const daysInMonth = new Date(year, month, 0).getDate();
        daySelect.innerHTML = ""; // 清空選項
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }

    yearSelect.addEventListener("change", updateDays);
    monthSelect.addEventListener("change", updateDays);
    updateDays();

    const submitButton = document.createElement("button");
    submitButton.textContent = "確定";
    submitButton.addEventListener("click", () => {
        onSubmit(yearSelect.value, monthSelect.value, daySelect.value);
    });

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "取消";
    cancelButton.addEventListener("click", () => document.body.removeChild(dialog));

    dialog.innerHTML = "<p>請選擇日期（西元年/月/日）</p>";
    dialog.appendChild(yearSelect);
    dialog.appendChild(monthSelect);
    dialog.appendChild(daySelect);
    dialog.appendChild(submitButton);
    dialog.appendChild(cancelButton);

    return dialog;
}

function createSelect(start, end) {
    const select = document.createElement("select");
    for (let i = start; i <= end; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
    return select;
}

function displayGames(games) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; // 清空結果

    games.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.className = "game-card";

        const formattedDate = new Date(game.game_date).toISOString().split("T")[0];

        gameCard.innerHTML = `
            <p><strong>比賽日期:</strong> ${formattedDate}</p>
            <p><strong>主場隊伍:</strong> ${game.home_team} (${game.home_score})</p>
            <p><strong>客場隊伍:</strong> ${game.away_team} (${game.away_score})</p>
            <p><strong>game_number:</strong> ${game.game_number}</p>
            <p><strong>HP:</strong> ${game.hp || "N/A"}</p>
            <p><strong>1B:</strong> ${game["first_base"] || "N/A"}</p>
            <p><strong>2B:</strong> ${game["second_base"] || "N/A"}</p>
            <p><strong>3B:</strong> ${game["third_base"] || "N/A"}</p>
            <p><strong>觀眾人數:</strong> ${game.audience || "N/A"}</p>
            <p><strong>比賽時間:</strong> ${game.game_time || "N/A"}</p>
            <p><strong>比賽狀態:</strong> ${game.game_status || "N/A"}</p>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "刪除比賽";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            fetch("/delete_game", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ game_date: formattedDate, game_number: game.game_number })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(`錯誤: ${data.error}`);
                } else {
                    alert(`刪除成功: ${data.message}`);
                    resultContainer.removeChild(gameCard); // 移除卡片
                }
            })
            .catch(error => {
                console.error("錯誤:", error);
                alert("請求失敗，請檢查伺服器是否正在運行。");
            });
        });

        gameCard.appendChild(deleteButton);
        resultContainer.appendChild(gameCard);
    });
}