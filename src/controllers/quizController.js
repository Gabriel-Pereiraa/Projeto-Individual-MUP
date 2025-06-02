const quizModel = require("../models/quizModel");

async function registrarPontuacao(req, res) {
    const { idUsuarioServer, idQuizEnsinamentosServer, pontuacaoServer } = req.body;

    if (!idUsuarioServer || !idQuizEnsinamentosServer || pontuacaoServer == null) {
        return res.status(400).json({ mensagem: "Dados incompletos para registrar pontuação." });
    }

    try {
        await quizModel.registrarPontuacao(idUsuarioServer, idQuizEnsinamentosServer, pontuacaoServer);
        res.status(200).json({ mensagem: "Pontuação registrada com sucesso." });
    } catch (erro) {
        console.error("Erro ao registrar pontuação: ", erro.sqlMessage || erro);
        res.status(500).json({ erro: erro.sqlMessage });
    }
}

async function registrarRespostas(req, res) {
    const { idUsuarioServer, idQuizEnsinamentosServer, respostas } = req.body;

    if (!idUsuarioServer || !idQuizEnsinamentosServer || !Array.isArray(respostas)) {
        return res.status(400).json({ mensagem: "Dados incompletos para registrar respostas." });
    }

    try {
        for (let alternativa of respostas) {
            await quizModel.registrarResposta(idUsuarioServer, idQuizEnsinamentosServer, alternativa);
        }
        res.status(200).json({ mensagem: "Respostas registradas com sucesso." });
    } catch (erro) {
        console.error("Erro ao registrar respostas: ", erro.sqlMessage || erro);
        res.status(500).json({ erro: erro.sqlMessage });
    }
}

async function listarQuestoes(req, res) {
    try {
        const questoes = await quizModel.obterQuestoes();
        res.status(200).json(questoes);
    } catch (erro) {
        console.error("Erro ao listar questões: ", erro.sqlMessage || erro);
        res.status(500).json({ erro: erro.sqlMessage });
    }
}

function acertos(req, res) {

    const limite_linhas = 2

    
}

module.exports = {
    registrarPontuacao,
    registrarRespostas,
    listarQuestoes
};
