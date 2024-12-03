import { addChooseGame } from "./chooseGame.js";
import { addChoosePlayer } from "./choosePlayer.js";



const choosePlayer = document.getElementById('choosePlayer');
choosePlayer.addEventListener('click', (event) => {
    const form = document.querySelector('.formLocation');
    form.innerHTML = `
        <div class="formInput">
            <h1 class="formTitle">Insert Player</h1>
            <input type="text" placeholder="Name" id="player_name" maxlength="20" required>
            <div id="name-error-message" style="color: red; display: none;">請輸入名子！</div>
            <input type="number" placeholder="Number" id="player_number">
            <div id="number-error-message" style="color: red; display: none;">請輸入號碼！</div>
            <input type="number" placeholder="Height" id="player_height" max="300" min="100">
            <div id="height-error-message" style="color: red; display: none;">請輸入合理的身高！</div>
            <input type="number" placeholder="Weight" id="player_weight">
            <div id="weight-error-message" style="color: red; display: none;">請輸入合理的體重！</div>
            <select id="player_tb">
				<option value="右投右打">右投右打</option>
				<option value="右投左打">右投左打</option>
				<option value="左投右打">左投右打</option>
				<option value="左投左打">左投左打</option>
			</select>
            <label for="player_birthday">Birthday</label>
            <input type="date" placeholder="Birthday" id="player_birthday">
            <div id="birthday-error-message" style="color: red; display: none;">請選擇生日！</div>
            <label for="player_debut">Debut</label>
            <input type="date" placeholder="Debut" id="player_debut">
            <div id="debut-error-message" style="color: red; display: none;">請選擇Debut！</div>
            <input type="text" placeholder="nationality" id="player_nationality">
            <div id="nationality-error-message" style="color: red; display: none;">請輸入國籍！</div>
            <input type="text" placeholder="Draft Order (Option)" id="player_draft_order" maxlength="20">
            <input type="text" placeholder="Position" id="player_position">
            <div id="position-error-message" style="color: red; display: none;">請輸入位置！</div>
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

        
        let isValid = true;
        const heightErrorMessage = document.getElementById('height-error-message');
        const weightErrorMessage = document.getElementById('weight-error-message');
        const nameErrorMessage = document.getElementById('name-error-message');
        const numberErrorMessage = document.getElementById('number-error-message');
        const birthdayErrorMessage = document.getElementById('birthday-error-message');
        const debutErrorMessage = document.getElementById('debut-error-message');
        const nationalityErrorMessage = document.getElementById('nationality-error-message');
        const positionErrorMessage = document.getElementById('position-error-message');
        console.log((number.length == 0)? 0 : Number(number));


        numberErrorMessage.style.display = 'none';
        if (number.length === 0 || isNaN(number)) {
            numberErrorMessage.style.display = 'block';
            isValid = false;
        }
        heightErrorMessage.style.display = 'none';
        if (height < 100 || height > 300) {
            heightErrorMessage.style.display = 'block';
            isValid = false;
        }

        weightErrorMessage.style.display = 'none';
        if (weight < 40 || weight > 200) {
            weightErrorMessage.style.display = 'block';
            isValid = false;
        }

        nameErrorMessage.style.display = 'none';
        if (name.length == 0) {
            nameErrorMessage.style.display = 'block';
            isValid = false;
        }

        // 檢查生日
        birthdayErrorMessage.style.display = 'none';
        if (birthday.length === 0) {
            birthdayErrorMessage.style.display = 'block';
            isValid = false;
        }

        // 檢查出道日期
        debutErrorMessage.style.display = 'none';
        if (debut.length === 0) {
            debutErrorMessage.style.display = 'block';
            isValid = false;
        }

        // 檢查國籍
        nationalityErrorMessage.style.display = 'none';
        if (nationality.length === 0) {
            nationalityErrorMessage.style.display = 'block';
            isValid = false;
        }

        // 檢查位置
        positionErrorMessage.style.display = 'none';
        if (position.length === 0) {
            positionErrorMessage.style.display = 'block';
            isValid = false;
        }


        if (isValid)
        {
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
        
        }
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
            <div id="game_date-error-message" style="color: red; display: none;">請輸入比賽日期！</div>

            <input type="text" placeholder="Home team" id="game_teamA">
            <div id="game_teamA-error-message" style="color: red; display: none;">請輸入主隊名稱！</div>

            <input type="number" placeholder="Away team" id="game_teamB">
            <div id="game_teamB-error-message" style="color: red; display: none;">請輸入有效的客隊名稱或編號！</div>

            <input type="number" placeholder="Home score" id="game_scoreA">
            <div id="game_scoreA-error-message" style="color: red; display: none;">請輸入主隊分數！</div>

            <input type="number" placeholder="Away score" id="game_scoreB">
            <div id="game_scoreB-error-message" style="color: red; display: none;">請輸入客隊分數！</div>

            <input type="text" placeholder="hp" id="game_hp">
            <div id="game_hp-error-message" style="color: red; display: none;">請輸入 HP！</div>

            <input type="text" placeholder="1b" id="game_1b">
            <div id="game_1b-error-message" style="color: red; display: none;">請輸入 1B！</div>

            <input type="text" placeholder="2b" id="game_2b">
            <div id="game_2b-error-message" style="color: red; display: none;">請輸入 2B！</div>

            <input type="text" placeholder="3b" id="game_3b">
            <div id="game_3b-error-message" style="color: red; display: none;">請輸入 3B！</div>

            <input type="text" placeholder="Num of audience" id="game_audience">
            <div id="game_audience-error-message" style="color: red; display: none;">請輸入有效的觀眾數！</div>

            <input type="text" placeholder="Consume times" id="game_times">
            <div id="game_times-error-message" style="color: red; display: none;">請輸入消耗時間！</div>

            <input type="text" placeholder="MVP" id="game_mvp">
            <div id="game_mvp-error-message" style="color: red; display: none;">請輸入 MVP！</div>

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
		const hp = document.getElementById('game_hp').value;
		const _1b = document.getElementById('game_1b').value;
		const _2b = document.getElementById('game_2b').value;
		const _3b = document.getElementById('game_3b').value;
		const audience = document.getElementById('game_audience').value;
		const gameTimes = document.getElementById('game_times').value;
		const mvp = document.getElementById('game_mvp').value;


        const gameDateErrorMessage = document.getElementById('game_date-error-message');
        const teamAErrorMessage = document.getElementById('game_teamA-error-message');
        const teamBErrorMessage = document.getElementById('game_teamB-error-message');
        const scoreAErrorMessage = document.getElementById('game_scoreA-error-message');
        const scoreBErrorMessage = document.getElementById('game_scoreB-error-message');
        const hpErrorMessage = document.getElementById('game_hp-error-message');
        const _1bErrorMessage = document.getElementById('game_1b-error-message');
        const _2bErrorMessage = document.getElementById('game_2b-error-message');
        const _3bErrorMessage = document.getElementById('game_3b-error-message');
        const audienceErrorMessage = document.getElementById('game_audience-error-message');
        const timesErrorMessage = document.getElementById('game_times-error-message');
        const mvpErrorMessage = document.getElementById('game_mvp-error-message');

        gameDateErrorMessage.style.display = 'none';
        teamAErrorMessage.style.display = 'none';
        teamBErrorMessage.style.display = 'none';
        scoreAErrorMessage.style.display = 'none';
        scoreBErrorMessage.style.display = 'none';
        hpErrorMessage.style.display = 'none';
        _1bErrorMessage.style.display = 'none';
        _2bErrorMessage.style.display = 'none';
        _3bErrorMessage.style.display = 'none';
        audienceErrorMessage.style.display = 'none';
        timesErrorMessage.style.display = 'none';
        mvpErrorMessage.style.display = 'none';

        let isValid = true;
        
        if (gameDate.length === 0) {
            gameDateErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (teamA.length === 0) {
            teamAErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (teamB.length === 0 || isNaN(teamB)) {
            teamBErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (scoreA.length === 0 || isNaN(scoreA)) {
            scoreAErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (scoreB.length === 0 || isNaN(scoreB)) {
            scoreBErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (hp.length === 0) {
            hpErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (_1b.length === 0) {
            _1bErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (_2b.length === 0) {
            _2bErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (_3b.length === 0) {
            _3bErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (audience.length === 0 || isNaN(audience)) {
            audienceErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (gameTimes.length === 0) {
            timesErrorMessage.style.display = 'block';
            isValid = false;
        }
    
        if (mvp.length === 0) {
            mvpErrorMessage.style.display = 'block';
            isValid = false;
        }
        if (isValid)
        {
            const transferData = {
                "game_date": gameDate,
                "home_team": teamA,
                "away_team": teamB,
                "home_score": scoreA,
                "away_score": scoreB,
                "HP": hp,
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
        }
		
	})
})


const chooseBattle = document.getElementById('chooseBattle');
chooseBattle.addEventListener('click', (event)=>{
    const formLocation = document.querySelector('.formLocation');
    formLocation.innerHTML = `
        <div class="formInput">
            <h1 class="formTitle">Insert battle</h1>
            <input type="text" placeholder="比賽編號" id="game_number">
            <input type="text" placeholder="batter" id="batter">
            <input type="text" placeholder="pitcher" id="pitcher">
            <select>
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
            </select>
            <button id="battleInsertButton" class="submitButton">Submit</button>
        </div>
        
    `



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
});

