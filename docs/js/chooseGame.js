const formInput = document.querySelector('.formInput');

const chooseG = document.createElement('div');
chooseG.classList.add('chooseGameDateBlock');

const chooseGameDate = document.createElement('input');
chooseGameDate.type = 'date';
chooseGameDate.classList.add('chooseGameDate');

const allGame = document.createElement('div');
allGame.classList.add('allGame');

chooseG.appendChild(chooseGameDate);
chooseG.appendChild(allGame);
formInput.appendChild(chooseG);
/*<div class="chooseGameDateBlock">
				<input type="date" class="chooseGameDate">
				<div class="allGame">
					
				</div>
			</div>
		*/ 

chooseGameDate.addEventListener('change', (event)=>{
    console.log(chooseGameDate.value);
    fetch(`http://localhost:3000/games?game_date=${chooseGameDate.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data && data.length == 0) 
            {
                allGame.innerHTML = `
                    <h1>No Data</h1>
                `
            }
            else 
            {
                allGame.innerHTML = '';
                data.forEach((eachGame) => {
                    const button = document.createElement('button');
                    button.classList.add('chooseGame');
                    button.textContent = `${eachGame.home_team} - ${eachGame.away_team}`;
                    allGame.appendChild(button);
                    
                });
            }
        })
        .catch(error => console.log('error:', error));
})