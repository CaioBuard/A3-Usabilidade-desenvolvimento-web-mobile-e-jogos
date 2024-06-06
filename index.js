// Ao carregar a página, chama a função AoCarregarPagina()
document.addEventListener('DOMContentLoaded', AoCarregarPagina);

function AoCarregarPagina() {
    CarregarTelefones();
}

// Carrega todos os telefones da tela
function CarregarTelefones() {
    // Baixa todos os telefones do servidor
    var telefones = Requisicao('/telefones', 'GET');

    // Busca o elemento html da tabela de telefones
    var tableTelefones = document.getElementById("tableTelefones");
    var trAtual = false;
    for (i in telefones) {
        let telefone = telefones[i];

        // Se não tiver uma linha criada, cria uma linha
        if (!trAtual) {
            trAtual = document.createElement("tr");
            tableTelefones.append(trAtual);
        }

        // Cria uma coluna
        let novoTd = document.createElement("td");
        let infoTelefone = "";
        // --- Preenche as informações de cada telefone ---
            let infoPessoa = Requisicao("/pessoa/" + telefone.idPessoa, 'GET');
            infoTelefone += infoPessoa?.nome + ": ";

            infoTelefone += "(" + telefone.ddd + ") ";
            infoTelefone += telefone.numero;
        // ------------------------------------------------

        // --- Adiciona o evento para abrir a tela de update, e botão para delete ---
            infoTelefone = "<a href='formulario_telefone.html?id="+telefone.id+"'>" + infoTelefone + "</a>";
            infoTelefone = "<button class='btn btn-secondary' onclick='DeletarTelefone("+telefone.id+");'><b>X</b></button> " + infoTelefone;
        // --------------------------------------------------------------------------

        // Aplica os eventos do telefone (botão deletar e abrir update) e adiciona na linha
        novoTd.innerHTML = infoTelefone;
        trAtual.append(novoTd);

        // A cada dois telefones cria uma nova linha
        let contaTds = trAtual.querySelectorAll('td').length;
        if (contaTds == 2) {
            trAtual = false;
        }
    }
}

function DeletarTelefone(id) {
    Requisicao('/telefone/' + id, 'DELETE');
    location.reload();
}
