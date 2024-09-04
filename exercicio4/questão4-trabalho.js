url = "https://worldcupjson.net/teams"

fetch(url)
    .then(response => response.json())
    .then(data => displaygroups(data))

    function displaygroups(json){
        const tabelas = document.getElementById("tabelas")
        json.groups.forEach(group => {
            let tabela = document.createElement("table")
            let head = document.createElement("thead")
            let title = document.createElement("h3")

            tabelas.appendChild(title)
            title.innerHTML = `<h3>Grupo ${group.letter}</h3>`
            head.innerHTML = `
                <th>Nome</th><th>Pontos</th><th>Vitórias</th><th>Empates</th><th>Derrotas</th><th>Jogos</th><th>Gols a favor</th><th>Gols contra</th><th>Diferença</th>
            `
            
            tabela.appendChild(head)
            group.teams.forEach(team => {
                let line = tabela.insertRow();
                line.insertCell(0).textContent = team.name;
                line.insertCell(1).textContent = team.group_points;
                line.insertCell(2).textContent = team.wins;
                line.insertCell(3).textContent = team.draws;
                line.insertCell(4).textContent = team.losses;
                line.insertCell(5).textContent = team.games_played;
                line.insertCell(6).textContent = team.goals_for;
                line.insertCell(7).textContent = team.goals_against;
                line.insertCell(8).textContent = team.goal_differential;
            });

            tabela.style.borderWidth = "1px";
            tabela.style.borderColor = "green";
            tabela.style.borderStyle = "solid";
            tabela.style.background = "lightgreen"
            tabela.style.textAlign = "center"

            tabelas.appendChild(tabela)
        })
    }