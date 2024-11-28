const searchYearButton = document.querySelectorAll('.chooseYearButton');

searchYearButton.forEach(button => {
    button.addEventListener('click', async (event) => {
        const yearVal = event.target.getAttribute('value');
        console.log(yearVal);
        
        try {
            const winnerResponse = await fetch(`http://localhost:3000/winnerlist?years=${yearVal}`);
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

            // Fetch player details for different categories
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

            const toAdd = document.querySelectorAll('.winner_block');
            toAdd[0].innerHTML = `
                <div class="left_block">
                    <h1 class="winnerTag">安打王</h1>
                    <p class="leftWords">打點王是指在棒球比賽中，一個球季中打點（RBI, Runs Batted In）最多的球員。打點是指當球員的擊球讓隊友成功得分時，這名擊球員就會獲得打點。通常，打點王代表該球員在關鍵時刻能有效幫助球隊得分，並且在整個賽季中保持穩定的打擊表現，為球隊貢獻大量分數。</p>
                    <h1 class="winnerName">${highest_batting_average}</h1>
                </div>
                <div class="right_block">
                    <h1 class="winnerName">${hitKing}</h1>
                    <p class="rightWords">擊出最高打擊率的球員。打擊率（Batting Average, AVG）是指球員成功擊中球的次數除以總打擊次數，用來衡量球員的擊球穩定性和打擊表現。打擊王通常代表該球員在整個賽季中持續保持高水平的打擊表現，並且能夠頻繁地擊中球並上壘。</p>
                    <h1 class="winnerTag">打擊王</h1>
                </div>
                <div class="left_block">
                    <h1 class="winnerTag">打點王</h1>
                    <p class="leftWords">一個球季中打點（RBI, Runs Batted In）最多的球員。打點是指當球員的擊球讓隊友成功得分時，這名擊球員就會獲得打點。通常，打點王代表該球員在關鍵時刻能有效幫助球隊得分，並且在整個賽季中保持穩定的打擊表現，為球隊貢獻大量分數。</p>
                    <h1 class="winnerName">${RBI_player}</h1>
                </div>
                <div class="right_block">
                    <h1 class="winnerName">${most_stolen_bases_player}</h1>
                    <p class="rightWords">一個棒球球季中成功盜壘次數最多的球員。盜壘（Stolen Base, SB）是指跑者在對方投手投球時，利用時機從一個壘包快速跑向下一個壘包而不被防守隊員觸殺出局。盜壘王通常具備優秀的速度、判斷能力以及在比賽中抓住時機的技巧。</p>
                    <h1 class="winnerTag">盜壘王</h1>
                </div>
                <div class="left_block">
                    <h1 class="winnerTag">全壘打王</h1>
                    <p class="leftWords">一個棒球球季中擊出最多全壘打的球員。全壘打（Home Run）是指球員擊中投手的球後，球飛出場外的界外牆，讓打者可以直接繞過所有壘包回到本壘，並為球隊得分。全壘打王通常代表該球員擁有強大的打擊力量和擊中長打的能力，並且在比賽中對對方投手造成重大威脅。</p>
                    <h1 class="winnerName">${homerun_leader_player}</h1>
                </div>
                <div class="right_block">
                    <h1 class="winnerName">${most_wins_player}</h1>
                    <p class="rightWords">獲得最多勝投的投手。勝投（Win, W）是指投手在比賽中投球表現優異，並且幫助自己的隊伍最終獲勝。為了計算勝投，投手必須在比賽中投出規定的局數並保持領先，直到比賽結束，並且在比賽中通常不會被對方逆轉。</p>
                    <h1 class="winnerTag">勝投手</h1>
                </div>
                <div class="left_block">
                    <h1 class="winnerTag">奪三振王</h1>
                    <p class="leftWords">一個球季中成功投出最多三振的投手。三振（Strikeout, K）是指投手在投球時，讓打者揮棒落空或被主審判定未擊中好球三次，從而將打者出局。奪三振王代表該名投手在球季中展現出優異的投球技巧和壓制打者的能力，尤其是能投出快速球、變化球或其他讓打者難以應對的球種。</p>
                    <h1 class="winnerName">${strikeout_leader_player}</h1>
                </div>
                <div class="right_block">
                    <h1 class="winnerName">${lowest_ERA_player}</h1>
                    <p class="rightWords">防禦率是衡量投手表現的重要指標，計算方式是每九局所允許的自責分（earned runs）數量。防禦率越低，表示投手越能有效限制對手得分，維持穩定的投球表現。</p>
                    <h1 class="winnerTag">防禦王</h1>
                </div>
                <div class="left_block">
                    <h1 class="winnerTag">最佳救援投手</h1>
                    <p class="leftWords">表現最傑出的救援投手。救援投手（closer）通常負責在比賽的最後階段，特別是在球隊領先但分差不大的情況下上場，確保比賽順利結束而不讓對方反超。最佳救援投手通常根據救援成功次數（Save, SV）來衡量，救援成功表示投手在特定壓力情況下，成功防止對手得分並幫助球隊贏得比賽。</p>
                    <h1 class="winnerName">${most_saves_player}</h1>
                </div>
                <div class="right_block">
                    <h1 class="winnerName">${most_holds_player}</h1>
                    <p class="rightWords">中繼投手（Relief Pitcher）負責在先發投手表現不佳或比賽中的關鍵時刻接替投球，通常在比賽的中後段上場，幫助球隊穩定比賽局面，並防止對方得分。</p>
                    <h1 class="winnerTag">最佳中繼投手</h1>
                </div>
            `;
        } catch (error) {
            console.log("Error occurred while fetching winner and player data: ", error);
        }
    });
});
