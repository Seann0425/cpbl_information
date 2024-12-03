import { addChooseUpdateGame } from "./chooseGame.js";
import { addChooseUpdatePlayer } from "./choosePlayer.js";

const changeToPlayer = document.getElementById('choosePlayer');
changeToPlayer.addEventListener('click', (event) => {
    console.log('choosePlayer');
    const form = document.querySelector('.formLocation');
    form.innerHTML = `
        <div class="formInput">
			<h1 class="formTitle">Update Player</h1>

			<div id="chooseUpdatePlayerBlock">
				<button id="chooseUpdatePlayer" value="1">Select Modify Player</button>
				<div class="playerOptions">

				</div>
			</div>
            <label for="player_name">Name</label>
            <input type="text" placeholder="Name" id="player_name">
            <label for="player_number">Number</label>
            <input type="number" placeholder="Number" id="player_number">
            <label for="player_tb">右投右打</label>
            <select id="player_tb">
				<option value="右投右打">右投右打</option>
				<option value="右投左打">右投左打</option>
				<option value="左投右打">左投右打</option>
				<option value="左投左打">左投左打</option>
			</select>
            <label for="player_height">Height</label>
            <input type="number" placeholder="Height" id="player_height">
            <label for="player_weight">Weight</label>
            <input type="number" placeholder="Weight" id="player_weight">
            <label for="player_birthday">Birthday</label>
            <input type="date" placeholder="Birthday" id="player_birthday">
            <label for="player_debut">Debut</label>
            <input type="date" placeholder="Debut" id="player_debut">
            <label for="player_nationality">Nationality</label>
			<input type="text" placeholder="Nationality" id="player_nationality">
            <label for="player_draft_order">Draft Order</label>
            <input type="text" placeholder="Draft Order" id="player_draft_order">
            <label for="player_position">Position</label>
            <input type="text" placeholder="Position" id="player_position">
            <button id="playerUpdateButton" class="submitButton">Submit</button>
        </div>
    `;


    const choosePlayer = document.getElementById('chooseUpdatePlayer');
    choosePlayer.addEventListener('click', (event) =>{
        console.log("a");
        if (choosePlayer.value == "1")
        {
            const playerOptions = document.querySelector('.playerOptions');
            choosePlayer.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
            choosePlayer.value = "2";
            fetch('http://localhost:3000/players')
                .then(res => res.json())
                .then(data => {
                    const newData = data.map(player => ({
                        playerName : player.player_name,
                        playerId : player.player_unique_id
                    }));
                    
                    newData.forEach(player => {
                        const newButton = document.createElement('button');
                        newButton.classList.add('playerButton');
                        newButton.textContent = `${player.playerName}`;
                        newButton.id = player.playerId;
                        playerOptions.appendChild(newButton);
                    });
                })
                .catch(error => {console.log("allPlayerTest is error:", error)});



            playerOptions.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON')
                    {
                        choosePlayer.value = "1";
                        choosePlayer.style.backgroundColor = 'rgba(80, 0, 0, 0.2)';
                        const playerOptions = document.querySelector('.playerOptions');
                        playerOptions.innerHTML = "";
                    const id = event.target.id;
                    console.log(`${id}`);
                    fetch(`http://localhost:3000/players?player_unique_id=${id}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            choosePlayer.textContent = `Modify: ${data[0].player_name}`;
                            document.getElementById('player_tb').value = data[0].t_b;
                            document.getElementById('player_name').value = data[0].player_name;
                            document.getElementById('player_number').value = data[0].number;
                            document.getElementById('player_height').value = data[0].height;
                            document.getElementById('player_weight').value = data[0].weight;
                            document.getElementById('player_birthday').value = data[0].born;
                            document.getElementById('player_debut').value = data[0].debut;
                            document.getElementById('player_draft_order').value = data[0].draft_order;
                            document.getElementById('player_position').value = data[0].position;
                            document.getElementById('player_nationality').value = data[0].nationality;
                            document.querySelector('.formInput').value = data[0].player_unique_id;                          
                            console.log(document.querySelector('.formInput').value);
                        })
                        .catch(error => {console.log("player is error:", error)});
                }   
            });
        }
        else
        {
            choosePlayer.style.backgroundColor = 'white';
            choosePlayer.value = "1";
            const playerOptions = document.querySelector('.playerOptions');
            playerOptions.innerHTML = "";
        }    
    });

    const submitButton = document.getElementById('playerUpdateButton');
    submitButton.addEventListener('click', (event) => {
        console.log("pressButton");
        const name = document.getElementById('player_name').value;
        const number = document.getElementById('player_number').value;
        const height = document.getElementById('player_height').value;
        const weight = document.getElementById('player_weight').value;
        const birthday = document.getElementById('player_birthday').value;
        const debut = document.getElementById('player_debut').value;
        const nationality = document.getElementById('player_nationality').value;
        const draftOrder = document.getElementById('player_draft_order').value;
        const position = document.getElementById('player_position').value;


        const transferData = {
            "player_name": name,
            "t_b": "L/L",
            "height": height,
            "weight": weight,
            "born": birthday,
            "debut": debut,
            "nationality": nationality,
            "draft_order": draftOrder,
            "position": position
        }

        console.log(transferData);
        const id = document.querySelector('.formInput').value;
        console.log(id);
        fetch(`http://localhost:3000/players/${id}`, {
            'method': 'PATCH',
            'headers': {
                'Content-Type': 'application/json' 
            },
            'body': JSON.stringify(transferData)
        }).then(response => response.json())
          .then(data => console.log("Success:", data))
          .catch(error => console.error("Error:", error));
    });
});


const changeToWinner= document.getElementById('chooseWinner');
changeToWinner.addEventListener('click', async (event) => {
    console.log('chooseWinner');
    const form = document.querySelector('.formLocation');
    form.innerHTML = `
        <div class="formInput">
			<h1 class="formTitle">Update Player</h1>

            <select id="year" class="button_down"></select>

			<div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="highest_batting_average_content" value="1">Select Modify 安打王球員</button>
				<div class="playerOptions" id="highest_batting_average">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="hitKing_content" value="1">Select Modify 打擊王球員</button>
				<div class="playerOptions" id="hitKing">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="RBI_player_content" value="1">Select Modify 打點王球員</button>
				<div class="playerOptions" id="RBI_player">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="most_stolen_bases_player_content" value="1">Select Modify 盜壘王球員</button>
				<div class="playerOptions" id="most_stolen_bases_player">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="homerun_leader_player_content" value="1">Select Modify 全壘打王球員</button>
				<div class="playerOptions" id="homerun_leader_player">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="most_wins_player_content" value="1">Select Modify 勝投王球員</button>
				<div class="playerOptions" id="most_wins_player">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="strikeout_leader_player_content" value="1">Select Modify 奪三振王球員</button>
				<div class="playerOptions" id="strikeout_leader_player">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="lowest_ERA_player_content" value="1">Select Modify 防禦王球員</button>
				<div class="playerOptions" id="lowest_ERA_player">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="most_saves_player_content" value="1">Select Modify 最佳救援投手球員</button>
				<div class="playerOptions" id="most_saves_player">

				</div>
			</div>
            <div class="chooseUpdatePlayerBlock">
				<button class="chooseUpdatePlayer" id="most_holds_player_content" value="1">Select Modify 最佳中繼投手球員</button>
				<div class="playerOptions" id="most_holds_player">

				</div>
			</div>
            <button id="playerUpdateButton" class="submitButton">Submit</button>
            
    `;
    const year = document.getElementById('year');
    for (let i = 2023; i >= 1990; i--)
    {
        const optionChild = document.createElement('option');
        optionChild.textContent = i;
        optionChild.value = i;
        year.appendChild(optionChild);
    }

    year.addEventListener('change', async (event) => {
        const selectedYear = event.target.value;  // Get the selected year
        console.log(selectedYear);

        try {
            const winnerResponse = await fetch(`http://localhost:3000/winnerlist?years=${selectedYear}`);
            const winnerData = await winnerResponse.json();
            if (!winnerData || winnerData.length === 0) {
                console.log("No winner data found.");
                return;
            }

            // Function to fetch player details
            const fetchPlayer = async (playerId) => {
                const playerResponse = await fetch(`http://localhost:3000/players?player_unique_id=${playerId}`);
                const playerData = await playerResponse.json();
                return playerData[0]?.player_name || 'Unknown';
            };
            
            
            const hitKing = await fetchPlayer(winnerData[0].most_hits_player_id);
            const RBI_player = await fetchPlayer(winnerData[0].highest_batting_average_player_id);
            const most_stolen_bases_player = await fetchPlayer(winnerData[0].most_stolen_bases_player_id);
            const highest_batting_average = await fetchPlayer(winnerData[0].most_RBI_player_id);
            const most_wins_player = await fetchPlayer(winnerData[0].most_wins_player_id);
            const most_saves_player = await fetchPlayer(winnerData[0].most_saves_player_id);
            const most_holds_player = await fetchPlayer(winnerData[0].most_holds_player_id);
            const strikeout_leader_player = await fetchPlayer(winnerData[0].strikeout_leader_player_id);
            const homerun_leader_player = await fetchPlayer(winnerData[0].homerun_leader_player_id);
            const lowest_ERA_player = await fetchPlayer(winnerData[0].lowest_ERA_player_id);


            document.getElementById('highest_batting_average').value = winnerData[0].highest_batting_average_player_id;
            document.getElementById('hitKing').value = winnerData[0].most_hits_player_id;
            document.getElementById('RBI_player').value = winnerData[0].most_RBI_player_id;
            document.getElementById('most_stolen_bases_player').value = winnerData[0].most_stolen_bases_player_id;
            document.getElementById('homerun_leader_player').value = winnerData[0].homerun_leader_player_id;
            document.getElementById('most_wins_player').value = winnerData[0].most_wins_player_id;
            document.getElementById('strikeout_leader_player').value = winnerData[0].strikeout_leader_player_id;
            document.getElementById('lowest_ERA_player').value = winnerData[0].lowest_ERA_player_id;
            document.getElementById('most_saves_player').value = winnerData[0].most_saves_player_id;
            document.getElementById('most_holds_player').value = winnerData[0].most_holds_player_id;
            
            document.getElementById('highest_batting_average_content').textContent = `安打王: ${highest_batting_average}`;
            document.getElementById('hitKing_content').textContent = `打擊王: ${hitKing}`;
            document.getElementById('RBI_player_content').textContent = `打點王: ${RBI_player}`;
            document.getElementById('most_stolen_bases_player_content').textContent = `盜壘王: ${most_stolen_bases_player}`;
            document.getElementById('homerun_leader_player_content').textContent = `全壘打王: ${homerun_leader_player}`;
            document.getElementById('most_wins_player_content').textContent = `勝投手: ${most_wins_player}`;
            document.getElementById('strikeout_leader_player_content').textContent = `奪三振王: ${strikeout_leader_player}`;
            document.getElementById('lowest_ERA_player_content').textContent = `防禦王: ${lowest_ERA_player}`;
            document.getElementById('most_saves_player_content').textContent = `最佳救援投手: ${most_saves_player}`;
            document.getElementById('most_holds_player_content').textContent = `最佳中繼投手: ${most_holds_player}`;



           // console.log({ hitKing, RBI_player, most_stolen_bases_player, highest_batting_average, most_wins_player, most_saves_player, most_holds_player, strikeout_leader_player, homerun_leader_player, lowest_ERA_player });

        } catch (error) {
            console.log("Error occurred while fetching winner and player data: ", error);
        }
    });



    const choosePlayer = document.querySelectorAll('.chooseUpdatePlayer');
    choosePlayer.forEach((forEachPlayer) => {
        forEachPlayer.addEventListener('click', (event) =>{
            //console.log("a");
            if (forEachPlayer.value == "1")
            {
                const playerOptions = forEachPlayer.closest('.chooseUpdatePlayerBlock').querySelector('.playerOptions');
                //const playerOptions = forEachPlayer.querySelector('.playerOptions');
                forEachPlayer.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
                forEachPlayer.value = "2";
                fetch('http://localhost:3000/players')
                    .then(res => res.json())
                    .then(data => {
                        const newData = data.map(player => ({
                            playerName : player.player_name,
                            playerId : player.player_unique_id
                        }));
                        
                        newData.forEach(player => {
                            const newButton = document.createElement('button');
                            newButton.classList.add('playerButton');
                            newButton.textContent = `${player.playerName}`;
                            newButton.value = player.playerId;
                            playerOptions.appendChild(newButton);
                        });
                    })
                    .catch(error => {console.log("allPlayerTest is error:", error)});
    
    
    
                playerOptions.addEventListener('click', (event) => {
                    if (event.target.tagName === 'BUTTON')
                        {
                            forEachPlayer.value = "1";
                            forEachPlayer.style.backgroundColor = 'white';
                            const playerOptions = forEachPlayer.closest('.chooseUpdatePlayerBlock').querySelector('.playerOptions');
                            //const playerOptions = forEachPlayer.querySelector('.playerOptions');
                            playerOptions.innerHTML = "";
                        const id = event.target.value;
                        //console.log(`${id}`);
                        fetch(`http://localhost:3000/players?player_unique_id=${id}`)
                            .then(res => res.json())
                            .then(data => {
                                console.log(`playerOptions.id: ${playerOptions.id}`);
                                if (playerOptions.id == "highest_batting_average")
                                    forEachPlayer.textContent = `安打王: ${data[0].player_name}`;
                                else if(playerOptions.id == "hitKing")
                                    forEachPlayer.textContent =`打擊王: ${data[0].player_name}`;
                                else if(playerOptions.id == "RBI_player")
                                    forEachPlayer.textContent = `打點王: ${data[0].player_name}`;
                                else if(playerOptions.id == "most_stolen_bases_player")
                                    forEachPlayer.textContent = `盜壘王: ${data[0].player_name}`;
                                else if(playerOptions.id == "homerun_leader_player")
                                    forEachPlayer.textContent = `全壘打王: ${data[0].player_name}`;
                                else if(playerOptions.id == "most_wins_player")
                                    forEachPlayer.textContent = `勝投手: ${data[0].player_name}`;
                                else if(playerOptions.id == "strikeout_leader_player")
                                    forEachPlayer.textContent = `奪三振王: ${data[0].player_name}`;
                                else if(playerOptions.id == "lowest_ERA_player")
                                    forEachPlayer.textContent = `防禦王: ${data[0].player_name}`;
                                else if(playerOptions.id == "most_saves_player")
                                    forEachPlayer.textContent = `最佳救援投手: ${data[0].player_name}`;
                                else if(playerOptions.id == "most_holds_player")
                                    forEachPlayer.textContent = `最佳中繼投手: ${data[0].player_name}`;
                                else
                                    forEachPlayer.textContent = `error`;
                                
                                playerOptions.value = `${data[0].player_unique_id}`;
                                console.log(playerOptions.value);
                                //document.querySelector('.formInput').value = data[0].player_unique_id;                          
                                //console.log(playerOptions.value);
                            })
                            .catch(error => {console.log("player is error:", error)});
                    }   
                });
            }
            else
            {
                forEachPlayer.style.backgroundColor = 'white';
                forEachPlayer.value = "1";
                const playerOptions = forEachPlayer.closest('.chooseUpdatePlayerBlock').querySelector('.playerOptions');
                //const playerOptions = forEachPlayer.querySelector('.playerOptions');
                playerOptions.innerHTML = "";
            }    
        });
    });
    

    const submitButton = document.getElementById('playerUpdateButton');
    submitButton.addEventListener('click', (event) => {
        //console.log("pressButton");
        const highest_batting_average = document.getElementById('highest_batting_average').value;
        const hitKing = document.getElementById('hitKing').value;
        const RBI_player = document.getElementById('RBI_player').value;
        const most_stolen_bases_player = document.getElementById('most_stolen_bases_player').value;
        const homerun_leader_player = document.getElementById('homerun_leader_player').value;
        const most_wins_player = document.getElementById('most_wins_player').value;
        const strikeout_leader_player = document.getElementById('strikeout_leader_player').value;
        const lowest_ERA_player = document.getElementById('lowest_ERA_player').value;
        const most_saves_player = document.getElementById('most_saves_player').value;
        const most_holds_player = document.getElementById('most_holds_player').value;

        const transferData = {  
            "years": 2022,
            "most_hits_player_id": hitKing,
            "highest_batting_average_player_id": highest_batting_average,
            "most_RBI_player_id": RBI_player,
            "most_stolen_bases_player_id": most_stolen_bases_player,
            "homerun_leader_player_id": homerun_leader_player,
            "most_wins_player_id": most_wins_player,
            "strikeout_leader_player_id": strikeout_leader_player,
            "lowest_ERA_player_id": lowest_ERA_player,
            "most_saves_player_id": most_saves_player,
            "most_holds_player_id": most_holds_player,
          }

        console.log(transferData);
        console.log(document.getElementById('year').value);
        //const id = document.querySelector('.formInput').value;
        //console.log(id);
        fetch(`http://localhost:3000/winnerlist/${year}`, {
            'method': 'PATCH',
            'headers': {
                'Content-Type': 'application/json' 
            },
            'body': JSON.stringify(transferData)
        }).then(response => response.json())
          .then(data => console.log("Success:", data))
          .catch(error => console.error("Error:", error));
    });
});

const chooseGame = document.getElementById('chooseGame');
chooseGame.addEventListener('click', (event) => {
    const form = document.querySelector('.formLocation');
    form.innerHTML = `
        <div class="formInput">	
            <h1 class="formTitle">Update game</h1>	
		</div>
    `

    

    const formInput = document.querySelector('.formInput');
    
    function createInputElement(type, placeholder, id) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.id = id;
        return input;
    }
    
    addChooseUpdateGame();

    formInput.appendChild(createInputElement('text', 'Home team', 'game_teamA'));
    formInput.appendChild(createInputElement('text', 'Away team', 'game_teamB'));
    formInput.appendChild(createInputElement('number', 'Home score', 'game_scoreA'));
    formInput.appendChild(createInputElement('number', 'Away score', 'game_scoreB'));
    formInput.appendChild(createInputElement('text', 'hp', 'game_hp'));
    formInput.appendChild(createInputElement('text', '1b', 'game_1b'));
    formInput.appendChild(createInputElement('text', '2b', 'game_2b'));
    formInput.appendChild(createInputElement('text', '3b', 'game_3b'));
    formInput.appendChild(createInputElement('text', 'Num of audience', 'game_audience'));
    formInput.appendChild(createInputElement('text', 'Consume times', 'game_times'));
    formInput.appendChild(createInputElement('text', 'MVP', 'game_mvp'));
    
    

    const button = document.createElement('button');
    button.id = 'gameInsertButton';
    button.className = 'submitButton';
    button.textContent = 'Submit';
    formInput.appendChild(button);
});

