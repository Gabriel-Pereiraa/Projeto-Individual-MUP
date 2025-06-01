const db = require('../database/config');

function registrarResposta(idUsuario, idQuiz, alternativaEscolhida) {
    const instrucaoSql = `
        INSERT INTO resposta_quiz (fkUsuario, fkQuiz, alternativaEscolhida)
        VALUES (?, ?, ?);
    `;
    return db.execute(instrucaoSql, [idUsuario, idQuiz, alternativaEscolhida]);
}

function buscarQuestoes() {
    const instrucaoSql = `
        SELECT idQuiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD
        FROM quiz;
    `;
    return db.execute(instrucaoSql);
}

module.exports = {
    registrarResposta,
    buscarQuestoes
};
