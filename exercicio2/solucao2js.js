async function gerarbarraPesquisa() {
    let data = await fetch('https://worldcupjson.net/matches');
    data = await data.json();
    let matchlist = [];
    let matchlist_html = [];
    let li_counter = 0;
    const sugestoes = document.querySelector('#sugestoes')
    data.forEach(match => {
        const text = `${match['home_team']['name']} x ${match['away_team']['name']} ${match['datetime'].slice(0,9)} ${match['datetime'].slice(11,18)}`;
        matchlist.push(text);

        const item = document.createElement('div');
        item.innerHTML = text;
        item.addEventListener('click', Event => {
            document.querySelector('#barra_pesquisa').value = item.innerHTML;
            sugestoes.style.display = 'none';
        });

        matchlist_html.push(item);
        sugestoes.appendChild(item);
    });

    sugestoes.addEventListener('input', Event => {
        for (let values of matchlist) {
            if (!values.includes(this.value)) {
                matchlist_html[values.find(this.value)].style.display = 'none';
                console.log('oi');
            };
        };
    });
}
gerarbarraPesquisa();

