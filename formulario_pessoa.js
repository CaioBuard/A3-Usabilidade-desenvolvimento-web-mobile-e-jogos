// Ao carregar a página, chama a função AoCarregarPagina()
document.addEventListener('DOMContentLoaded', AoCarregarPagina);

function AoCarregarPagina() {
    // Adiciona o evento de clique para enviar o formulário
    document.getElementById("enviarFormulario").addEventListener("click", EnviarFormulario);
    CarregarValores();
}

// Se o formulário estiver sendo usado para ATUALIZAR um registro do banco, carrega os dados no formulário
function CarregarValores() {
    const idPessoa = PegarParametroUrl('id');
    if (idPessoa) {
        // Pega as informações da pessoa atual
        const pessoa = Requisicao("/pessoa/" + idPessoa, 'GET');

        // Encontra todos os elementos HTML do form
        const nomeElement = document.getElementById("nome");
        const cpfOuCnpjElement = document.getElementById("cpfOuCnpj");

        // Preenche os valores do formulário (já que estamos realizando uma atualização)
        nomeElement.value = pessoa.nome;
        cpfOuCnpjElement.value = pessoa.cpfOuCnpj;
    }
}

// Função que envia o formulário
function EnviarFormulario() {
    // Evita o envio padrão do formulário (pois vamos enviar manualmente)
    event.preventDefault();

    // Pega os dados do form e transforma num JSON
    formularioDadosJSON = FormularioParaJson('pessoaForm')

    /* Se tiver idTelefone precisamos fazer um PUT (atualização), se não fazemos uma inserção POST */
    const idPessoa = PegarParametroUrl('id');
    if (idPessoa) {
        Requisicao('/pessoa/' + idPessoa, "PUT", formularioDadosJSON);
    } else {
        Requisicao('/pessoa', "POST", formularioDadosJSON);
    }

    // Volta para a tela de lista de pessoas
    window.location.href = "pessoas.html";
}



