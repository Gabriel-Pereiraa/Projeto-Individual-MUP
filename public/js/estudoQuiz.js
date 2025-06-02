
const listaDeQuestoes = [
    {
        pergunta: "Por que o batismo é considerado um passo importante na vida cristã?",
        alternativaA: "Porque é uma tradição antiga sem significado atual",
        alternativaB: "Porque é uma exigência da sociedade",
        alternativaC: "Porque simboliza o novo nascimento e o compromisso com Cris",
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
]

// variáveis globais    
let numeroDaQuestaoAtual = 0
let pontuacaoFinal = 0
let tentativaIncorreta = 0
var certas = 0
var erradas = 0
let quantidadeDeQuestoes = listaDeQuestoes.length
var idQuiz = 1;

// Array para armazenar as respostas do usuário
let respostasUsuario = [];

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "none"
    document.getElementById('btnRetorno').style.display = "none"
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex"
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"
    document.getElementById('btnRetorno').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)

    btnSubmeter.disabled = false
    btnProx.disabled = true
    btnTentarNovamente.disabled = true
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)
    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option"); // recupera alternativas no html

    let alternativaEscolhida = null;
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            alternativaEscolhida = options[i].value; // 'A', 'B', 'C' ou 'D'
            break;
        }
    }

    if (!alternativaEscolhida) {
        alert("Não há alternativas escolhidas. Escolha uma opção.");
        return;
    }

    // Salva a resposta no array com a estrutura { idQuiz, alternativaEscolhida }
    respostasUsuario[numeroDaQuestaoAtual] = {
        idQuiz: numeroDaQuestaoAtual + 1, // id da questão (ajuste conforme seu id real)
        alternativaEscolhida: alternativaEscolhida
    };

    var idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario || pontuacao == null || idQuiz == null) {
        alert("Dados insuficientes para registrar a pontuação.");
        console.error("idUsuario:", idUsuario, "pontuacao:", pontuacao, "idQuiz:", idQuiz);
        return false;
    }

    fetch("/quiz/quizEnsinamentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            pontuacaoServer: pontuacao,
            idQuizEnsinamentosServer: idQuiz
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return true;
            } else {
                throw new Error("Erro ao registrar a pontuação.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao enviar pontuação:", erro);
            alert("Erro ao registrar a pontuação. Tente novamente.");
            return false;
        });

    btnSubmeter.disabled = true;
    btnProx.disabled = false;

    habilitarAlternativas(false);

    checarResposta();
}

function habilitarAlternativas(trueOrFalse) {
    let opcaoEscolhida = trueOrFalse ? false : true

    primeiraOpcao.disabled = opcaoEscolhida
    segundaOpcao.disabled = opcaoEscolhida
    terceiraOpcao.disabled = opcaoEscolhida
    quartaOpcao.disabled = opcaoEscolhida
}

