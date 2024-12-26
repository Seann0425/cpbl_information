const hoverNavigation = document.getElementById('hoverNavigation');

const navigationBarInsert = document.getElementById('navigationBarInsert');
const navigationBarInsertBlock = document.getElementById('navigationBarInsertBlock');

navigationBarInsert.addEventListener('mouseenter', () => {
    hoverNavigation.style.height = '150px';  //200
    hoverNavigation.style.paddingTop = '45px';
    hoverNavigation.innerHTML = `
        <div class="hoverNavigationBlock">
            <a class="hoverNavigationContent" href="/insertplayer">Player</p>
            <a class="hoverNavigationContent" href="/insertgame">Game</p>
        </div>
    `;
});

navigationBarInsertBlock.addEventListener('mouseleave', () => {
    setTimeout(()=>{
        if (!hoverNavigation.matches(':hover'))
        {
            hoverNavigation.style.height = '0px';
            hoverNavigation.style.paddingTop = '0px';
            hoverNavigation.innerHTML = "";
        }
    },1);
    
});
hoverNavigation.addEventListener('mouseleave', () => {
    setTimeout(()=>{
        if (!navigationBarInsertBlock.matches(':hover'))
        {
            hoverNavigation.style.height = '0px';
            hoverNavigation.style.paddingTop = '0px';
            hoverNavigation.innerHTML = "";
        }
    },1);
});

const navigationBarUpdateBlock = document.getElementById('navigationBarUpdateBlock');
const navigationBarUpdate = document.getElementById('navigationBarUpdate');

navigationBarUpdate.addEventListener('mouseenter', () => {
    hoverNavigation.style.height = '150px';   //200
    hoverNavigation.style.paddingTop = '45px';
    hoverNavigation.innerHTML = `
        <div class="hoverNavigationBlock">
            <a class="hoverNavigationContent" href="/updateplayer">Player</p>
            <a class="hoverNavigationContent" href="/updatewinnerlist">WinnerList</p>
        </div>
        
    `;
});

navigationBarUpdateBlock.addEventListener('mouseleave', () => {
    setTimeout(()=>{
        if (!hoverNavigation.matches(':hover'))
        {
            hoverNavigation.style.height = '0px';
            hoverNavigation.style.paddingTop = '0px';
            hoverNavigation.innerHTML = "";
        }
    },1);
    
});
hoverNavigation.addEventListener('mouseleave', () => {
    setTimeout(()=>{
        if (!navigationBarUpdateBlock.matches(':hover'))
        {
            hoverNavigation.style.height = '0px';
            hoverNavigation.style.paddingTop = '0px';
            hoverNavigation.innerHTML = "";
        }
    },1);
});