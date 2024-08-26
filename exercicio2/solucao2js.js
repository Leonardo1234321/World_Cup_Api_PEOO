async function gerarbarraPesquisa() {
    let data = await fetch('https://worldcupjson.net/matches');
    data = await data.json();
    let matchlist = [];
    let matchlist_li = [];
    let li_counter = 0;
    data.forEach(match => {
        const text = `${match['home_team']['name']} x ${match['away_team']['name']} ${match['datetime'].slice(0,9)} ${match['datetime'].slice(11,18)}`;
        matchlist.push(text);
        const item = document.createElement('li');
        item.innerHTML = text;
        item.addEventListener('click', Event => {
            
        })
        document.querySelector("#sugestoes").appendChild(item);
    });
    
}
gerarbarraPesquisa()