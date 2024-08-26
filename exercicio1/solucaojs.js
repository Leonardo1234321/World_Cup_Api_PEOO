const url = ['https://worldcupjson.net/matches'];
var dates = {};

async function processImages() {
    const data = await fetch('flags.json');
    const imagens = await data.json();
    return imagens;
}

async function processMatches() {
    const dados = await fetch(url);
    const matches_json = await dados.json().catch(error => displayError(error));
    //requista os dados das partidas (json) e transforma em um vetor de objetos JS.
    // objeto onde serão armazenados os jogos por data

    const datas = document.getElementById('dates'); // select das datas

    matches_json.forEach(match => {
        if (dates[(match['datetime'].slice(0, 9))]) {
            dates[(match['datetime'].slice(0, 9))].push(match);
        } // checa se existe a chave com a data no objeto.
        else {
            dates[(match['datetime'].slice(0, 9))] = [match];
            const option = new Option(match['datetime'].slice(0, 9), match['datetime'].slice(0, 9));
            datas.options[datas.options.length] = option;
        } // se não, cria ela e adiciona o jogo.
    });
    // baseado no exercicio 7 da lista de Joao, VALEU!!!!!

};

async function exibirJogos() {
    document.getElementById('matches').innerHTML = ''
    const country_flags = await processImages();
    const data_selecionado = document.getElementById('dates').value
    if (!data_selecionado) {
        return displayPreencher();
    }
    dates[data_selecionado].forEach(match => {
        const partida = document.createElement('div');
        partida.innerHTML = `<img width='32px' src='${country_flags[match['home_team']['name']]}'> ${match['home_team']['name']} VS ${match['away_team']['name']} <img width='32px' src='${country_flags[match['away_team']['name']]}'><p>Status: ${match['status']} <br>
        Resultado: ${match['home_team']['goals']}x${match['home_team']['goals']}
        </p>
        
        `;
        document.getElementById('matches').appendChild(partida);
    });
};

function displayError(error) {
    const errordiv = document.getElementById('matches');
    errordiv.innerHTML = `<div class="error">Ocorreu um erro: ${error.message}</div>`;
    document.body.appendChild(errordiv);
};

function displayPreencher() {
    const mensagem = document.getElementById('matches');
    return mensagem.innerHTML = 'Coloque uma data!'
};

processMatches();

