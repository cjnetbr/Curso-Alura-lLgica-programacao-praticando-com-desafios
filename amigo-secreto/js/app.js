let amigos = [];

function adicionar(){
    let nome = document.getElementById("nome-amigo").value;

    if(nome === ""){
        alert("digite um nome válido!");
        return;
    }

    let nomeNormalizado = nome.trim().toLowerCase();
    // let cria uma variável local chamada nomeNormalizado.
    // .trim() limpa os espaços laterais.
    // .toLowerCase() padroniza as letras.
    // Assim garantimos que a comparação não vai falhar por diferença de maiúsculas/minúsculas ou espaços.
    
    for(let amigo of amigos){
    //for inicia o laço.
    //(let amigo of amigos) significa: “pegue cada elemento dentro do array amigos e chame-o 
    //de amigo enquanto o laço estiver rodando”.
    //Esse laço vai percorrer todos os nomes já adicionados, um por um.

        let amigoNormalizado = amigo.trim().toLowerCase();
        
        if(amigoNormalizado === nomeNormalizado){
            alert(`o nome ${nome} já foi adicionado!`);
            document.getElementById("nome-amigo").value = "";
            document.getElementById("nome-amigo").focus();
            return;
        //if → verifica se a condição é verdadeira.
        //amigoNormalizado === nomeNormalizado → compara as duas versões tratadas (sem espaços e em minúsculas).
        //Se forem iguais:
        //Mostra um alerta dizendo que o nome já existe.
        //return encerra imediatamente a função adicionar(), evitando que o nome seja adicionado de novo.
        //Assim, se a lista já tiver "Ana" e o usuário digitar " ANA ", o código detecta e não adiciona duplicata.
        }
    }
    //Adiciona nome a lista
    amigos.push(nome);

    //Atualiza o conteúdo visível da lista na página
    document.getElementById("lista-amigos").textContent = amigos.join(", ");
    // limpa o campo nome do formulario
    document.getElementById("nome-amigo").value = "";
    document.getElementById("nome-amigo").focus();
    console.log(amigos);
}

function sortear(){
    // [ L O G I C A ]

    // Objetivo da função sortear()
    // Queremos que o programa:
    // Pegue a lista de amigos (amigos).
    // Sorteie uma ordem aleatória.
    // Mostre quem tirou quem, sem repetições e sem que alguém tire a si mesmo.

    // Passo 1 — Validar se há amigos suficientes
    // Antes de tudo:
    // Se a lista tiver menos de 2 pessoas, não dá pra sortear.
    // Exemplo: se só há “Ana”, o sorteio não faz sentido.
    // Então a primeira checagem é:
    // “A lista tem pelo menos dois nomes?”
    // Se não tiver, exibe uma mensagem de alerta e interrompe o sorteio.

    if(amigos.length < 4){
        alert(`Quantidade de participantes insuficiente.`);
        return;
    }

    // Passo 2 — Criar uma cópia da lista
    // Por quê?
    // Porque a lista original (amigos) é o que mostra na tela.
    // Nós vamos embaralhar uma cópia (chamada, por exemplo, sorteio) para não bagunçar a lista original.

    //No JavaScript moderno, a forma mais prática é usar o operador spread (...):
    let sorteio = [...amigos];
    
    // Passo 4 — Montar os pares de sorteio
    // Depois do embaralhamento, vamos associar cada amigo da lista original com quem ele tirou na lista embaralhada.
    // Exemplo:

    // Lista original (amigos)	Lista embaralhada (sorteio)	Resultado
    // Ana	                    Joana	                    Ana → Joana
    // Carlos	                Ana	                        Carlos → Ana
    // Joana	                Carlos	                    Joana → Carlos

     
    let valido = false;

    while(!valido){
        valido = true;

        // Passo 3 — Embaralhar a lista de forma aleatória
        embaralhar(sorteio);

        console.log("tentativa atual:", sorteio);

        // Passo 5 — Garantir que ninguém tire a si mesmo
        // Pode acontecer de o sorteio sair assim:

        // Ana → Ana
        // Carlos → Joana
        // Joana → Carlos

        // Isso não pode acontecer.
        // Se alguém tirar a si mesmo, precisamos embaralhar novamente até o resultado ser válido.

        // Lógica:

        // Enquanto houver alguém que tirou a si mesmo, sorteie de novo.
        // Isso é feito com um laço que verifica se há coincidências e refaz o embaralhamento.

        for(let i = 0; i < amigos.length; i++){
            if(amigos[i] === sorteio[i]){
                valido = false;
                break;
            }
        }
    }

    // Passo 6 — Mostrar o resultado

    // Quando o sorteio for válido:
    // Criamos uma string com todos os pares (por exemplo: "Ana → Joana<br>Carlos → Ana<br>Joana → Carlos").
    let resultado = '';

    for (let i = 0; i < amigos.length; i++){
        // usando um for para percorrer todos os índices:
        resultado += `${amigos[i]} → ${sorteio[i]}<br>`;
        //dentro do laço, concatenar cada par no texto, com uma quebra de linha <br> para exibir um por linha:
    }
    // Colocamos esse texto dentro do elemento HTML com id="lista-sorteio", para exibir na tela.
    document.getElementById("lista-sorteio").innerHTML = resultado;
}

