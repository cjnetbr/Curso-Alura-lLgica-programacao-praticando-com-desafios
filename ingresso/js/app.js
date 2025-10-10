function comprar() {
    //selecionar o tipo de inquesso;
    let tipoIngresso = document.getElementById('tipo-ingresso').value;
    //selecionar a quantidade;
    let quantidadeComprada = parseInt(document.getElementById('qtd').value);

    // validar se:
    // O campo de quantidade (#qtd) está preenchido.
    // O valor é positivo.
    if (isNaN(quantidadeComprada) || quantidadeComprada <= 0) {
        alert('Informe uma quantidade válida.');
        return;
    }

    //Ao comprar o ingresso atualizar a quuantidade decrementando-a em cada tipo
    let quantidadesDisponiveis = getQuantidadeIngressos();

    disponivelInferior = quantidadesDisponiveis.inferior;
    disponivelSuperior = quantidadesDisponiveis.superior;
    disponivelPista = quantidadesDisponiveis.pista;

    let disponivelAtual = 0;

    if (tipoIngresso === 'pista') disponivelAtual = disponivelPista;
    else if (tipoIngresso === 'superior') disponivelAtual = disponivelSuperior;
    else if (tipoIngresso === 'inferior') disponivelAtual = disponivelInferior;

    if (quantidadeComprada > disponivelAtual) {
        alert('Quantidade solicitada não disponível.');
        return;
    }
    
    // Atualiza a quantidade
    if (tipoIngresso === 'pista'){
            disponivelPista -= quantidadeComprada;
            document.getElementById('qtd-pista').textContent = disponivelPista;
        } else if (tipoIngresso === 'superior'){
            disponivelSuperior -= quantidadeComprada;
            document.getElementById('qtd-superior').textContent = disponivelSuperior;
        } else if (tipoIngresso === 'inferior'){
            disponivelInferior -= quantidadeComprada;
            document.getElementById('qtd-inferior').textContent = disponivelInferior;
        }
         // Limpa o campo qtd
        document.getElementById('qtd').value = '';
        // Atualiza a disponibilidade
        ingressoIndisponivel();    
    }

function getQuantidadeIngressos(){
    let disponivelInferior = parseInt(document.getElementById('qtd-inferior').textContent);
    let disponivelSuperior = parseInt(document.getElementById('qtd-superior').textContent);
    let disponivelPista = parseInt(document.getElementById('qtd-pista').textContent);

    return {
        inferior: disponivelInferior,
        superior: disponivelSuperior,
        pista: disponivelPista
    }
}

function ingressoIndisponivel(){
    let quantidades = getQuantidadeIngressos();
    let removeIngresso = document.getElementById("tipo-ingresso")
    
    if(quantidades.inferior === 0){
        let removeInferior = removeIngresso.querySelector('option[value="inferior"]');
        if (removeInferior) removeIngresso.removeChild(removeInferior);
    }

    if(quantidades.superior === 0){
        let removeSuperior = removeIngresso.querySelector('option[value="superior"]');
        if (removeSuperior) removeIngresso.removeChild(removeSuperior);
    }

    if(quantidades.pista === 0){
        let removePista = removeIngresso.querySelector('option[value="pista"]');
        if (removePista) removeIngresso.removeChild(removePista);
    }
}


