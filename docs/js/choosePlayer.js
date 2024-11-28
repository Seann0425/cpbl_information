export async function addChoosePlayer(addTag, innerContent, currNum) {
    // Add new HTML structure
    const blockDiv = document.createElement('div');
    blockDiv.classList.add('chooseUpdatePlayerBlock');

    // Create the button element
    const button = document.createElement('button');
    button.classList.add('chooseUpdatePlayer');
    button.textContent = innerContent;

    // Create the div for player options
    const playerOptionsDiv = document.createElement('div');
    playerOptionsDiv.classList.add('playerOptions');
    playerOptionsDiv.setAttribute('is_press', '1');

    // Append the button and player options div to the block div
    blockDiv.appendChild(button);
    blockDiv.appendChild(playerOptionsDiv);

    // Append the entire block div to the addTag element
    addTag.appendChild(blockDiv);

    // Select all player blocks and use currNum for specific element
    const blocks = addTag.querySelectorAll('.chooseUpdatePlayerBlock');
    const choosePlayer = blocks[currNum].querySelector('.chooseUpdatePlayer');
    const playerOptions = blocks[currNum].querySelector('.playerOptions');

    // Add click event listener to the "choosePlayer" button
    choosePlayer.addEventListener('click', async () => {
        // Check the current state of playerOptions based on "is_press" attribute
        if (playerOptions.getAttribute('is_press') === '1') {
            // Change background color to indicate selection
            choosePlayer.style.backgroundColor = 'rgba(128, 128, 128, 0.2)';
            playerOptions.setAttribute('is_press', '2'); // Update state

            // Fetch the player data using async/await
            try {
                let offset = 0;
                const limit = 15;
                const response = await fetch(`http://localhost:3000/players?offset=${offset}&limit=${limit}`);
                const data = await response.json();

                // Map through the player data to create buttons for each player
                const newData = data.map(player => ({
                    playerName: player.player_name,
                    playerId: player.player_unique_id
                }));

                // Clear previous playerOptions content if any
                playerOptions.innerHTML = "";

                // Append each player's button to the playerOptions div
                newData.forEach(player => {
                    const newButton = document.createElement('button');
                    newButton.classList.add('playerButton');
                    newButton.textContent = `${player.playerName}`;
                    newButton.id = player.playerId;
                    playerOptions.appendChild(newButton);
                });
            } catch (error) {
                console.log("Error fetching players:", error);
            }

            // Add an event listener for the buttons within playerOptions
            playerOptions.addEventListener('click', async (event) => {
                // Check if the clicked element is a button
                if (event.target.tagName === 'BUTTON') {
                    playerOptions.setAttribute('is_press', '1'); // Reset state
                    choosePlayer.style.backgroundColor = 'rgba(80, 0, 0, 0.2)'; // Update color
                    playerOptions.innerHTML = ""; // Clear the playerOptions div

                    // Get the selected player's ID
                    const id = event.target.id;
                    console.log(`Selected Player ID: ${id}`);

                    // Fetch and update the selected player data using async/await
                    try {
                        const response = await fetch(`http://localhost:3000/players?player_unique_id=${id}`);
                        const data = await response.json();

                        // Update the button text with the selected player's name
                        choosePlayer.textContent = `${data[0].player_name}`;
                    } catch (error) {
                        console.log("Error fetching player details:", error);
                    }
                }
            });
        } else {
            // If already pressed, reset the state and styles
            choosePlayer.style.backgroundColor = 'white';
            playerOptions.setAttribute('is_press', '1'); // Reset state
            playerOptions.innerHTML = ""; // Clear options
        }
    });
}
