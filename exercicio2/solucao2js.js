const sugestoes = document.querySelector('#sugestoes');
const barra_pesquisa = document.querySelector('#barra_pesquisa');

async function processarDados() {
    let data = await fetch('https://worldcupjson.net/matches');
    data = await data.json();
    return data;
} 

async function gerarbarraPesquisa() {
    let matchlist = [];
    let matchlist_html = [];
    let li_counter = 0;
    let data = await processarDados();

    sugestoes.style.display = 'block';

    data.forEach(match => {
        let template = `${match['home_team']['name']} x ${match['away_team']['name']} ${match['datetime'].slice(0,9)} ${match['datetime'].slice(11,18)}`;
        matchlist.push(template);

        const item = document.createElement('div');
        item.innerHTML = template;
        item.addEventListener('click', Event => {
            document.querySelector('#barra_pesquisa').value = item.innerHTML;
            sugestoes.style.display = 'none';
        });

        matchlist_html.push(item);
        sugestoes.appendChild(item);
    });

    barra_pesquisa.addEventListener('input', Event => {
        for (let values of matchlist) {
            if (values.includes(Event.currentTarget.value)) {
                matchlist_html[matchlist.indexOf(values)].style.display = 'block';
            } else {
                matchlist_html[matchlist.indexOf(values)].style.display = 'none'
            }
        };
    });
};

async function gerarDetalhes() {
    sugestoes.style.display = 'block';
    let valor_entrada = barra_pesquisa.value;
    let data = await processarDados();
    if (!barra_pesquisa.value) {
        sugestoes.style.display = 'none';
        alert('Preencha o campo corretamente!');
        return gerarbarraPesquisa();
    }
    data.forEach(match => {
        let template = `${match['home_team']['name']} x ${match['away_team']['name']} ${match['datetime'].slice(0,9)} ${match['datetime'].slice(11,18)}`;
        if (template === valor_entrada) {
            return console.log(await displayDetalhes(match));
        }
    })
};

async function displayDetalhes(object) {
    let match_info = await fetch(`https://worldcupjson.net/matches/${object.id}/`);
    match_info = await match_info.json();
    return percorrerDetalhes(match_info, 'Datalhes do jogo: <br>');

};

function percorrerDetalhes(objeto, text) {
    let keys = Object.keys(objeto);
    keys.forEach(chave => {
        if (typeof objeto[chave] === 'object' && objeto[chave] !== null ) {
            text = text + `${chave}: <br>     ${percorrerDetalhes(objeto[chave], text)}`;
        }
        else {
            text = `${text}<br>${chave}: ${objeto[chave]}`;
        }
    })
    return text;
}
gerarbarraPesquisa();

