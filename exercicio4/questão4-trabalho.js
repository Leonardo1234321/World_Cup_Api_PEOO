url = "https://worldcupjson.net/teams"

fetch(url)
    .then(response => response.json()) //básico, só pra "pegar" o json
    .then(data => displaygroups(data))

    function displaygroups(json){
        const tabelas = document.getElementById("tabelas")
        json.groups.forEach(group => { //percorre os grupos
            let tabela = document.createElement("table") //cria o elemento da tabela
            let head = document.createElement("thead") //cria o cabeçalho
            let title = document.createElement("h3") //cria o título informando o grupo

            tabelas.appendChild(title) //adiciona o título à div tabelas
            title.innerHTML = `<h3>Grupo ${group.letter}</h3>` //escreve o título
            head.innerHTML = `
                <th>Nome</th><th>Pontos</th><th>Vitórias</th><th>Empates</th><th>Derrotas</th><th>Jogos</th><th>Gols a favor</th><th>Gols contra</th><th>Diferença</th>
            ` //define o cabeçalho

            tabela.appendChild(head) //adiciona o cabeçalho  à tabela
            group.teams.forEach(team => { //percorre os times
                let line = tabela.insertRow();
                line.insertCell(0).textContent = `${team.name}`;
                line.insertCell(1).textContent = team.group_points;
                line.insertCell(2).textContent = team.wins;
                line.insertCell(3).textContent = team.draws;
                line.insertCell(4).textContent = team.losses;
                line.insertCell(5).textContent = team.games_played;
                line.insertCell(6).textContent = team.goals_for;
                line.insertCell(7).textContent = team.goals_against;
                line.insertCell(8).textContent = team.goal_differential;
            }); //adiciona cada célula
            
            //isso aqui é só pra deixar ""bonito""
            tabela.style.borderWidth = "1px";
            tabela.style.borderColor = "green";
            tabela.style.borderStyle = "solid";
            tabela.style.background = "lightgreen"
            tabela.style.textAlign = "center"

            tabelas.appendChild(tabela) //adiciona cada tabela à div
        })
    }