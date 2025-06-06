var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");


// Rota do primeiro cadastro
router.post("/primeiroAcesso", function (req, res) {
    usuarioController.primeiroAcesso(req, res);
})

// Rota para alterar a senha
router.post("/alterarSenha", function (req, res) {
    usuarioController.primeiroAcesso(req, res);
})

// Rota para fazer o login
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/cadastro/:idUsuario", function (req, res) {
    usuarioController.buscarDataCadastro(req, res);
});



module.exports = router;