const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/quizEnsinamentos', quizController.registrarPontuacao);
router.post('/registrarRespostas', quizController.registrarRespostas);
router.get('/questoes', quizController.listarQuestoes);

//router.get('/acertos', quizController.acertos);


module.exports = router;
