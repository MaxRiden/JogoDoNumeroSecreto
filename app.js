nivel = 10;
listaSorteados = [];
numeroAleatorio = gerarNumeroAleatorio();
tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${nivel}`);
}

exibirMensagemInicial()

function verificarChute(){
    let chute = document.querySelector('input').value;
    let tentativaZas = tentativas > 1 ? 'tentativas' : 'tentativa';
    if (chute == numeroAleatorio){
        exibirTextoNaTela('h1','Acertou');
        let mensagemTentativas = `Voce descobriu o número secreto (${numeroAleatorio}) com ${tentativas} ${tentativaZas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroAleatorio){
        exibirTextoNaTela('p',`O número secreto é menor do que ${chute}`);

    } else {
        exibirTextoNaTela('p',`O número secreto é maior do que ${chute}`);
    }
    tentativas++;
    limparcampo();
}

function limparcampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * nivel + 1);
    if (listaSorteados.length == nivel){
        listaSorteados = [];
    }
    if (listaSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}