
let yearSelect = document.getElementById("year");
let currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1900; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}

let monthSelect = document.getElementById('month');
for (let i = 1; i <= 12; i++)
{
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    monthSelect.appendChild(option);
}

function updateDay()
{
    let DayElement = document.getElementById('day');
    let yearVal = document.getElementById('year').value;
    let monthVal = document.getElementById('month').value;
    let numDay = new Date(yearVal, monthVal, 0).getDate();
    DayElement.innerHTML = "";
    for (let i = 1; i <= numDay; i++)
    {
        let dayOption = document.createElement('option');
        dayOption.value = i;
        dayOption.textContent = i;
        DayElement.appendChild(dayOption);
    }
}
document.getElementById('year').addEventListener("change", updateDay);
document.getElementById('month').addEventListener("change", updateDay);
