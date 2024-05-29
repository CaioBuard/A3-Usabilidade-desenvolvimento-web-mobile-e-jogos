document.addEventListener('DOMContentLoaded', function() {
    // Carregar pessoas no dropdown ao carregar a página
    carregarPessoas();

    // Submeter formulário
    document.getElementById('telefoneForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var form = this;
        var formData = new FormData(form);
        
        // Obter o ID da pessoa selecionada no dropdown
        var pessoaSelecionadaId = document.getElementById('pessoa').value;

        // Criar um objeto com os dados do formulário
        var requestData = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });
        // Adicionar o ID da pessoa selecionada ao objeto de dados
        requestData['idPessoa'] = pessoaSelecionadaId;

        fetch('https://ef18-2001-1284-f50a-2cca-f065-eb93-b82b-f53c.ngrok-free.app/telefone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifica o tipo de mídia como JSON
            },
            body: JSON.stringify(requestData) // Converte os dados em JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar telefone. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Telefone cadastrado com sucesso:', data);
            // Redirecionar para a página de lista de telefones após o cadastro
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Erro ao cadastrar telefone:', error);
            alert('Erro ao cadastrar telefone. Por favor, tente novamente mais tarde.');
        });
    });
});

function carregarPessoas() {
    var fetchOptions = {"headers": {"ngrok-skip-browser-warning": true}};

    fetch('https://ef18-2001-1284-f50a-2cca-f065-eb93-b82b-f53c.ngrok-free.app/pessoas', fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar pessoas. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Pessoas recebidas:', data);
            var dropdown = document.getElementById('pessoa');
            dropdown.innerHTML = '<option value="">Selecione uma pessoa</option>';
            data.forEach(pessoa => {
                var option = document.createElement('option');
                option.value = pessoa.id; // Definir o valor da opção como o ID da pessoa
                option.setAttribute('data-idpessoa', pessoa.id); // Armazenar o ID da pessoa como um atributo personalizado
                option.textContent = pessoa.nome;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar pessoas:', error);
            alert('Erro ao carregar pessoas. Por favor, tente novamente mais tarde.');
        });
}
