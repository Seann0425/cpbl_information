export function addChooseGame(){
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
        fetch(`/games?game_date=${chooseGameDate.value}`)
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
                        button.value = eachGame.id;    ///////////////////
                        button.textContent = `${eachGame.home_team} - ${eachGame.away_team}`;
                        button.addEventListener('click', (event) => {
                            
                            //const addP = document.createElement('p');
                            //addP.id = eachGame.id;  //////////////////////////////////
                            //console.log(addP.id);
                            //formInput.insertBefore(addP, chooseG.nextSibling);
                            chooseG.id = eachGame.game_number;   //////////////////////////////////////

                        });
                        allGame.appendChild(button);
                    });
                }
            })
            .catch(error => console.log('error:', error));
    })
}


export function addChooseUpdateGame(){
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
        fetch(`/games?game_date=${chooseGameDate.value}`)
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
                        button.value = eachGame.id;    ///////////////////
                        button.textContent = `${eachGame.home_team} - ${eachGame.away_team}`;
                        button.addEventListener('click', (event) => {
                            
                            console.log('press');
                            
                            const game_teamA = document.getElementById('game_teamA');
                            const game_teamB = document.getElementById('game_teamB');
                            const game_scoreA = document.getElementById('game_scoreA');
                            const game_scoreB = document.getElementById('game_scoreB');
                            const game_hp = document.getElementById('game_hp');
                            const game_1b = document.getElementById('game_1b');
                            const game_2b = document.getElementById('game_2b');
                            const game_3b = document.getElementById('game_3b');
                            const game_audience = document.getElementById('game_audience');
                            const game_times = document.getElementById('game_times');

                            
                            game_teamA.value = eachGame.home_team;
                            game_teamB.value = eachGame.away_team;
                            game_scoreA.value = eachGame.home_score;
                            game_scoreB.value = eachGame.away_score;
                            game_hp.value = eachGame.hp;
                            game_1b.value = eachGame['first_base'];
                            game_2b.value = eachGame['second_base'];
                            game_3b.value = eachGame['third_base'];
                            game_audience.value = eachGame.audience;
                            game_times.value = eachGame.time;

                            chooseG.id = eachGame.game_number;   //////////////////////////////////////

                        });
                        allGame.appendChild(button);
                    });
                }
            })
            .catch(error => console.log('error:', error));
    })
}
