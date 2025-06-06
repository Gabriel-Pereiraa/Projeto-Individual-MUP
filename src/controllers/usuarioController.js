var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function primeiroAcesso(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("O nome esta undefined");
    } else {
        usuarioModel.primeiroAcesso(nome, email, senha)
            .then(
                function (resposta) {
                    res.json(resposta);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log(`Teve um erro ao realizar o cadastro! Erro: ${erro.sqlMessage}`);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function alterarSenha(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.primeiroAcesso(email, senha)
            .then(
                function (resposta) {
                    res.json(resposta);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log(`Teve um erro ao realizar a alteração de senha! Erro: ${erro.sqlMessage}`);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarDados(req, res) {
    var idUsuario = req.params.idUsuario;
    var novoEmail = req.body.novoEmailServer !== "" ? req.body.novoEmailServer : null;
    var novoNome = req.body.novoNomeServer !== "" ? req.body.novoNomeServer : null;
    var novaSenha = req.body.novoSenhaServer !== "" ? req.body.novoSenhaServer : null;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined");
    } else if (!novoNome && !novoEmail && !novaSenha) {
        res.status(400).send("Nenhuma informação foi enviada para atualizar.");
    } else {
        usuarioModel.atualizarDados(novoNome, novoEmail, novaSenha, idUsuario)
            .then(function (resposta) {
                console.log("Informações atualizadas no banco: ", resposta);
                res.status(200).json(resposta);
            })
            .catch(function (error) {
                console.log("Houve um erro ao tentar atualizar as informações: ", error);
                res.status(500).json(error);
            });
    }
}

async function buscarDataCadastro(req, res) {
    const idUsuario = req.params.idUsuario;

    try {
        const resultado = await usuarioModel.buscarDados(idUsuario);
        if (resultado.length > 0) {
            res.status(200).json({ dtCadastro: resultado[0].dtCadastro });
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado." });
        }
    } catch (erro) {
        console.error("Erro ao buscar data de cadastro:", erro.sqlMessage || erro);
        res.status(500).json({ erro: erro.sqlMessage });
    }
}

module.exports = {
    autenticar,
    primeiroAcesso,
    alterarSenha,
    atualizarDados,
    buscarDataCadastro
};