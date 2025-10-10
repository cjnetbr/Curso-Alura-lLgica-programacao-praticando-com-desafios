let total = 0;
limpar();


function adicionar(){
   let addProduto = getNomeValorQuantidade();
   let subTotal = addProduto.preco * addProduto.quantidade;

   let addCarrinho = document.getElementById('lista-produtos');
  
    addCarrinho.innerHTML += `<section class="carrinho__produtos__produto">
           <span class="texto-azul">${addProduto.quantidade}x</span> ${addProduto.nome} <span class="texto-azul">R$${addProduto.preco}</span>
         </section>`;
    
    total += subTotal;
    let campoTotal =  document.getElementById('valor-total');
    campoTotal.innerHTML = `Total: <span class="texto-azul" id="valor-total">R$ ${total}</span>`;
    document.getElementById('quantidade').value = '';
}

function limpar(){
    total = 0;
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').innerHTML = 'R$ 0,00';
}

function getNomeValorQuantidade (){

     let selectProduct =  document.getElementById('produto')
     let valueProduct = selectProduct.value;
     let quantidadeProduct = document.getElementById('quantidade').value;


     // 1. Dividir a string em  Produto e preço
    let dividirString = valueProduct.split(' - R$');
    let nomeProduto = dividirString[0];
    let precoProduto = parseFloat(dividirString[1]);
 
    //2. Retorna um array com nome, preço e quantidade do produto selecionado
    return {
        nome: nomeProduto,
        preco: precoProduto,
        quantidade: quantidadeProduct
    };
}
