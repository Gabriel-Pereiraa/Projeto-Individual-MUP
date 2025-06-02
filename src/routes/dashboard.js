const express = require('express');
const router = express.Router();
const db = require('../db'); // módulo de conexão com o banco

router.get('/dados', async (req, res) => {
  const usuarioId = req.query.id_usuario;

  try {
    // Totais de acertos e erros
    const [total] = await db.query(`
      SELECT 
        SUM(acertou = 1) AS acertos,
        SUM(acertou = 0) AS erros
      FROM resposta_quiz
      WHERE id_usuario = ?`, [usuarioId]);

    // Acertos e erros por questão
    const [porQuestao] = await db.query(`
      SELECT 
        id_questao,
        SUM(acertou = 1) AS acertos,
        SUM(acertou = 0) AS erros
      FROM resposta_quiz
      WHERE id_usuario = ?
      GROUP BY id_questao
      ORDER BY id_questao`, [usuarioId]);

    res.json({
      total: total[0],
      por_questao: porQuestao,
      membro_ha: "30 dias" // você pode buscar isso da tabela `usuario` também
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar dados do dashboard');
  }
});
module.exports = router;
