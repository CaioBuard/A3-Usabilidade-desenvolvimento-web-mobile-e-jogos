function onPageLoad() {
    var fetchOptions = {"headers": {"ngrok-skip-browser-warning": true}};

    fetch("https://ef18-2001-1284-f50a-2cca-f065-eb93-b82b-f53c.ngrok-free.app/telefones", fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const leftSide = document.getElementById('left-side');
            const rightSide = document.getElementById('right-side');

            // Limpar conteúdo existente
            leftSide.innerHTML = '';
            rightSide.innerHTML = '';

            // Para cada telefone retornado, fazer uma solicitação para obter o nome da pessoa correspondente
            data.forEach((phone, index) => {
                fetch(`https://ef18-2001-1284-f50a-2cca-f065-eb93-b82b-f53c.ngrok-free.app/pessoa/${phone.idPessoa}`, fetchOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(person => {
                        // Preencher as linhas com o nome da pessoa e os detalhes do telefone
                        const line = document.createElement('div');
                        line.className = 'line';
                        line.innerHTML = `<strong>${person.nome}</strong> (${phone.ddd}) ${phone.numero}`;

                        // Adicionar a linha ao lado correspondente
                        if (index % 2 === 0) {
                            leftSide.appendChild(line);
                        } else {
                            rightSide.appendChild(line);
                        }

                        // Ajustar as alturas das linhas
                        adjustLineHeights();
                    })
                    .catch(error => {
                        console.error('There has been a problem with your fetch operation:', error);
                    });
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

document.addEventListener('DOMContentLoaded', onPageLoad);


function adjustLineHeights() {
    const leftLines = document.querySelectorAll('#left-side .line');
    const rightLines = document.querySelectorAll('#right-side .line');
    const lineCount = Math.max(leftLines.length, rightLines.length);

    const height = 100 / lineCount;

    leftLines.forEach(line => {
        line.style.flexBasis = `${height}%`;
    });

    rightLines.forEach(line => {
        line.style.flexBasis = `${height}%`;
    });
}

document.addEventListener('DOMContentLoaded', onPageLoad);
