fetch('/player/getallplayer')
    .then(res => res.json())
    .then(data => {
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
        const rhino = document.getElementById('rhino');
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
            switch(player.team) {
                case '兄弟\r':
                case '兄弟二軍\r':
                    brotherelephant.appendChild(button);
                    break;
                case '中信\r':
                case '中信二軍\r':
                    whale.appendChild(button);
                    break;
                case '三商\r':
                    tiger.appendChild(button);
                    break;
                case '統一7-ELEVEn獅\r':
                case '統一7-ELEVEn獅二軍\r':
                    team_logo_lions_500x500.appendChild(button);
                    break;
                case '味全龍\r':
                case '味全龍二軍\r':
                    dragon.appendChild(button);
                    break;
                case '俊國\r':
                    bear.appendChild(button);
                    break;
                case '時報\r':
                    eagle.appendChild(button);
                    break;
                case '興農\r':
                case '興農二軍\r':
                    ox.appendChild(button);
                    break;
                case '第一\r':
                    kingkon.appendChild(button);
                    break;
                case '誠泰\r':
                    snake.appendChild(button);
                    break;
                case 'Lamigo\r':
                case 'Lamigo二軍\r':
                    Lamigo.appendChild(button);
                    break;
                case '米迪亞\r':
                    Dmedia.appendChild(button);
                    break;
                case '義大\r':
                case '義大二軍\r':
                    rhino.appendChild(button);
                    break;
                case '中信兄弟\r':
                case '中信兄弟二軍\r':
                    brother.appendChild(button);
                    break;
                case '富邦悍將\r':
                case '富邦悍將二軍\r':
                    Fubon_Guardians.appendChild(button);
                    break;
                case '樂天桃猿\r':
                case '樂天桃猿二軍\r':
                    Rakuten_Monkeys.appendChild(button);
                    break;
                case '台鋼雄鷹\r':
                case '台鋼雄鷹二軍\r':
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