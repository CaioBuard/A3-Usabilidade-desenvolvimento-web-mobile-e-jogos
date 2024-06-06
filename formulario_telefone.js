// Ao carregar a página, chama a função AoCarregarPagina()
document.addEventListener('DOMContentLoaded', AoCarregarPagina);

function AoCarregarPagina() {
    // Adiciona o evento de clique para enviar o formulário
    document.getElementById("enviarFormulario").addEventListener("click", EnviarFormulario);
    CarregarSelectPessoa();
    CarregarValores();
}

// Se o formulário estiver sendo usado para ATUALIZAR um registro do banco, carrega os dados no formulário
function CarregarValores() {
    const idTelefone = PegarParametroUrl('id');
    if (idTelefone) {
        // Pega as informações do telefone atual
        const telefone = Requisicao("/telefone/" + idTelefone, 'GET');

        // Encontra todos os elementos HTML do form
        const dddElement = document.getElementById("ddd");
        const numeroElement = document.getElementById("numero");
        const idPessoaElement = document.getElementById("idPessoa");

        // Preenche os valores do formulário (já que estamos realizando uma atualização)
        dddElement.value = telefone.ddd;
        numeroElement.value = telefone.numero;
        idPessoaElement.value = telefone.idPessoa;
    }
}

// Preenche o select dinâmico do form de pessoas
function CarregarSelectPessoa() {
    //Pega o elemento de pessoas no html
    let selectPessoas = document.getElementById("idPessoa");

    // Pega todas as pessoas cadastradas no servidor
    var pessoas = Requisicao('/pessoas', 'GET');

    // Loop para cada pessoa cadastrada
    for (i in pessoas) {
        let pessoa = pessoas[i];
        
        // Cria um elemento de 'opção'
        let novoSelect = document.createElement("option");
        // Coloca o texto que vai aparecer em cada opção do select
        novoSelect.textContent = pessoa.id + " - " + pessoa.nome;
        // Valor (id da pessoa) que aquela opção representa
        novoSelect.value = pessoa.id;

        // Adiciona a opção no select
        selectPessoas.append(novoSelect);
    }
}

// Função que envia o formulário
function EnviarFormulario() {
    // Evita o envio padrão do formulário (pois vamos enviar manualmente)
    event.preventDefault();

    // Pega os dados do form e transforma num JSON
    var formularioDadosJSON = FormularioParaJson('telefoneForm');

    /* Se tiver idTelefone precisamos fazer um PUT (atualização), se não fazemos uma inserção POST */
    const idTelefone = PegarParametroUrl('id');
    if (idTelefone) {
        Requisicao('/telefone/' + idTelefone, "PUT", formularioDadosJSON);
    } else {
        Requisicao('/telefone', "POST", formularioDadosJSON);
    }

    // Volta para a tela de lista de telefones
    window.location.href = "index.html";
}



