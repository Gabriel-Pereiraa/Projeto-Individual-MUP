const database = require("../database/config");

// Registra uma resposta no banco

function registrarResposta(fkUsuario, fkQuiz, alternativaEscolhida) {
    const instrucao = `
        INSERT INTO resposta_quiz (fkUsuario, fkQuiz, alternativaEscolhida)
        VALUES (${fkUsuario}, ${fkQuiz}, '${alternativaEscolhida}');
    `;
    return database.executar(instrucao);
}

// Exemplo: retorna todas as questões de um quiz específico (se você tiver uma tabela `questao`)
function buscarQuestoesPorQuiz(idQuiz) {
    const instrucao = `
        SELECT * FROM questao WHERE fkQuiz = ${idQuiz};
    `;
    return database.executar(instrucao);
}

// Exemplo: total de acertos por usuário (dependendo da lógica de resposta correta)
function obterPontuacaoPorUsuario(idUsuario) {
    const instrucao = `
        SELECT COUNT(*) AS totalRespostas
        FROM resposta_quiz
        WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function registrarPontuacao(idUsuario, alternativaEscolhida) {
    const instrucao = `
        INSERT INTO resposta_quiz (fkUsuario, fkQuiz, alternativaEscolhida, dataResposta)
        VALUES (${idUsuario}, 1, '${alternativaEscolhida}', NOW());
    `;
    return database.executar(instrucao);
}


module.exports = {
    registrarResposta,
    buscarQuestoesPorQuiz,
    obterPontuacaoPorUsuario,
    registrarPontuacao

};
