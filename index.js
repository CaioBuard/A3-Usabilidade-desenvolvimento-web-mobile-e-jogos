// ================================ EVENTOS ================================

// Evento de ao carregar a página
document.addEventListener('DOMContentLoaded', AoCarregarPagina);

function AoCarregarPagina() {
    CarregarTelefones();
}

function CarregarTelefones() {
    var telefones = Requisicao('/telefones', 'GET');

    var tableTelefones = document.getElementById("tableTelefones");
    var trAtual = false;
    for (i in telefones) {
        let telefone = telefones[i];

        if (!trAtual) {
            trAtual = document.createElement("tr");
            tableTelefones.append(trAtual);
        }

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
            infoTelefone = "<button onclick='DeletarTelefone("+telefone.id+");'>X</button> " + infoTelefone;
        // --------------------------------------------------------------------------

        novoTd.innerHTML = infoTelefone;
        trAtual.append(novoTd);

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
