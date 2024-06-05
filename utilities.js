var url = 'http://localhost:8080';

function Requisicao(endpoint, type, body) {
    var urlFinal = url + endpoint;

    const xhr = new XMLHttpRequest();
    xhr.open(type, urlFinal, false);
    try {
        if (body) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
        
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            return data;
        } else {
            const msgErro = JSON.parse(xhr.responseText).message;
            alert(msgErro);
        }
    } catch (error) {
        alert(error);
    }
}