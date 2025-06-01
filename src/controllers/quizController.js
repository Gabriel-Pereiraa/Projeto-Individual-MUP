const quizModel = require("../models/quizModel");

async function registrarRespostas(req, res) {
    const { idUsuarioServer, pontuacaoServer, idQuizEnsinamentosServer } = req.body;

    if (!idUsuarioServer || !idQuizEnsinamentosServer || pontuacaoServer == null) {
        return res.status(400).json({ mensagem: "Dados incompletos para registrar a pontuação." });
    }

    try {
        // Armazena uma entrada para cada ponto correto como se fosse uma resposta correta.
        for (let i = 0; i < pontuacaoServer; i++) {
            await quizModel.registrarResposta(idUsuarioServer, idQuizEnsinamentosServer, 'C'); // Supondo 'C' como correta
        }
        res.status(200).json({ mensagem: "Pontuação registrada com sucesso." });
    } catch (erro) {
        console.error("Erro ao registrar pontuação: ", erro.sqlMessage || erro);
        res.status(500).json({ erro: erro.sqlMessage });
    }
}

async function listarQuestoes(req, res) {
    try {
        const [result] = await quizModel.buscarQuestoes();
        res.status(200).json(result);
    } catch (erro) {
        console.error("Erro ao buscar questões: ", erro.sqlMessage || erro);
        res.status(500).json({ erro: erro.sqlMessage });
    }
}

module.exports = {
    registrarRespostas,
    listarQuestoes
};
