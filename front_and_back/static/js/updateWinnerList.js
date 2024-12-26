import { playerSearch, playerSearchUpdateWinnerList } from "./playerSearch.js";

const year = document.getElementById('updateWinnerListChooseYear');
for (let i = 2023; i >= 1990; i--)
{
    const optionChild = document.createElement('option');
    optionChild.textContent = i;
    optionChild.value = i;
    year.appendChild(optionChild);
}

function yearUpdateWinnerList()
{
    fetch(`/winnerlist/searchyear?years=${year.value}`)
    .then(res => res.json())
    .then(async winnerData => {
        async function fetchPlayer(playerId) {
            try {
                const res = await fetch(`/players/searchplayer?player_unique_id=${playerId}`);
                const data = await res.json();
                return data[0].player_name;
            } catch (error) {
                console.log("error", error);
                return ''; // return empty string in case of error
            }
        }
    
        document.getElementById('player_highest_batting').value = await fetchPlayer(winnerData[0].most_hits_player_id);
        document.getElementById('player_hitKing').value =  await fetchPlayer(winnerData[0].highest_batting_average_player_id);
        document.getElementById('player_most_stolen_bases').value = await fetchPlayer(winnerData[0].most_stolen_bases_player_id);
        document.getElementById('player_RBI').value = await fetchPlayer(winnerData[0].most_RBI_player_id);
        document.getElementById('player_most_wins').value =  await fetchPlayer(winnerData[0].most_wins_player_id);
        document.getElementById('player_most_saves').value = await fetchPlayer(winnerData[0].most_saves_player_id);
        document.getElementById('player_most_holds').value = await fetchPlayer(winnerData[0].most_holds_player_id);
        document.getElementById('player_strikeout').value = await fetchPlayer(winnerData[0].strikeout_leader_player_id);
        document.getElementById('player_homerun').value = await fetchPlayer(winnerData[0].homerun_leader_player_id);
        document.getElementById('player_lowest_ERA').value = await fetchPlayer(winnerData[0].lowest_ERA_player_id);
    
        document.getElementById('player_hitKing_id').value = winnerData[0].most_hits_player_id;
        document.getElementById('player_highest_batting_id').value = winnerData[0].highest_batting_average_player_id;
        document.getElementById('player_most_stolen_bases_id').value = winnerData[0].most_stolen_bases_player_id;
        document.getElementById('player_RBI_id').value = winnerData[0].most_RBI_player_id;
        document.getElementById('player_most_wins_id').value = winnerData[0].most_wins_player_id;
        document.getElementById('player_most_saves_id').value = winnerData[0].most_saves_player_id;
        document.getElementById('player_most_holds_id').value = winnerData[0].most_holds_player_id;
        document.getElementById('player_strikeout_id').value = winnerData[0].strikeout_leader_player_id;
        document.getElementById('player_homerun_id').value = winnerData[0].homerun_leader_player_id;
        document.getElementById('player_lowest_ERA_id').value = winnerData[0].lowest_ERA_player_id;
    })
    .catch(error => {console.log("error: ", error)});
}


yearUpdateWinnerList();

year.addEventListener('change', ()=>{
    yearUpdateWinnerList();
})

const formInputBlock = document.querySelectorAll('.formInputBlock');
formInputBlock.forEach((block, index) => {
    //console.log(block);
    if (index === 0) return;
    const practice = block.querySelector('.practice');
    const practiceChoosePlayer = block.querySelector('.practiceChoosePlayer');
    const practiceInput = block.querySelector('.formInputContent');
    //console.log(practice, practiceChoosePlayer, practiceInput);
    playerSearch(practiceChoosePlayer, practice, practiceInput, playerSearchUpdateWinnerList);
});

const submitButton = document.getElementById('WinnerListUpdateButton');
submitButton.addEventListener('click', (event) => {
    const highest_batting_average = document.getElementById('player_highest_batting_id').value;
    const hitKing = document.getElementById('player_hitKing_id').value;
    const RBI_player = document.getElementById('player_RBI_id').value;
    const most_stolen_bases_player = document.getElementById('player_most_stolen_bases_id').value;
    const homerun_leader_player = document.getElementById('player_homerun_id').value;
    const most_wins_player = document.getElementById('player_most_wins_id').value;
    const strikeout_leader_player = document.getElementById('player_strikeout_id').value;
    const lowest_ERA_player = document.getElementById('player_lowest_ERA_id').value;
    const most_saves_player = document.getElementById('player_most_saves_id').value;
    const most_holds_player = document.getElementById('player_most_holds_id').value;


    const transferData = {  
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

    //console.log(transferData);
    //console.log(year.value);
    fetch(`/winnerlist/${year.value}`, {
        'method': 'PATCH',
        'headers': {
            'Content-Type': 'application/json' 
        },
        'body': JSON.stringify(transferData)
    }).then(response => response.json())
        .then(data => alert(`Success`)) 
        .catch(error => console.log(`error`));
});