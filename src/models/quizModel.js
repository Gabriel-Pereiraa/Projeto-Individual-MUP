const database = require("../database/config");

function buscarDados(idUsuario) {
    const instrucao = `
        SELECT sum(acertos) as acertos, sum(erros) as erros, count(id) as qtdTentativas FROM tentativas WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function registrarTentativas(idUsuario, certas, erradas) {
    const instrucao = `
        INSERT INTO tentativas (acertos, erros, fkUsuario) VALUES (${certas}, ${erradas}, ${idUsuario});
    `;
    return database.executar(instrucao);
}

function registrarTentativas(idUsuario, certas, erradas) {
    const instrucao = `
        INSERT INTO tentativas (acertos, erros, fkUsuario) VALUES (${certas}, ${erradas}, ${idUsuario});
    `;
    return database.executar(instrucao);
}


module.exports = {
    buscarDados,
    registrarTentativas
};