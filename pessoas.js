// Ao carregar a página, chama a função AoCarregarPagina()
document.addEventListener('DOMContentLoaded', AoCarregarPagina);

function AoCarregarPagina() {
    CarregarPessoas();
}

// Carrega as pessoas
function CarregarPessoas() {
    // Puxa as pessoa do servidor
    var pessoas = Requisicao('/pessoas', 'GET');
    
    // Pega o elemento de table pessoas
    var tablePessoas = document.getElementById("tablePessoas");
    for (i in pessoas) {
        let pessoa = pessoas[i];

        // Cria uma nova linha e uma nova coluna
        let novoTr = document.createElement("tr");
        let novoTd = document.createElement("td");

        let infoPessoa = ""
        // --- Preenche as informações ---
            infoPessoa += pessoa.nome + " - " + pessoa.cpfOuCnpj;
        // -------------------------------

        // --- Aplica a trigger de abrir formulario update, e botão deletar ---
            infoPessoa = "<a href='formulario_pessoa.html?id="+pessoa.id+"'>" + infoPessoa + "</a>";
            infoPessoa = "<button class='btn btn-secondary' onclick='DeletarPessoa("+pessoa.id+");'><b>X</b></button> " + infoPessoa;
        // --------------------------------------------------------------------

        // Adiciona os dados da coluna
        novoTd.innerHTML = infoPessoa;
        // Adiciona a coluna na linha
        novoTr.append(novoTd);
        // Adiciona a linha e coluna na tabela
        tablePessoas.append(novoTr);
    }
}

function DeletarPessoa(id) {
    Requisicao("/pessoa/" + id, "DELETE");
    location.reload();
}