function avancar() {
    btnProx.disabled = true
    btnSubmeter.disabled = false

    desmarcarRadioButtons()

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else if (numeroDaQuestaoAtual == quantidadeDeQuestoes - 1) {
        alert("Atenção... a próxima é a última questão!")
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else {
        finalizarJogo()
    }
    limparCoresBackgroundOpcoes()
}

function dashboard() {
    alert('Direcionando para Dashboard!')
    setTimeout(() => {
        window.location = '/dashboard/dashboard.html'
    }, 1000);
}

function retornarDashboard() {
    alert('Direcionando para Dashboard!')
    setTimeout(() => {
        window.location = '/dashboard/dashboard.html'
    }, 1000);
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual 
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta // qual é a resposta correta da questão atual

    const options = document.getElementsByName("option"); // recupera alternativas no html

    let alternativaCorreta = null // variável para armazenar a alternativa correta

    options.forEach((option) => {
        if (option.value === respostaQuestaoAtual) {
            alternativaCorreta = option.labels[0].id
        }
    })

    // verifica se resposta assinalada é correta
    options.forEach((option) => {
        if (option.checked === true && option.value === respostaQuestaoAtual) {
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            pontuacaoFinal++
            certas++
            document.getElementById("spanCertas").innerHTML = certas
            numeroDaQuestaoAtual++
        } else if (option.checked && option.value !== respostaQuestaoAtual) {
            const wrongLabelId = option.labels[0].id

            document.getElementById(wrongLabelId).classList.add("text-danger-with-bg")
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            tentativaIncorreta++
            erradas++
            document.getElementById("spanErradas").innerHTML = erradas
            numeroDaQuestaoAtual++
        }
    })
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
        document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
    })
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function finalizarJogo() {
    let textoParaMensagemFinal = null;
    let classComCoresParaMensagemFinal = null;
    const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes;

    if (porcentagemFinalDeAcertos <= 0.3) {
        textoParaMensagemFinal = "";
        classComCoresParaMensagemFinal = "text-danger-with-bg";
    } else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
        textoParaMensagemFinal = "";
        classComCoresParaMensagemFinal = "text-warning-with-bg";
    } else if (porcentagemFinalDeAcertos >= 0.9) {
        textoParaMensagemFinal = "";
        classComCoresParaMensagemFinal = "text-success-with-bg";
    }

    textoParaMensagemFinal += "<br> Você acertou " + Math.round(porcentagemFinalDeAcertos * 100) + "% das questões.";

    document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal;
    document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal);
    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal;
    alert('ue')
    sessionStorage.CERTAS = certas
    sessionStorage.ERRADAS = erradas

    document.getElementById('jogo').classList.add("text-new-gray");
    alert()

    btnProx.disabled = true;
    btnSubmeter.disabled = true;
    btnTentarNovamente.disabled = false;

    localStorage.setItem("pontuacaoUsuario", pontuacaoFinal);
    alert()

    // Enviar pontuação para o servidor (opcional)
    enviarPontuacaoQuiz(pontuacaoFinal, idQuizEnsinamentos);


    // Enviar todas as respostas para o backend
    alert()
    enviarRespostasQuiz(respostasUsuario, sessionStorage.ID_USUARIO);
    alert()


    dadosDashboard()
    graficoAcertosErros();

}

function enviarRespostasQuiz(respostas, idUsuario) {
    if (!idUsuario || !respostas || respostas.length === 0) {
        alert("Dados insuficientes para registrar as respostas.");
        return;
    }

    fetch("/quiz/registrarRespostas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            respostas: respostas
        }),
    })
        .then(resposta => {
            if (resposta.ok) {
                alert("Respostas registradas com sucesso!");
            } else {
                throw new Error("Erro ao registrar as respostas.");
            }
        })
        .catch(erro => {
            console.error("Erro ao enviar respostas:", erro);
            alert("Erro ao registrar as respostas. Tente novamente.");
        });
}


function dadosDashboard() {


    console.log("Acertos:", certas, "Erros:", erradas);

    const ctx2 = document.getElementById("myChart").getContext("2d");

    const labels = ["Quiz 1"];
    const acertos = sessionStorage.CERTAS
    const erros = sessionStorage.ERRADAS

    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Acertos",
                    data: [acertos],
                    borderColor: "rgba(0, 255, 0, 0.8)",
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    tension: 0.3,
                    fill: true
                },
                {
                    label: "Erros",
                    data: [erros],
                    borderColor: "rgba(255, 0, 0, 0.8)",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Quantidade"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Quizzes"
                    }
                }
            }
        }
    });
}

function graficoAcertosErros() {
    const ctx = document.getElementById("graficoAnotacoes").getContext("2d");

    const acertos = Number(sessionStorage.CERTAS);
    const erros = Number(sessionStorage.ERRADAS);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                label: 'Resultado do Quiz',
                data: [acertos, erros],
                backgroundColor: [
                    'rgba(168, 85, 247, 0.7)',  // Roxo claro - Acertos
                    'rgba(239, 68, 68, 0.7)'    // Vermelho suave - Erros
                ],
                borderColor: [
                    'rgba(168, 85, 247, 1)',    // Roxo escuro
                    'rgba(239, 68, 68, 1)'      // Vermelho forte
                ],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#eee', // Cor da fonte da legenda
                        font: {
                            family: 'Poppins',
                            size: 14,
                            weight: '500'
                        }
                    },
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Desempenho no Quiz',
                    color: '#fff',
                    font: {
                        family: 'Poppins',
                        size: 20,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    backgroundColor: '#333',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#888',
                    borderWidth: 1
                }
            }
        }
    });
}