function reiniciar(){
    // Objetivos:

    // Esvaziar o array amigos (limpar a memória).
    amigos = [];
    // Apagar os textos que aparecem nas áreas:
    // “Amigos incluídos” (#lista-amigos);
    document.getElementById("lista-amigos").textContent = "";
    // “Sorteio” (#lista-sorteio).
    document.getElementById("lista-sorteio").innerHTML = "";
}


function embaralhar(array){
     // Passo 3 — Embaralhar a lista de forma aleatória
        // Precisamos misturar as posições do array sorteio.
        // Existem várias formas de embaralhar:
        // A mais comum é o algoritmo Fisher-Yates, que troca elementos aleatoriamente entre si.
        // Mas para fins didáticos, basta entender que queremos algo como:
        // Antes: ["Ana", "Carlos", "Joana"]
        // Depois: ["Joana", "Ana", "Carlos"]

                        // Conceito do algoritmo de embaralhamento (Fisher-Yates)

                        // Esse é o método mais comum e seguro.
                        // O raciocínio é simples:

                        // Pegamos o último elemento da lista.
                        // Escolhemos um índice aleatório entre o primeiro e o último.
                        // Trocamos a posição desses dois elementos.
                        // Repetimos isso movendo da direita para a esquerda até o início da lista.
                        // No fim, cada elemento terá a mesma chance de aparecer em qualquer posição.

                        // Exemplo prático

                        // Lista original:

                        // ["Ana", "Carlos", "Joana", "Bruno"]

                        // Sorteamos um índice aleatório (ex.: 2 → “Joana”) e trocamos com o último (“Bruno”).
                        // → ["Ana", "Carlos", "Bruno", "Joana"]

                        // Depois sorteamos outro índice (ex.: 0 → “Ana”) e trocamos com o terceiro (“Bruno”).
                        // → ["Bruno", "Carlos", "Ana", "Joana"]

                        // Repetimos até o início da lista.
                        // → Resultado final embaralhado.
        //Vamos usar um laço for que comece do último índice e vá até o primeiro.
        //Isso é feito assim:
        
        console.log("nova tentativa de sorteio...");

        for(let i = array.length - 1; i > 0; i--){
            //sorteio.length - 1 é o último índice (pois os arrays começam do zero).
            // i-- significa que estamos indo de trás pra frente.
            // O laço roda enquanto i > 0 (ou seja, até o primeiro elemento).
            let j = Math.floor(Math.random() * (i + 1));
            //Explicação:
            // Math.random() gera um número aleatório entre 0 e 1 (ex: 0.345).
            // Multiplicamos por (i + 1) para cobrir todos os índices até o atual.
            // Math.floor() arredonda para baixo, garantindo que seja um número inteiro.

            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            //Explicação:
            // Guardamos sorteio[i] em temp.
            // Atribuímos sorteio[j] em sorteio[i].
            // Depois colocamos o valor original de i em sorteio[j].
        }
}