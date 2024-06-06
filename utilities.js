var url = 'http://localhost:8080';

// Função genérica de requisição
function Requisicao(endpoint, type, body) {
    var urlFinal = url + endpoint;
    
    // Abre uma requisição
    const xhr = new XMLHttpRequest();
    xhr.open(type, urlFinal, false);
    try {
        // Se a requisição tiver um body
        if (body) {
            // Manda header avisando que é json e envia um json no body da requisição
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body));
        } else {
            // Se não tiver body so envia a requisição
            xhr.send();
        }
        
        // Se a requisição retornar 200, deu certo retorna nessa função oque a requisição retornou
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            return data;
        // Se der erro da um alert
        } else {
            const msgErro = JSON.parse(xhr.responseText).message;
            alert(msgErro);
        }
    } catch (error) {
        // Se der erro da um alert
        alert(error);
    }
}

// Pega o id html de um formulário transforma num json e retorna
function FormularioParaJson(idFormulario) {
    var formularioElementoHtml = document.getElementById(idFormulario);
    var formularioDados = new FormData(formularioElementoHtml);

    var formularioDadosJson = {};
    formularioDados.forEach(function(value, key){
        formularioDadosJson[key] = value;
    });

    return formularioDadosJson;
}

// Retorna um parametro especifico de url
function PegarParametroUrl(parametro) {
    const parametrosUrl = new URLSearchParams(window.location.search);
    return parametrosUrl.get(parametro);
}