/*const chooseBattle = document.getElementById('chooseBattle')
chooseBattle.addEventListener('click', (event) => {
    const formLocation = document.querySelector('.formLocation');
    formLocation.innerHTML = `
        <div class="formInput">
            <h1 class="formTitle">Insert battle</h1>	
        </div>
        
    `
    const formInput = document.querySelector('.formInput');
    addChooseUpdateGame();
	addChooseUpdatePlayer(formInput, '選擇打手', 0);
	addChooseUpdatePlayer(formInput, '選擇投手', 1);

    const select = document.createElement('select');
    select.innerHTML = `
        <option value="1">三振</option>
        <option value="2">一壘安打</option>
        <option value="3">二壘安打</option>
        <option value="4">三壘安打</option>
        <option value="5">全壘打</option>
        <option value="6">失誤</option>
        <option value="7">四壞</option>
        <option value="8">觸身</option>
        <option value="9">滾地出局</option>
        <option value="10">飛球出局</option>
    `
    formInput.appendChild(select);

    const submitBattle = document.createElement('button');
    submitBattle.id = 'submitBattle';
    submitBattle.textContent = 'submit';
    submitBattle.classList.add('submitButton');
    formInput.appendChild(submitBattle);
    //const choosePlayer = blocks[currNum].querySelector('.chooseUpdatePlayer');
    const player = document.querySelectorAll('.chooseUpdatePlayer');
    const chooseGameDateBlock = document.querySelector('.chooseGameDateBlock');
    //chooseG.classList.add('chooseGameDateBlock');
    submitBattle.addEventListener('click', () => {
        const insertData = {
            'game_number': chooseGameDateBlock.id,
            'batter_id': player[0].id,
            'pitcher_id': player[1].id,
            'plate_appearance': select.value
        }
        console.log(insertData);
        fetch(`http://localhost:3000/battle`, {
			'method': 'POST',
			'headers': {
				'ContentType': 'Application/json'
			},
			'body': JSON.stringify(insertData)           
		})
    });
});*/