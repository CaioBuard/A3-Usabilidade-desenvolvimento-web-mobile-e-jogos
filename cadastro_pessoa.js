document.addEventListener('DOMContentLoaded', function() {
    // Cria o evento de enviar o form de pessoa
    document.getElementById('pessoaForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var form = this;
        var formData = new FormData(form);

        // Criar um objeto com os dados do formulário
        var requestData = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });

        fetch('https://ef18-2001-1284-f50a-2cca-f065-eb93-b82b-f53c.ngrok-free.app/pessoa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": true
            },
            body: JSON.stringify(requestData) // Converte os dados em JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar pessoa. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Pessoa cadastrado com sucesso:', data);
            // Redirecionar para a página de lista de telefones após o cadastro
            // ! DEBUG não comittar
            //window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Erro ao cadastrar pessoa:', error);
            alert('Erro ao cadastrar pessoa. Por favor, tente novamente mais tarde.');
        });
    });
});