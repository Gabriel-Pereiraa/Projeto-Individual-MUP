var database = require("../database/config")

function cadastrarFunc(nome, email, senha) {
    console.log("Função cadastrarFunc() chamada com:", nome, email, senha);

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function primeiroAcesso(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function primeiroAcesso():", nome, email, senha);
    console.log("Inserindo na tabela usuario:", nome, email, senha);

    var instrucaoSql = `
           INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarSenha(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function primeiroAcesso():", nome, email, senha);
    console.log("Modificando na tabela usuario:", email, senha);

    var instrucaoSql = `
           UPDATE usuario SET senha = '${senha}' WHERE email = '${email}';; 
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function atualizarDados(novoNome, novoEmail, novaSenha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarDados():");
    console.log("Inserindo na tabela usuario:", novoNome, novoEmail, novaSenha, idUsuario, fkEmpresa);
    /*
     usando operador ternário para poder fazer uma estrutura de if-else, onde ele verifica se diferente de nulo, 
     se for nulo ele mantém o novoNome em aspas simples
     */
    var instrucaoSql = `UPDATE usuario
    SET
        nome = COALESCE(${novoNome !== null ? `'${novoNome}'` : null}, nome),
        email = COALESCE(${novoEmail !== null ? `'${novoEmail}'` : null}, email),
        senha = COALESCE(${novaSenha !== null ? `'${novaSenha}'` : null}, senha)
    WHERE id = ${idUsuario};
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    autenticar,
    primeiroAcesso,
    alterarSenha,
    atualizarDados,
    cadastrarFunc,

};