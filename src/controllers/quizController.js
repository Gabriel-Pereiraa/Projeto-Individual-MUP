const quizModel = require("../models/quizModel");


async function registrarTentativas(req, res) {
    const { idUsuario, certas, erradas } = req.body;

    if (!idUsuario || certas == null || erradas == null) {
        return res.status(400).json({ mensagem: "Dados incompletos para registrar tentativas." });
    }

    try {
        await quizModel.registrarTentativas(idUsuario, certas, erradas);
        res.status(200).json({ mensagem: "Tentativa registrada com sucesso." });
    } catch (erro) {
        console.error("Erro ao registrar tentativa: ", erro.sqlMessage || erro);
        res.status(500).json({ erro: erro.sqlMessage });
    }
}

async function buscarDados(req, res) {
    const idUsuario = req.params.idUsuario;

    try {
        const resultado = await quizModel.buscarDados(idUsuario);
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(404).json({ mensagem: "Nenhum dado encontrado." });
        }
    } catch (erro) {
        console.error("Erro ao buscar dados do dashboard:", erro.sqlMessage || erro);
        res.status(500).json({ erro: erro.sqlMessage });
    }
}

module.exports = {
    registrarTentativas,
    buscarDados
};