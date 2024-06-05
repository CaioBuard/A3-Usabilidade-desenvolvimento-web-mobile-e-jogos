// ================================ EVENTOS ================================

// Evento de ao carregar a página
document.addEventListener('DOMContentLoaded', AoCarregarPagina);


function AoCarregarPagina() {
    document.getElementById("enviarFormulario").addEventListener("click", EnviarFormulario);
    CarregarValores();
}

// Carrega os valores se for update
function CarregarValores() {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idPessoa = parametrosUrl.get('id');
    if (idPessoa) {
        const pessoa = Requisicao("/pessoa/" + idPessoa, 'GET');

        const nomeElement = document.getElementById("nome");
        const cpfOuCnpjElement = document.getElementById("cpfOuCnpj");

        nomeElement.value = pessoa.nome;
        cpfOuCnpjElement.value = pessoa.cpfOuCnpj;
    }
}

function EnviarFormulario() {
    event.preventDefault();

    var formulario = document.getElementById("pessoaForm");
    var formularioDados = new FormData(formulario);

    // Converte os dados do form para um JSON
    var formularioDadosJSON = {};
    // Passa por todos os campos do form e joga num objeto generico
    for (const [chave, valor] of formularioDados.entries()) {
        formularioDadosJSON[chave] = valor;
    }

    const parametrosUrl = new URLSearchParams(window.location.search);
    const idPessoa = parametrosUrl.get('id');
    if (idPessoa) {
        Requisicao('/pessoa/' + idPessoa, "PUT", formularioDadosJSON);
    } else {
        Requisicao('/pessoa', "POST", formularioDadosJSON);
    }

    window.location.href = "pessoas.html";
}



