import { playerSearch, playerSearchUpdatePlayer } from "./playerSearch.js";
const practicechoosePlayer = document.querySelector('.practiceChoosePlayer');
const practice = document.querySelector('.practice');
const practiceInput = document.querySelector('.formInputContent');
playerSearch(practicechoosePlayer, practice, practiceInput, playerSearchUpdatePlayer);

const submitButton = document.getElementById('playerUpdateButton');
submitButton.addEventListener('click', (event) => {
    console.log(practicechoosePlayer.value);
    const noChoosePlayerMessage = document.getElementById('player-no-choose-error-message');
    if (practicechoosePlayer.value === '') 
    {
        noChoosePlayerMessage.style.display = 'block';
        document.getElementById('player_name_block').style.marginBottom = '33px';
        console.log("no value");
        return;
    }
    else 
    {
        noChoosePlayerMessage.style.display = 'none';
        document.getElementById('player_name_block').style.marginBottom = '25px';
    }

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
    const team = document.getElementById('player_team').value;

    
    let isValid = true;
    const heightErrorMessage = document.getElementById('height-error-message');
    const weightErrorMessage = document.getElementById('weight-error-message');
    const nameErrorMessage = document.getElementById('name-error-message');
    const numberErrorMessage = document.getElementById('number-error-message');
    const birthdayErrorMessage = document.getElementById('birthday-error-message');
    const debutErrorMessage = document.getElementById('debut-error-message');
    const nationalityErrorMessage = document.getElementById('nationality-error-message');
    const positionErrorMessage = document.getElementById('position-error-message');
    const teamErrorMessage = document.getElementById('team-error-message');
    console.log((number.length == 0)? 0 : Number(number));


    
    if (name.length === 0) {
        nameErrorMessage.style.display = 'block';
        document.getElementById('player_name').style.border = '1px solid red';
        //document.getElementById('player_name_tag').style.color = 'red';
        document.getElementById('player_name_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        nameErrorMessage.style.display = 'none';
        document.getElementById('player_name').style.border = '1px solid black';
        // document.getElementById('player_name_tag').style.color = 'black';
        document.getElementById('player_name_block').style.marginBottom = '25px';
    }
    
    if (number.length == 0) {
        numberErrorMessage.style.display = 'block';
        document.getElementById('player_number').style.border = '1px solid red';
        //document.getElementById('player_number_tag').style.color = 'red';
        document.getElementById('player_number_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        numberErrorMessage.style.display = 'none';
        document.getElementById('player_number').style.border = '1px solid black';
        //document.getElementById('player_number_tag').style.color = 'black';
        document.getElementById('player_number_block').style.marginBottom = '25px';
    }
    
    heightErrorMessage.style.display = 'none';
    if (height < 100 || height > 330) {
        heightErrorMessage.style.display = 'block';
        document.getElementById('player_height').style.border = '1px solid red';
        //document.getElementById('player_height_tag').style.color = 'red';
        document.getElementById('player_height_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('player_height').style.border = '1px solid black';
        //document.getElementById('player_height_tag').style.color = 'black';
        document.getElementById('player_height_block').style.marginBottom = '25px';
    }
    
    weightErrorMessage.style.display = 'none';
    if (weight < 40 || weight > 200) {
        weightErrorMessage.style.display = 'block';
        document.getElementById('player_weight').style.border = '1px solid red';
        //document.getElementById('player_weight_tag').style.color = 'red';
        document.getElementById('player_weight_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('player_weight').style.border = '1px solid black';
        //document.getElementById('player_weight_tag').style.color = 'black';
        document.getElementById('player_weight_block').style.marginBottom = '25px';
    }
    
    birthdayErrorMessage.style.display = 'none';
    if (birthday.length === 0) {
        birthdayErrorMessage.style.display = 'block';
        document.getElementById('player_birthday').style.border = '1px solid red';
        //document.getElementById('player_birthday_tag').style.color = 'red';
        document.getElementById('player_birthday_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('player_birthday').style.border = '1px solid black';
        //document.getElementById('player_birthday_tag').style.color = 'black';
        document.getElementById('player_birthday_block').style.marginBottom = '25px';
    }
    
    debutErrorMessage.style.display = 'none';
    if (debut.length === 0) {
        debutErrorMessage.style.display = 'block';
        document.getElementById('player_debut').style.border = '1px solid red';
        //document.getElementById('player_debut_tag').style.color = 'red';
        document.getElementById('player_debut_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('player_debut').style.border = '1px solid black';
        //document.getElementById('player_debut_tag').style.color = 'black';
        document.getElementById('player_debut_block').style.marginBottom = '25px';
    }
    
    nationalityErrorMessage.style.display = 'none';
    if (nationality.length === 0) {
        nationalityErrorMessage.style.display = 'block';
        document.getElementById('player_nationality').style.border = '1px solid red';
        //document.getElementById('player_nationality_tag').style.color = 'red';
        document.getElementById('player_nationality_block').style.marginBottom = '33px';
        isValid = false;
    } else {
        document.getElementById('player_nationality').style.border = '1px solid black';
        //document.getElementById('player_nationality_tag').style.color = 'black';
        document.getElementById('player_nationality_block').style.marginBottom = '25px';
    }
    
    positionErrorMessage.style.display = 'none';
    if (position.length === 0) {
        positionErrorMessage.style.display = 'block';
        isValid = false;
        document.getElementById('player_position').style.border = '1px solid red';
        //document.getElementById('player_position_tag').style.color = 'red';
        document.getElementById('player_position_block').style.marginBottom = '33px';
    } else {
        document.getElementById('player_position').style.border = '1px solid black';
        //document.getElementById('player_position_tag').style.color = 'black';
        document.getElementById('player_position_block').style.marginBottom = '25px';
    }
    
    teamErrorMessage.style.display = `none`;
    if (team.length === 0) {
        teamErrorMessage.style.display = 'block';
        isValid = false;
        document.getElementById('player_team').style.border = '1px solid red';
        //document.getElementById('player_position_tag').style.color = 'red';
        document.getElementById('player_team_block').style.marginBottom = '33px';
    } else {
        document.getElementById('player_team').style.border = '1px solid black';
        //document.getElementById('player_position_tag').style.color = 'black';
        document.getElementById('player_team_block').style.marginBottom = '25px';
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
            "position": position,
            "team": team
        }

        console.log(transferData);
        const id = practicechoosePlayer.value;
        console.log(id);
        fetch(`/players/${id}`, {
            'method': 'PATCH',
            'headers': {
                'Content-Type': 'application/json' 
            },
            'body': JSON.stringify(transferData)
        }).then(response => response.json())
        .then(data => alert(`Success`)) 
        .catch(error => console.log(`error`));
    
    }
});