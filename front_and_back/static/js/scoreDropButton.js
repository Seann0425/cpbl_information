const search_button = document.getElementById('searchButton');

search_button.addEventListener('click', (event) => {
    const yearVal = document.getElementById('year').value;
    const monthVal = document.getElementById('month').value.padStart(2, '0'); // 确保两位数格式
    const dayVal = document.getElementById('day').value.padStart(2, '0'); // 确保两位数格式
    const newDate = `${yearVal}-${monthVal}-${dayVal}`;
    console.log(newDate);

    fetch(`/games?game_date=${newDate}`)
        .then(res => res.json())
        .then(data => {
            console.log(data); // Check if the data is correct
            const allGamesDiv = document.getElementById('allGames');
            allGamesDiv.innerHTML = ""; // Clear previous results

            data.forEach(game => {
                const gameDiv = document.createElement('div');
                gameDiv.classList.add('game');
                gameDiv.dataset.id = game.game_number; // 设置 dataset.id
                gameDiv.dataset.date = game.game_date; // 设置 dataset.date，便于重定向

                // Add game details to the div
                gameDiv.innerHTML = `
                    <p class="date">${new Date(game.game_date).toLocaleDateString()}</p>
                    <h1 class="score">${game.home_score}</h1>
                    <div class="team">
                        <img class="logo" src="/logo/team_logo_lions_500x500.png" alt="${game.home_team} Logo">
                        <p class="teamName">${game.home_team}</p>
                    </div>
                    <h1 class="middle"> / </h1>
                    <div class="team">
                        <img class="logo" src="/logo/team_logo_lions_500x500.png" alt="${game.away_team} Logo">
                        <p class="teamName">${game.away_team}</p>
                    </div>
                    <h1 class="score">${game.away_score}</h1>
                `;

                // Add click event listener to redirect to game details
                gameDiv.addEventListener("click", () => {
                    const gameId = gameDiv.dataset.id;
                    const gameDate = new Date(gameDiv.dataset.date); // 使用 dataset.date

                    // Format the date to yyyy-MM-DD
                    const year = gameDate.getFullYear();
                    const month = String(gameDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
                    const day = String(gameDate.getDate()).padStart(2, '0');
                    const formattedDate = `${year}-${month}-${day}`;

                    // Redirect to game details page
                    if (gameId && formattedDate) {
                        window.location.href = `/game_details?id=${gameId}&data=${formattedDate}`;
                    }
                });

                // Append the gameDiv to the parent container
                allGamesDiv.appendChild(gameDiv);
            });
        })
        .catch(error => {
            console.log("Error fetching games:", error);
        });
});