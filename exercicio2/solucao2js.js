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
    //html_result.innerHTML = await displayDetalhes(object);
    let match = await processMatch(object);
    //main.appendChild(html_result);
    let texto = 'Detalhes da partida: ';
    for (i = 0; i < match.length; i++) {
        console.log(match[i][1], match[i][0])
        texto = percorrerDetalhes(match[i][1], `${texto}<br>${match[i][0]}`)
    }
    console.log(texto);
};

async function processMatch(object) {
    let match_info = await fetch(`https://worldcupjson.net/matches/${object.id}/`);
    match_info = await match_info.json();
    let keys = Object.keys(match_info);
    let divided_objects = [];
    let temp = {};
    for (let chave of keys) {
        if (typeof match_info[chave] != 'object') {
            temp[chave] = match_info[chave];
        }
        else {
            if (Object.keys(temp).length != 0) {
                divided_objects.push(['general', temp]);
            };
            temp = {};
            divided_objects.push([chave, match_info[chave]]);
        }
    }
    return divided_objects;
};

function percorrerDetalhes(objeto, text) {
    let keys = Object.keys(objeto);
    for (let chave of keys) {
        if (typeof objeto[chave] === 'object' && objeto[chave] !== null ) {
            text = text + `${chave}: <br>     ${percorrerDetalhes(objeto[chave], text)}`;
        }
        else {
            text = `${text}<br>${chave}: ${objeto[chave]}`;
        }
    }
    return text;
}; // esse código foi feito com auxílio de IA, a primeira versão usava recursão, mas gerou problemas de stack-overflow ;c
gerarbarraPesquisa();

