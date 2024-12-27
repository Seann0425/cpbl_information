const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);
fetch(`/players/searchplayer?player_unique_id=${id}`)
	.then(res => res.json())
	.then(data => {
		console.log(data);
		const toAdd = document.getElementById('format');
		toAdd.innerHTML =`
			<div class="infoFormat">
				<div class="positionLeft">
					<div class="labelColumn">
						<p class="label">name</p>
						<p class="label">number</p>
						<p class="label">t_b</p>
						<p class="label">draft_order</p>
						<p class="label">position</p>
					</div>
					<div class="valueColumn">
						<p class="value">${data[0].player_name}</p>
						<p class="value">${data[0].number}</p>
						<p class="value">${data[0].t_b}</p>
						<p class="value">${data[0].draft_order}</p>
						<p class="value">${data[0].position}</p>		
					</div>
				</div>
				<div class="positionRight">
					<div class="labelColumn">
						<p class="label">born</p>
						<p class="label">debut</p>
						<p class="label">nationality</p>
						<p class="label">height</p>
						<p class="label">weight</p>
						<p class="label">Team</p>
					</div>
					<div class="valueColumn">
						<p class="value">${data[0].born}</p>
						<p class="value">${data[0].debut}</p>
						<p class="value">${data[0].nationality}</p>		
						<p class="value">${data[0].height}</p>
						<p class="value">${data[0].weight}</p>
						<p class="value">${data[0].team}</p>
					</div>
				</div>
			</div>
		`
	})
	.catch(error => {console.log("player is error:", error)});