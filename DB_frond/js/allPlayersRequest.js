fetch('http://localhost:3000/allPlayers')
    .then(res => res.json())
    .then(data => {
        const toAddDiv = document.getElementById('allTeams');
        data.forEach(oneTeam => {
            const addDiv = document.createElement('div');
            addDiv.classList.add('team');

            const allNames = document.createElement('div');
            allNames.classList.add('player_grid');

            oneTeam.eachName.forEach(nameInfo => {
                const nameButton = document.createElement('button');
                nameButton.classList.add('playerButton');
                nameButton.textContent = nameInfo;  // Set the name as the button text
                allNames.appendChild(nameButton);
            });

            addDiv.innerHTML = `
            <div class="horizontal-line">
				<hr class="horizontal">
				<h1 class="teamName">${oneTeam.team_name}</h1>
			</div>
			<div class="Info">
				<img class="logo" src="../picture_repository/team_logo_lions_500x500.png">
			</div>
            `;

            addDiv.querySelector('.Info').appendChild(allNames);  // Add player buttons to the Info section
            toAddDiv?.appendChild(addDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching player data:', error);
    });

