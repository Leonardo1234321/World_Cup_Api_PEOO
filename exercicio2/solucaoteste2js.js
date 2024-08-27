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
    let data = await processarDados();

    sugestoes.style.display = 'block';

    data.forEach(match => {
        let template = `${match['home_team']['name']} x ${match['away_team']['name']} ${match['datetime'].slice(0,10)} ${match['datetime'].slice(11,19)}`;
        matchlist.push(template);

        const item = document.createElement('div');
        item.innerHTML = template;
        item.addEventListener('click', () => {
            barra_pesquisa.value = item.innerHTML;
            sugestoes.style.display = 'none';
        });

        matchlist_html.push(item);
        sugestoes.appendChild(item);
    });

    barra_pesquisa.addEventListener('input', Event => {
        const searchValue = Event.currentTarget.value.toLowerCase();
        matchlist_html.forEach((item, index) => {
            const matchValue = matchlist[index].toLowerCase();
            item.style.display = matchValue.includes(searchValue) ? 'block' : 'none';
        });
    });
};

async function gerarDetalhes() {
    let valor_entrada = barra_pesquisa.value.trim();
    if (!valor_entrada) {
        sugestoes.style.display = 'none';
        alert('Preencha o campo corretamente!');
        return gerarbarraPesquisa(); // Certifique-se de que isso não cause loops infinitos
    }

    let data = await processarDados();
    const match = data.find(match => {
        let template = `${match['home_team']['name']} x ${match['away_team']['name']} ${match['datetime'].slice(0,10)} ${match['datetime'].slice(11,19)}`;
        return template === valor_entrada;
    });

    if (match) {
        console.log(await displayDetalhes(match));
    }
};

async function displayDetalhes(object) {
    let match_info = await fetch(`https://worldcupjson.net/matches/${object.id}/`);
    match_info = await match_info.json();
    return percorrerDetalhes(match_info, 'Detalhes do jogo: <br>');
}

function percorrerDetalhes(objeto, text) {
    let stack = [{ objeto, prefix: '' }];
    let resultado = text;

    while (stack.length > 0) {
        let { objeto, prefix } = stack.pop();
        for (let chave in objeto) {
            if (typeof objeto[chave] === 'object' && objeto[chave] !== null) {
                stack.push({ objeto: objeto[chave], prefix: `${prefix}${chave}: <br>     ` });
            } else {
                resultado += `<br>${prefix}${chave}: ${objeto[chave]}`;
            }
        }
    }

    return resultado;
}

gerarbarraPesquisa();