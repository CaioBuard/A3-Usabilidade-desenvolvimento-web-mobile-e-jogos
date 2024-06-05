// ================================ EVENTOS ================================

// Evento de ao carregar a página
document.addEventListener('DOMContentLoaded', AoCarregarPagina);

function AoCarregarPagina() {
    CarregarPessoas();
}

function CarregarPessoas() {
    var pessoas = Requisicao('/pessoas', 'GET');

    console.log("Pessoas:");
    console.log(pessoas);

    var tablePessoas = document.getElementById("tablePessoas");
    for (i in pessoas) {
        let pessoa = pessoas[i];

        let novoTr = document.createElement("tr");
        let novoTd = document.createElement("td");

        let infoPessoa = ""
        // --- Preenche as informações ---
            infoPessoa += pessoa.nome + " - " + pessoa.cpfOuCnpj;
        // -------------------------------

        // --- Aplica a trigger de abrir formulario update, e botão deletar ---
            infoPessoa = "<a href='formulario_pessoa.html?id="+pessoa.id+"'>" + infoPessoa + "</a>";
            infoPessoa = "<button onclick='DeletarPessoa("+pessoa.id+");'>X</button> " + infoPessoa;
        // --------------------------------------------------------------------

        novoTd.innerHTML = infoPessoa;


        novoTr.append(novoTd);
        tablePessoas.append(novoTr);
    }
}

function DeletarPessoa(id) {
    Requisicao("/pessoa/" + id, "DELETE");
    location.reload();
}