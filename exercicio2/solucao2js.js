const sugestoes = document.querySelector('#sugestoes');
const barra_pesquisa = document.querySelector('#barra_pesquisa');
const main = document.querySelector('#main');
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
    
    let object = data.find((match) => {
        let template = `${match['home_team']['name']} x ${match['away_team']['name']} ${match['datetime'].slice(0,9)} ${match['datetime'].slice(11,18)}`;
        if (template === valor_entrada) {
            return match;
        }
    });// a princípio foi usado um forEach, mas gerou problemas de stack junto com o display detalhes ;c
    
    sugestoes.style.display = 'none';

    let html_result = document.createElement('div');

    let match = await processMatch(object);
    
    let match_keys = Object.keys(match);

    html_result.innerHTML = '<h2>Detalhes do jogo: </h2>';
    for (let key of match_keys) {
        let innerText = document.createElement('p');
        innerText.innerHTML = percorrerDetalhes(match[key], key, ' ');
        html_result.appendChild(innerText);
    }

    main.appendChild(html_result);
};

async function processMatch(object) {
    let match_info = await fetch(`https://worldcupjson.net/matches/${object.id}/`);
    match_info = await match_info.json();
    return match_info;
};

function percorrerDetalhes(value, key, text) {
    if (typeof value == 'object') {
        let keys = Object.keys(value);
        text = text + `<br><b>${key.replace('_', ' ')}:</b><br><br>`;
        for (let chave of keys) {
            if (typeof value[chave] === 'object' && value[chave] !== null ) {
                text = percorrerDetalhes(value[chave], chave, text);
            }
            else {
               text = text +`   ${chave}: ${value[chave]}<br>`;
            }
        }
        return text;
    }
    else {
        text = text + `${key}: ${value}`;
        return text;
    }
    
}; // Sérios problemas que a recursão gerou, no fim deu tudo certo
gerarbarraPesquisa();

