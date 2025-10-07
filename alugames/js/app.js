function alterarStatus(id) {
    // 1. Monta o ID do elemento li (ex: 'game-1') e o seleciona.
    let gameClicado = document.getElementById(`game-${id}`);

    // 2. Seleciona os elementos filhos (imagem e botão) dentro do 'gameClicado'.
    let imagem = gameClicado.querySelector('.dashboard__item__img');
    let botao = gameClicado.querySelector('.dashboard__item__button');
    let nomeJogo = gameClicado.querySelector('.dashboard__item__name');

    // 3. Verifica se o jogo está alugado (pela classe do botão).
    if (botao.classList.contains('dashboard__item__button--return')) {
        // 4. LÓGICA PARA DEVOLVER O JOGO
        // Confirmação opcional para o usuário
        if (confirm(`Você tem certeza que deseja devolver o jogo ${nomeJogo.textContent}?`)) {
            imagem.classList.remove('dashboard__item__img--rented');
            botao.classList.remove('dashboard__item__button--return');
            botao.textContent = 'Alugar';
        }
    } else {
        // 5. LÓGICA PARA ALUGAR O JOGO
        imagem.classList.add('dashboard__item__img--rented');
        botao.classList.add('dashboard__item__button--return');
        botao.textContent = 'Devolver';
    }
}
