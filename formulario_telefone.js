// ================================ EVENTOS ================================

// Evento de ao carregar a página
document.addEventListener('DOMContentLoaded', AoCarregarPagina);


function AoCarregarPagina() {
    document.getElementById("enviarFormulario").addEventListener("click", EnviarFormulario);
    CarregarSelectPessoa();
    CarregarValores();
}

// Carrega os valores se for update
function CarregarValores() {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idTelefone = parametrosUrl.get('id');
    if (idTelefone) {
        const telefone = Requisicao("/telefone/" + idTelefone, 'GET');
        const dddElement = document.getElementById("ddd");
        const numeroElement = document.getElementById("numero");
        const idPessoaElement = document.getElementById("idPessoa");

        dddElement.value = telefone.ddd;
        numeroElement.value = telefone.numero;
        idPessoaElement.value = telefone.idPessoa;
    }
}

// Carrega o select da pessoa
function CarregarSelectPessoa() {
    var pessoas = Requisicao('/pessoas', 'GET');

    let selectPessoas = document.getElementById("idPessoa");
    for (i in pessoas) {
        let pessoa = pessoas[i];
        
        let novoSelect = document.createElement("option");
        novoSelect.textContent = pessoa.id + " - " + pessoa.nome;
        novoSelect.value = pessoa.id;

        selectPessoas.append(novoSelect);
    }
}

function EnviarFormulario() {
    event.preventDefault();

    var formulario = document.getElementById("telefoneForm");
    var formularioDados = new FormData(formulario);

    // Converte os dados do form para um JSON
    var formularioDadosJSON = {};
    // Passa por todos os campos do form e joga num objeto generico
    for (const [chave, valor] of formularioDados.entries()) {
        formularioDadosJSON[chave] = valor;
    }

    const parametrosUrl = new URLSearchParams(window.location.search);
    const idTelefone = parametrosUrl.get('id');
    if (idTelefone) {
        Requisicao('/telefone/' + idTelefone, "PUT", formularioDadosJSON);
    } else {
        Requisicao('/telefone', "POST", formularioDadosJSON);
    }

    window.location.href = "index.html";
}



