fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(data => {
        const toAdd = document.querySelector('.player_grid');
        const newData = data.map(player => ({
            playerName : player.player_name,
            playerId : player.player_unique_id
        }));
        
        newData.forEach(player => {
            const newButton = document.createElement('button');
            newButton.classList.add('playerButton');
            newButton.textContent = `${player.playerName}`;
            newButton.id = player.playerId;
            toAdd.appendChild(newButton);
        });
    })
    .catch(error => {console.log("allPlayerTest is error:", error)});


const allTeam = document.getElementById('allTeams');
allTeam.addEventListener('click', (event) => {
     if (event.target.tagName === 'BUTTON')
     {
        const id = event.target.id;
        console.log(`${id}`);
        window.location.href = `../web_page/player.html?id=${id}`;
    }   
});