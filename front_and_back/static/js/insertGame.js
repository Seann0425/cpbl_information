const gameInsertButton = document.getElementById('gameInsertButton');
gameInsertButton.addEventListener('click', (event)=>{
    let isValid = true;

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
    if (gameDate.length === 0) {
        gameDateErrorMessage.style.display = 'block';
        document.getElementById('game_date').style.border = '1px solid red';
        document.getElementById('game_date_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_date').style.border = '1px solid black';
        document.getElementById('game_date_block').style.marginBottom = '25px';
    }

    teamAErrorMessage.style.display = 'none';
    if (teamA.length === 0) {
        teamAErrorMessage.style.display = 'block';
        document.getElementById('game_teamA').style.border = '1px solid red';
        document.getElementById('game_teamA_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_teamA').style.border = '1px solid black';
        document.getElementById('game_teamA_block').style.marginBottom = '25px';
    }

    teamBErrorMessage.style.display = 'none';
    if (teamB.length === 0) {
        teamBErrorMessage.style.display = 'block';
        document.getElementById('game_teamB').style.border = '1px solid red';
        document.getElementById('game_teamB_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_teamB').style.border = '1px solid black';
        document.getElementById('game_teamB_block').style.marginBottom = '25px';
    }

    scoreAErrorMessage.style.display = 'none';
    if (scoreA.length === 0 || isNaN(scoreA)) {
        scoreAErrorMessage.style.display = 'block';
        document.getElementById('game_scoreA').style.border = '1px solid red';
        document.getElementById('game_scoreA_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_scoreA').style.border = '1px solid black';
        document.getElementById('game_scoreA_block').style.marginBottom = '25px';
    }

    scoreBErrorMessage.style.display = 'none';
    if (scoreB.length === 0 || isNaN(scoreB)) {
        scoreBErrorMessage.style.display = 'block';
        document.getElementById('game_scoreB').style.border = '1px solid red';
        document.getElementById('game_scoreB_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_scoreB').style.border = '1px solid black';
        document.getElementById('game_scoreB_block').style.marginBottom = '25px';
    }

    hpErrorMessage.style.display = 'none';
    if (hp.length === 0) {
        hpErrorMessage.style.display = 'block';
        document.getElementById('game_hp').style.border = '1px solid red';
        document.getElementById('game_hp_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_hp').style.border = '1px solid black';
        document.getElementById('game_hp_block').style.marginBottom = '25px';
    }

    _1bErrorMessage.style.display = 'none';
    if (_1b.length === 0) {
        _1bErrorMessage.style.display = 'block';
        document.getElementById('game_1b').style.border = '1px solid red';
        document.getElementById('game_1b_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_1b').style.border = '1px solid black';
        document.getElementById('game_1b_block').style.marginBottom = '25px';
    }

    _2bErrorMessage.style.display = 'none';
    if (_2b.length === 0) {
        _2bErrorMessage.style.display = 'block';
        document.getElementById('game_2b').style.border = '1px solid red';
        document.getElementById('game_2b_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_2b').style.border = '1px solid black';
        document.getElementById('game_2b_block').style.marginBottom = '25px';
    }

    _3bErrorMessage.style.display = 'none';
    if (_3b.length === 0) {
        _3bErrorMessage.style.display = 'block';
        document.getElementById('game_3b').style.border = '1px solid red';
        document.getElementById('game_3b_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_3b').style.border = '1px solid black';
        document.getElementById('game_3b_block').style.marginBottom = '25px';
    }

    audienceErrorMessage.style.display = 'none';
    if (audience.length === 0 || isNaN(audience)) {
        audienceErrorMessage.style.display = 'block';
        document.getElementById('game_audience').style.border = '1px solid red';
        document.getElementById('game_audience_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_audience').style.border = '1px solid black';
        document.getElementById('game_audience_block').style.marginBottom = '25px';
    }

    timesErrorMessage.style.display = 'none';
    if (gameTimes.length === 0) {
        timesErrorMessage.style.display = 'block';
        document.getElementById('game_times').style.border = '1px solid red';
        document.getElementById('game_times_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('game_times').style.border = '1px solid black';
        document.getElementById('game_times_block').style.marginBottom = '25px';
    }

    mvpErrorMessage.style.display = 'none';
    if (mvp.length === 0) {
        mvpErrorMessage.style.display = 'block';
        document.getElementById('game_mvp').style.border = '1px solid red';
        document.getElementById('game_mvp_block').style.marginBottom = '33px';
    }
    else {
        document.getElementById('game_mvp').style.border = '1px solid black';
        document.getElementById('game_mvp_block').style.marginBottom = '25px';
    }
    if (isValid)
    {
        const transferData = {
            "game_date": gameDate,
            "home_team": teamA,
            "away_team": teamB,
            "home_score": scoreA,
            "away_score": scoreB,
            "hp": hp,
            "first_base": _1b,
            "second_base": _2b,
            "third_base": _3b,
            "audience": audience,
            "game_time": gameTimes
            };
            
    
    
            console.log(transferData);
    
            fetch(`/insert_game`, {
                'method': 'POST',
                'headers': {
                    "Content-Type": "application/json"
                },
                'body': JSON.stringify(transferData)           
            }).then(response => response.json())
            .then(data => alert(`Success`)) 
        .catch(error => console.log(`error`));
    }
    
})