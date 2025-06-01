const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/quizEnsinamentos", quizController.registrarRespostas);
router.get("/questoes", quizController.listarQuestoes);

module.exports = router;
