const search_button = document.getElementById('searchButton');

search_button.addEventListener('click', (event) => {
    const yearVal = document.getElementById('year').value;
    const monthVal = document.getElementById('month').value;
    const dayVal = document.getElementById('day').value;
    const newDate = `${yearVal}-${monthVal}-${dayVal}`;
    console.log(newDate);

    fetch(`http://localhost:3000/games?game_date=${newDate}`)
        .then(res => res.json())
        .then(data => {
            console.log(data); // Check if the data is correct
            const allGamesDiv = document.getElementById('allGames');
            allGamesDiv.innerHTML = ""; // Clear previous results

            data.forEach(game => {
                const gameDiv = document.createElement('div');
                gameDiv.classList.add('game');

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
                gameDiv.addEventListener('click', () => {
                    const endpoint = `http://localhost:3000/game_details?id=${game.id}`;
                    console.log(`Redirecting to: ${endpoint}`);
                    
                    // Redirect to the game details page with the game ID
                    window.location.href = `../web_page/game_details.html?id=${game.id}`;
                });

                // Append the gameDiv to the parent container
                allGamesDiv.appendChild(gameDiv);
            });
        })
        .catch(error => {
            console.log("Error fetching games:", error);
        });
});
