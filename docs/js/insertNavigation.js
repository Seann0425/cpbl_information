import { addChoosePlayer } from './choosePlayer';
import { addChooseGame } from './chooseGame';

const choosePlayer = document.getElementById('choosePlayer');
choosePlayer.addEventListener('click', (event) => {
    const form = document.querySelector('.formLocation');
    form.innerHTML = `
        <div class="formInput">
            <h1 class="formTitle">Insert Player</h1>
            <input type="text" placeholder="Name" id="player_name">
            <input type="number" placeholder="Number" id="player_number">
            <input type="number" placeholder="Height" id="player_height">
            <input type="number" placeholder="Weight" id="player_weight">
            <select id="player_tb">
				<option value="右投右打">右投右打</option>
				<option value="右投左打">右投左打</option>
				<option value="左投右打">左投右打</option>
				<option value="左投左打">左投左打</option>
			</select>
            <label for="player_birthday">Birthday</label>
            <input type="date" placeholder="Birthday" id="player_birthday">
            <label for="player_debut">Debut</label>
            <input type="date" placeholder="Debut" id="player_debut">
            <input type="text" placeholder="nationality" id="player_nationality">
            <input type="text" placeholder="Draft Order" id="player_draft_order">
            <input type="text" placeholder="Position" id="player_position">
            <button id="playerInsertButton" class="submitButton">Submit</button>
        </div>
    `;

    // Now add the event listener after the button is created
    const submitButton = document.getElementById('playerInsertButton');
    submitButton.addEventListener('click', (event) => {
        const name = document.getElementById('player_name').value;
        const number = document.getElementById('player_number').value;
        const height = document.getElementById('player_height').value;
        const weight = document.getElementById('player_weight').value;
        const tb = document.getElementById('player_tb').value;
        const birthday = document.getElementById('player_birthday').value;
        const debut = document.getElementById('player_debut').value;
        const nationality = document.getElementById('player_nationality').value;
        const draftOrder = document.getElementById('player_draft_order').value;
        const position = document.getElementById('player_position').value;


        const transferData = {
            "player_name": name,
            "number": number,
            "t_b": tb,
            "height": height,
            "weight": weight,
            "born": birthday,
            "debut": debut,
            "nationality": nationality,
            "draft_order": draftOrder,
            "position": position
        }

        console.log(transferData);
        
        fetch(`http://localhost:3000/players`, {
            'method': 'POST',
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
chooseGame.addEventListener('click', (event)=>{
    const form = document.querySelector('.formLocation');
    form.innerHTML = `
        <div class="formInput">
			<h1 class="formTitle">Insert game</h1>
			
			<label for="player_birthday">Birthday</label>
			<input type="date" placeholder="Date of the competition" id="game_date">

			<input type="text" placeholder="Home team" id="game_teamA">
	
			<input type="number" placeholder="Away team" id="game_teamB">
	
			<input type="number" placeholder="Home score" id="game_scoreA">
	
			<input type="number" placeholder="Away score" id="game_scoreB">
	
			<input type="text" placeholder="hp" id="game_hp">
			
			<input type="text" placeholder="1b" id="game_1b">


			<input type="text" placeholder="2b" id="game_2b">

			<input type="text" placeholder="3b" id="game_3b">

			<input type="text" placeholder="Num of audience" id="game_audience">

			<input type="text" placeholder="Consume times" id="game_times">

			<input type="text" placeholder="MVP" id="game_mvp">

			<button id="gameInsertButton" class="submitButton">Submit</button>
		</div>
		
    `
	const gameInsertButton = document.getElementById('gameInsertButton');
	gameInsertButton.addEventListener('click', ()=>{
		const gameDate = document.getElementById('game_date').value;
		const teamA = document.getElementById('game_teamA').value;
		const teamB = document.getElementById('game_teamB').value;
		const scoreA = document.getElementById('game_scoreA').value;
		const scoreB = document.getElementById('game_scoreB').value;
		const _hp = document.getElementById('game_hp').value;
		const _1b = document.getElementById('game_1b').value;
		const _2b = document.getElementById('game_2b').value;
		const _3b = document.getElementById('game_3b').value;
		const audience = document.getElementById('game_audience').value;
		const gameTimes = document.getElementById('game_times').value;
		const mvp = document.getElementById('game_mvp').value;

		const transferData = {
		"game_date": gameDate,
		"home_team": teamA,
		"away_team": teamB,
		"home_score": scoreA,
		"away_score": scoreB,
		"HP": _hp,
		"1B": _1b,
		"2B": _2b,
		"3B": _3b,
		"audience": audience,
		"time": gameTimes,
		"mvp_player": mvp
		};

		console.log(transferData);

		fetch(`http://localhost:3000/games`, {
			'method': 'POST',
			'headers': {
				'ContentType': 'Application/json'
			},
			'body': JSON.stringify(transferData)           
		})
	})
})


const chooseBattle = document.getElementById('chooseBattle');
chooseBattle.addEventListener('click', (event)=>{
    const formLocation = document.querySelector('.formLocation');
    formLocation.innerHTML = `
        <div class="formInput">
        </div>
        
    `
    const formInput = document.querySelector('.formInput');
    addChooseGame();
	addChoosePlayer(formInput, 'chooseFirst', 0);
	addChoosePlayer(formInput, 'chooseSecond', 1);
});
