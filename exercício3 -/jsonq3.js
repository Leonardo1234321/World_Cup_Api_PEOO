const url_teams = 'https://worldcupjson.net/teams' //URL dos times

fetch(url_teams) //Pegar as info da URL Times
    .then(response => response.json())
    .then(teams => todostimes(teams))

function todostimes(teams){

    let equipes = document.getElementById('equipe') 

    for (let team of teams['groups']){ //Percorrer a lista

        for (let country of team.teams){ //Percorrer a lista dentro da lista para pegar o nomes dos times

                let opção = new Option(country.name, country.name) //adicionar opção
                console.log(country.name)
                equipes.options[equipes.options.length] = opção
        }
    }
}

function buscarJogos(){ //função de mostrar os jogos

    const nomeEquipe = document.getElementById('equipe').value //nome da equipe

    console.log(nomeEquipe) //consolelog

    if (!nomeEquipe) { //em caso de erro
        document.getElementById('resultado').innerHTML = '<p class="error">Por favor, selecione uma equipe.</p>';
        return;
    }

    const url_jogos = 'https://worldcupjson.net/matches'; //URL dos jogos
    const arq_bandeiras = 'flags.json' //arquivo json das bandeiras

    // Criação dinâmica do elemento <img> e inserção após o select
    let imgFlag = document.getElementById('flag');
    if (!imgFlag) { // Verifica se a imagem já existe

        // Criação dos elementos <br> e <img>
        const brElement1 = document.createElement('br');
        const brElement2 = document.createElement('br'); // Linha extra após o select
        imgFlag = document.createElement('img');
        imgFlag.id = 'flag';

        // Insere os elementos após o select
        document.getElementById('equipe').insertAdjacentElement('afterend', brElement1);
        brElement1.insertAdjacentElement('afterend', brElement2); // Adiciona a linha extra após o select -
        brElement2.insertAdjacentElement('afterend', imgFlag); //afterend = insere novo elemento após elemento de referência

    }
    
    fetch(arq_bandeiras)//pegar foto das bandeiras do json
        .then(response => response.json())
        .then(data => {
            const bandeiraUrl = data[nomeEquipe]; //pegar a bandeira de acordo com o nome da equipe
            if (bandeiraUrl) {
                imgFlag.src = bandeiraUrl;
            } else {
                imgFlag.src = ''; // Limpa a imagem se a equipe não for encontrada
                alert('Bandeira não encontrada para a equipe especificada.');
            }
        })

    fetch(url_jogos) //pegar info dos jogos
        .then(response => response.json())
        .then(data => {
            const jogosEquipe = data.filter(jogo => { //pegar jogos que foram jogados em casa ou fora de casa do time
                return jogo.home_team.name.toLowerCase().includes(nomeEquipe.toLowerCase()) || jogo.away_team.name.toLowerCase().includes(nomeEquipe.toLowerCase());
            })

    const result = jogosEquipe.map(jogo => { //percorre as info dos jogos e coloca em result
        return `
        <div>
            Data: ${new Date(jogo.datetime).toLocaleString('pt-BR')} </br>
            Data: ${jogo.datetime} </br>
            Disputa: ${jogo.home_team.name} x ${jogo.away_team.name} </br>
            Placar: ${jogo.home_team.goals} - ${jogo.away_team.goals} </br>
            Penaltis: ${jogo.home_team.penalties} - ${jogo.away_team.penalties} </br>
            Vencedor: ${jogo.winner} </br>
            Localização: ${jogo.location} </br>
            Estádio: ${jogo.venue} </br>
        </div>

    `
    }).join(''); //adicionar 

    console.log(result)

    document.getElementById('resultado').innerHTML = result //colocar o result no result do html
    
    })

}
