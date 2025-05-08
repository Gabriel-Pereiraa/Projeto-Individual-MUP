function cadastrar() {
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var cpfVar = cpf_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;
    
    if (nomeVar.length < 1) {
        alert('Informe um nome correto!')
    } else {
        alert ('Nome correto!');
    }
     if (emailVar.includes('@') && emailVar.includes('.')) {
        alert ('Email correto!')
    } else {
        alert ('Email incorreto! falta @ ou .')
    }
    if (senhaVar.length <= 5) {
        alert ('Sua senha precisa ter 6 caracteres pelo menos')
    } else {
        alert ('Sua senha está correta!')
    }
    if (senhaVar == confirmacaoSenhaVar) {
        alert ('Suas senhas estão iguais!')
    } else {
        alert ('Senha não é igual a de confirmação')
    }
    if (cpfVar.length == 14) {
        alert ('CPF correto!')
    } else {
        alert ('CPF deve estar no formato 999.999.999-99')
    }




}