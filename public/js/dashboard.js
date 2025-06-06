const idUsuario = sessionStorage.ID_USUARIO;

function calcularTempoDecorrido(dataInicial) {
  const agora = new Date();
  const diffMs = agora - dataInicial;

  const segundos = Math.floor(diffMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const semanas = Math.floor(dias / 7);
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(dias / 365);

  if (anos > 0) return anos === 1 ? "1 ANO" : `${anos} ANOS`;
  if (meses > 0) return meses === 1 ? "1 MÊS" : `${meses} MESES`;
  if (semanas > 0) return semanas === 1 ? "1 SEMANA" : `${semanas} SEMANAS`;
  if (dias > 0) return dias === 1 ? "1 DIA" : `${dias} DIAS`;
  if (horas > 0) return horas === 1 ? "1 HORA" : `${horas} HORAS`;
  if (minutos > 0) return minutos === 1 ? "1 MINUTO" : `${minutos} MINUTOS`;
  return segundos === 1 ? "1 SEGUNDO" : `${segundos} SEGUNDOS`;
}

function obterDataCadastro(idUsuario) {
  fetch(`/usuarios/cadastro/${idUsuario}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao buscar data de cadastro');
      }
    })
    .then(dados => {
      const dataCadastro = new Date(dados.dtCadastro);
      const texto = calcularTempoDecorrido(dataCadastro);
      document.getElementById("interacaoFrequente").innerText = texto;
    })
    .catch(error => {
      console.error("Erro ao obter data de cadastro:", error.message);
    });
}

window.addEventListener('load', () => {
  const idUsuario = sessionStorage.ID_USUARIO;
  obterDataCadastro(idUsuario);
});

function obterDadosGrafico(idUsuario) {
  fetch(`/quiz/dashboard/${idUsuario}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          dadosDashboard(resposta);
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

window.addEventListener('load', () => obterDadosGrafico(idUsuario));

function dadosDashboard(resposta) {
  const { acertos, erros, qtdTentativas } = resposta;

  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Acertos", "Erros"],
      datasets: [{
        label: "Pontuação",
        data: [acertos, erros],
        backgroundColor: [
          "rgb(0, 0, 0)",
          "rgb(121, 4, 247)"
        ],
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  document.getElementById("b_dias").innerText = qtdTentativas;

  if (acertos <= 2){
    document.getElementById("anotacao_total").innerText = "INICIANTE";
  } else if (acertos <= 4) {
    document.getElementById("anotacao_total").innerText = "INTERMEDIÁRIO";
  } else if (acertos >= 5) {
    document.getElementById("anotacao_total").innerText = "AVANÇADO";
  }
}