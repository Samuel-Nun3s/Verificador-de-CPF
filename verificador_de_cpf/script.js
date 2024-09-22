function verificador() {
    // Tratamento do CPF:
    var numero = document.getElementById('cpf').value; // Coleta o CPF
    var cpformatado = formatacao(numero); // Chama a função para fazer a formatação do CPF
    var cpf = transformacao(cpformatado); // Chama a funcao para tranformar o CPF em um array
    
    // Calculo do PRIMEIRO DIGITO do CPF:
    var multiplicacao = multi(cpf); // Função que multiplica cada algarismo pelo seu respectivo peso
    var soma = somador(multiplicacao); // Função que soma os valores obtidos para encontrar o total
    cpf = digito(soma, cpf); // Função que confirma o primeiro digito verificador

    // Calculo do SEGUNDO DIGITO do CPF:
    multiplicacao = multi(cpf); // Função que multiplica cada algarismo pelo seu respectivo peso
    soma = somador(multiplicacao); // Função que soma os valores obtidos para encontrar o total
    cpf = digito(soma, cpf); // Função que confirma o segundo digito verificador

    // Verificação se o CPF é valido ou não:
    var resultado = verificacao(cpf, cpformatado); // Função que verifica se o CPF é valido
    painel(resultado); // Função que escreve o resultado na tela
}

function transformacao(num) {
    var num; // Coleta o CPF formatado
    var cpf = []; // Array que ira armazenar o CPF

    for (var c = 0; c < num.length; c++) { // Passa por toda a string colocando os valores dentro do array
        cpf.push(Number(num.charAt(c)));
    }

    for (var c = 1; c <= 2; c++) { // Tira os digitos verificadores 
        cpf.pop();
    }
    return cpf;
}

function formatacao(cpf) { // Função para formatar o CPF
    var cpf; // Coleta o CPF
    var numero = cpf;

    for (var c = 1; c <= 2; c++) { // Formata o CPF
        numero = numero.replace('.' , ''); 
        numero = numero.replace('-' , '');
    }
    return numero; // Retorna o CPF formatado
}

function multi(cpf) {
    var cpf; // Coleta o cpf informado
    var multiplicacao = []; // Declara um Array aonde serão armazenados os resultados
    var i = 0; // Indice que percorrera o Array
    var c = cpf.length + 1; // Declara que "c" sera sempre um numero maior que o tamanho de CPF(Com isso essa funcao consegue ser reutilizada)
    
    for (c; c >= 2; c--) { // Faz a Multiplicação e a armazena no array
        multiplicacao.push(cpf[i] * c);
        i += 1;
    }
    return multiplicacao; // Retorna o array com as multiplicações
}

function somador(multiplicacao) {
    var multiplicacao; // Coleta o array informado
    var soma = 0; // Declara a variavel que ira armazenar a soma dos valores do array

    for (var i in multiplicacao) { // Percorre todo o array, fazendo a soma de todos os valores
        soma += multiplicacao[i];
    }
    return soma; // Retorna o valor total da soma dos valores
}

function digito(soma, cpf) {
    var cpf;
    var divisao = soma % 11; // Coleta o resto da divisao da soma por 11
    var subtracao = 11 - divisao; // Faz a subtração do valor da divisao, para encontrar o primeiro digito verificador

    if (subtracao >= 10) { // Verifica e Confirma qual sera o digito verificador
        cpf.push(0);
    } else {
        cpf.push(subtracao);
    }
    return cpf;
}

function verificacao(cpf, numero) {
    var numero = numero; // Coleta o numero do CPF informado
    var cpfinalizado = cpf.join(); // Faz a uniao dos valores do array, em uma string
    var c = cpf.length; // Coleta o tamanho do array
    var resultado; // Declara a variavel que armazenara o resultado

    for (c; c >= 0; c--) { // Retira todas as virgulas, deixando somente os numeros, para a verificaçao
        cpfinalizado = cpfinalizado.replace(',' , '');
    }
    
    if (cpfinalizado == numero) { // Faz a validação final, e retorna o resultado
        resultado = "Valido";
        return resultado;
    } else {
        resultado = "Invalido";
        return resultado;
    }
}

function painel(resultado) {
    var resposta = document.getElementById('resposta'); // Coleta o elemento para mostrar o resultado ao usuario
    resposta.innerHTML = resultado; // Escreve o resultado na tela

    if (resultado == 'Valido') { // Verifica se o resultado foi valido ou não
        resposta.style.color = 'limegreen'; // Se o resultado for valido = verde
    } else {
        resposta.style.color = 'red'; // Se o resultado for invalido = vermelho
    }
}