export function playerSearch(choosePlayer, practice, practiceInput, useFunction)
{
    //const choosePlayer = document.querySelector('.choosePlayer');
    choosePlayer.addEventListener('click', (event) => {
        //const practice = document.querySelector('.practice');
        
        practice.style.width = '1000px';
        practice.style.height = '600px';

        const body = document.body;
        body.classList.add('no-scroll');
        body.classList.add('disable-interaction');
        practice.classList.remove('disable-interaction');

        function addFunction()
        {
            practice.innerHTML = `
                <input type="text" class="practiceSearch" placeholder="player name">
                <button class="practiceExit">x</button>
                <div class="practiceGrid">
                </div>
            `
            function searchPlayerFunction(name)
            {
                const practiceSearch = document.querySelector('.practiceSearch');
                const practiceGrid = document.querySelector('.practiceGrid');
                practiceGrid.innerHTML = "";
                if (name.length === 0) return;
                fetch(`/search_player_bypartname?player_name=${name}`)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach((player)=>{
                            const button = document.createElement('button');
                            button.classList.add('practiceButton');
                            button.textContent = player.player_name;
                            button.id = player.player_unique_id;

                            button.addEventListener('click', ()=>{
                                choosePlayer.value = button.id;
                                console.log(choosePlayer.value);
                                //player_name
                                useFunction(button.id, button.textContent, practiceInput);
                                //choosePlayer.textContent = button.textContent;
                                //console.log(button.id)
                                //console.log(button.textContent)
                                //playerSearchUpdatePlayer(button.id);
                                exit();
                            });
                            practiceGrid.appendChild(button);

                            
                        });
                    })
                    .catch(error => {console.log('error', error)});
            }
            const practiceExit = document.querySelector('.practiceExit');
            practiceExit.addEventListener('click', ()=>{
                exit();
                console.log('exit');
            });

            const practiceSearch = document.querySelector('.practiceSearch');
            practiceSearch.addEventListener('input', () => {
                searchPlayerFunction(practiceSearch.value);
                console.log(practiceSearch.value);
            });

            function exit()
            {
                practice.innerHTML = "";
                body.classList.remove('no-scroll');
                body.classList.remove('disable-interaction');
                practice.style.width = '0px';
                practice.style.height = '0px';
            }

        }
        setTimeout(addFunction, 120);
    });
}

export function playerSearchUpdateWinnerList(id, text, practiceInput)
{
    practiceInput.value = text;
    //console.log(text);
    /*
    fetch(`/players/searchplayer?player_unique_id=${id}`)
	.then(res => res.json())
	.then(data => {
        
    }).catch(error => {console.log("error", error)});*/
}

export function playerSearchUpdatePlayer(id, text, practiceInput)
{
    practiceInput.value = text;
    console.log(id);
    fetch(`/players/searchplayer?player_unique_id=${id}`)
	.then(res => res.json())
	.then(data => {
        console.log(data);
        const dateString1 = data[0].born;
        const dateString2 = data[0].debut;
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);

        // Reset the time to midnight (00:00:00)
        const dateOnly = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const dateOnly2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

        // Format the date as "YYYY-MM-DD"
        const formattedDate = dateOnly.toISOString().split('T')[0];
        const formattedDate2 = dateOnly2.toISOString().split('T')[0];

        console.log(formattedDate); // Output: "2024-12-25"
        document.getElementById('player_name').value = data[0].player_name;
        document.getElementById('player_number').value = data[0].number;
        document.getElementById('player_height').value = data[0].height;
        document.getElementById('player_weight').value = data[0].weight;
        document.getElementById('player_tb').value = data[0].t_b;
        document.getElementById('player_birthday').value = formattedDate;
        document.getElementById('player_debut').value = formattedDate2;
        document.getElementById('player_nationality').value = data[0].nationality;
        document.getElementById('player_draft_order').value = data[0].draft_order;
        document.getElementById('player_position').value = data[0].position;
        document.getElementById('player_team').value = data[0].team;
    }).catch(error => {console.log("error", error)});
}