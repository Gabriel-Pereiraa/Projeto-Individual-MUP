/*
function dadosDashboard() {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "bar", // ou 'line', 'pie', etc.
    data: {
      labels: ["Acertos ", "Erros "],
      datasets: [{
        label: "Pontuação",
        data: [3, 2],
        backgroundColor: [
          "rgb(255, 255, 255)",
          "rgb(252, 0, 0)"
        ],
        borderColor: "rgba(0, 0, 0, 0.7)",
        borderWidth: 1
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
}


function graficoAcertosErros() {
  const ctx = document.getElementById("graficoAnotacoes").getContext("2d");

  const labels = ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4"];
  const acertos = [5, 2, 1];
  const erros = [3, 4];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Acertos",
          data: acertos,
          borderColor: "rgba(0, 255, 0, 0.8)",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          tension: 0.3,
          fill: true
        },
        {
          label: "Erros",
          data: erros,
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
 */
