var database = require("../database/config")

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
           INSERT INTO usuario (nome, email, senha, dtCadastro) VALUES ('${nome}', '${email}', '${senha}', NOW());
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

    var instrucaoSql = `UPDATE usuario
    SET
        nome = COALESCE(${novoNome !== null ? '${novoNome}' : null}, nome),
        email = COALESCE(${novoEmail !== null ? '${novoEmail}' : null}, email),
        senha = COALESCE(${novaSenha !== null ? '${novaSenha}' : null}, senha)
    WHERE id = ${idUsuario};
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDados(idUsuario) {
    var instrucaoSql = `
        SELECT dtCadastro FROM usuario WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    primeiroAcesso,
    alterarSenha,
    atualizarDados,
    buscarDados
};