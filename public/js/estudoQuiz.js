// Lista de questões
const listaDeQuestoes = [
    {
        pergunta: "Por que o batismo é considerado um passo importante na vida cristã?",
        alternativaA: "Porque é uma tradição antiga sem significado atual",
        alternativaB: "Porque é uma exigência da sociedade",
        alternativaC: "Porque simboliza o novo nascimento e o compromisso com Cristo",
        alternativaD: "Porque todos fazem e não queremos ficar de fora",
        alternativaCorreta: "alternativaC"
    },
    {
        pergunta: "De que forma o dízimo contribui para a missão da igreja?",
        alternativaA: "Apenas para enriquecer os líderes religiosos",
        alternativaB: "Para manter a estrutura da igreja e apoiar obras sociais e missionárias",
        alternativaC: "É apenas uma formalidade sem impacto real",
        alternativaD: "Para mostrar quem tem mais dinheiro",
        alternativaCorreta: "alternativaB"
    },
    {
        pergunta: "Como participar de ministérios ou cultos mostra compromisso com a fé?",
        alternativaA: "Mostra que queremos ser populares na igreja",
        alternativaB: "Demonstra interesse apenas em agradar as pessoas",
        alternativaC: "Revela nosso desejo de servir a Deus com nossos dons e tempo",
        alternativaD: "É uma forma de evitar problemas com o pastor",
        alternativaCorreta: "alternativaC"
    },
    {
        pergunta: "Qual é o significado de obedecer aos ensinamentos bíblicos dentro da igreja?",
        alternativaA: "Garantir bênçãos materiais imediatas",
        alternativaB: "Mostrar que somos melhores que os outros",
        alternativaC: "Viver uma fé verdadeira que reflete o amor de Deus",
        alternativaD: "Ter mais cargos e reconhecimento",
        alternativaCorreta: "alternativaC"
    },
    {
        pergunta: "Como nossas ações na igreja impactam nosso crescimento espiritual?",
        alternativaA: "Não fazem diferença, o que importa é só crer",
        alternativaB: "Ajudam a fortalecer nossa fé e nosso exemplo para os outros",
        alternativaC: "Servem apenas para ocupar o tempo livre",
        alternativaD: "São obrigatórias, mas não trazem benefício pessoal",
        alternativaCorreta: "alternativaB"
    }
];

// Variáveis globais
let numeroDaQuestaoAtual = 0;
let pontuacaoFinal = 0;
let tentativaIncorreta = 0;
let certas = 0;
let erradas = 0;
const quantidadeDeQuestoes = listaDeQuestoes.length;
const idQuiz = 1;
let respostasUsuario = [];

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none";
    document.getElementById('jogo').style.display = "none";
    document.getElementById('btnRetorno').style.display = "none";
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex";
    document.getElementById('jogo').style.display = "flex";
    document.getElementById('btnIniciarQuiz').style.display = "none";
    document.getElementById('btnRetorno').style.display = "none";

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes;
    preencherHTMLcomQuestaoAtual(0);
    btnSubmeter.disabled = false;
    btnProx.disabled = true;
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true);
    const questaoAtual = listaDeQuestoes[index];
    numeroDaQuestaoAtual = index;
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = index + 1;
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option");
    let alternativaEscolhida = null;
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            alternativaEscolhida = options[i].value;
            break;
        }
    }
    if (!alternativaEscolhida) {
        alert("Não há alternativas escolhidas. Escolha uma opção.");
        return;
    }

    respostasUsuario[numeroDaQuestaoAtual] = {
        idQuiz: numeroDaQuestaoAtual + 1,
        alternativaEscolhida
    };

    checarResposta();
    btnSubmeter.disabled = true;
    btnProx.disabled = false;
    habilitarAlternativas(false);
}

function habilitarAlternativas(habilitar) {
    primeiraOpcao.disabled = !habilitar;
    segundaOpcao.disabled = !habilitar;
    terceiraOpcao.disabled = !habilitar;
    quartaOpcao.disabled = !habilitar;
}

function avancar() {
    btnProx.disabled = true;
    btnSubmeter.disabled = false;
    desmarcarRadioButtons();
    limparCoresBackgroundOpcoes();

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
        numeroDaQuestaoAtual++;
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);
    } else {
        finalizarJogo();
    }
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual];
    const respostaCorreta = questaoAtual.alternativaCorreta;
    const options = document.getElementsByName("option");
    options.forEach(option => {
        const labelId = option.labels[0].id;
        if (option.checked) {
            if (option.value === respostaCorreta) {
                certas++;
            } else {
                erradas++;
            }
        }
    });
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach(option => {
        const labelId = option.labels[0].id;
        document.getElementById(labelId).classList.remove("text-danger-with-bg", "text-success-with-bg");
    });
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    options.forEach(option => option.checked = false);
}

function finalizarJogo() {
    let acertos = 0;
    let erros = 0;

    for (let i = 0; i < listaDeQuestoes.length; i++) {
        const respostaCorreta = listaDeQuestoes[i].alternativaCorreta;
        const respostaUsuario = respostasUsuario[i]?.alternativaEscolhida;

        if (respostaUsuario === respostaCorreta) {
            acertos++;
        } else {
            erros++;
        }
    }

    const idUsuario = sessionStorage.ID_USUARIO;
    enviarRespostasQuiz(idUsuario, acertos, erros);

    btnProx.disabled = true;
    btnSubmeter.disabled = true;

    dadosDashboard();
    graficoAcertosErros();
}


function enviarRespostasQuiz(idUsuario, certas, erradas) {
    const corpo = { idUsuario, certas, erradas };
    console.log("Enviando para o backend:", corpo);

    fetch("http://localhost:3333/quiz/registrarTentativas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(corpo),
    })
    .then(resposta => {
        if (resposta.ok) {
            alert("Respostas registradas com sucesso!");
        } else {
            resposta.text().then(texto => {
                console.error("Erro ao registrar respostas:", texto);
            });
        }
    })
    .catch(erro => console.error("Erro:", erro));
}


function dashboard() {
    window.location = '../dashboard/teste.html';
}

function logout() {
    sessionStorage.clear();
    window.location = '../index.html';
}

function logout2() {
    window.location = '../quiz/estudoQuiz.html';
}