const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/registrarTentativas', quizController.registrarTentativas);
router.get("/dashboard/:idUsuario", function (req, res) {
    quizController.buscarDados(req, res);
});

module.exports = router;