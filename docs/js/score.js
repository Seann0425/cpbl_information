fetch('http://localhost:3000/games')
  .then((response) => {return response.json()})
  .then(data => {
    console.log(data); // Check if the data is correct
    const allGamesDiv = document.getElementById('allGames');

    data.forEach(game => {
      const gameDiv = document.createElement('div');
      gameDiv.classList.add('game');

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

      allGamesDiv.appendChild(gameDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error); // Handle errors here
  });