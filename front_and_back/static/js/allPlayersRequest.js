fetch('/player/getallplayer')
    .then(res => res.json())
    .then(data => {
        console.log('a');
        console.log(data);
        const brotherelephant = document.getElementById('brotherelephant');
        const kingkon = document.getElementById('kingkon');
        const whale = document.getElementById('whale');
        const tiger = document.getElementById('tiger');
        const team_logo_lions_500x500 = document.getElementById('team_logo_lions_500x500');
        const dragon = document.getElementById('dragon');
        const bear = document.getElementById('bear');
        const eagle = document.getElementById('eagle');
        const ox = document.getElementById('ox');
        const snake = document.getElementById('snake');
        const Lamigo = document.getElementById('Lamigo');
        const Dmedia = document.getElementById('Dmedia');
        const rhino = document.getElementById('(rhino');
        const brother = document.getElementById('brother');
        const Fubon_Guardians = document.getElementById('Fubon_Guardians');
        const Rakuten_Monkeys = document.getElementById('Rakuten_Monkeys');
        const TsgHawks = document.getElementById('TsgHawks');
        const baseball = document.getElementById('baseball');
        data.forEach((player)=>{
            const button = document.createElement('button');
            button.classList.add('playerButton');
            button.id = player.player_unique_id;
            button.textContent = player.player_name;
            button.addEventListener('click', ()=>{
                const id = button.id;
                console.log(`${id}`);
                window.location.href = `/player?id=${id}`;
            });
            console.log(player.team);
            switch(player.team) {
                case '兄弟':
                case '兄弟二軍':
                    brotherelephant.appendChild(button);
                    break;
                case '中信':
                case '中信二軍':
                    whale.appendChild(button);
                    break;
                case '三商':
                    tiger.appendChild(button);
                    break;
                case '統一7-ELEVEn獅':
                case '統一7-ELEVEn獅二軍':
                    team_logo_lions_500x500.appendChild(button);
                    break;
                case '味全龍':
                case '味全龍二軍':
                    dragon.appendChild(button);
                    break;
                case '俊國':
                    bear.appendChild(button);
                    break;
                case '時報':
                    eagle.appendChild(button);
                    break;
                case '興農':
                case '興農二軍':
                    ox.appendChild(button);
                    break;
                case '第一':
                    kingkon.appendChild(button);
                    break;
                case '誠泰':
                    snake.appendChild(button);
                    break;
                case 'Lamigo':
                case 'Lamigo二軍':
                    Lamigo.appendChild(button);
                    break;
                case '米迪亞':
                    Dmedia.appendChild(button);
                    break;
                case '義大':
                case '義大二軍':
                    rhino.appendChild(button);
                    break;
                case '中信兄弟':
                case '中信兄弟二軍':
                    brother.appendChild(button);
                    break;
                case '富邦悍將':
                case '富邦悍將二軍':
                    Fubon_Guardians.appendChild(button);
                    break;
                case '樂天桃猿':
                case '樂天桃猿二軍':
                    Rakuten_Monkeys.appendChild(button);
                    break;
                case '台鋼雄鷹':
                case '台鋼雄鷹二軍':
                    TsgHawks.appendChild(button);
                    break;
                default:
                    baseball.append(button);
                    break;
            }
        });
        console.log(brotherelephant);
        console.log(kingkon);
    })
    .catch(error => {
        console.error('Error fetching player data:', error);
    });

/*
fetch('/player/getallplayer')
    .then(res => res.json())
    .then(data => {
        console.log('success');
        const toAddDiv = document.getElementById('allTeams');
        data.forEach(oneTeam => {
            const addDiv = document.createElement('div');
            addDiv.classList.add('team');

            const allNames = document.createElement('div');
            allNames.classList.add('player_grid');

            oneTeam.eachName.forEach(nameInfo => {
                const nameButton = document.createElement('button');
                nameButton.classList.add('playerButton');
                nameButton.textContent = nameInfo;  // Set the name as the button text
                allNames.appendChild(nameButton);
            });

            addDiv.innerHTML = `
            <div class="horizontal-line">
				<hr class="horizontal">
				<h1 class="teamName">${oneTeam.team_name}</h1>
			</div>
			<div class="Info">
				<img class="logo" src="../picture_repository/team_logo_lions_500x500.png">
			</div>
            `;

            addDiv.querySelector('.Info').appendChild(allNames);  // Add player buttons to the Info section
            toAddDiv?.appendChild(addDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching player data:', error);
    });
*/