function cadastrar() {
  var nomeVar = ipt_nome.value;
  var sobrenomeVar = ipt_sobrenome.value;
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;
  var confirmacaoSenhaVar = ipt_senhaConfirmar.value;

  //  Vetores com valores e nomes dos campos
  var campos = [nomeVar, sobrenomeVar, emailVar, senhaVar, confirmacaoSenhaVar];
  var nomesCampos = ["Nome", "Sobrenome", "E-mail", "Senha", "Confirmação de Senha"];

  //  Repetição para verificar campos vazios
  for (let i = 0; i < campos.length; i++) {
    if (campos[i] == "") {
      alert(`O campo "${nomesCampos[i]}" está vazio. Por favor, preencha todos os campos.`);
      finalizarAguardar();
      return false;
    }
  }

  // Validações específicas
  if (nomeVar.length <= 1) {
    alert('Seu nome precisa ter mais de 1 caractere');
    finalizarAguardar();
    return false;
  }
  if (sobrenomeVar.length <= 1) {
    alert('Seu sobrenome precisa ter mais de 1 caractere');
    finalizarAguardar();
    return false;
  }
  if (!emailVar.includes('@') || !emailVar.includes('.')) {
    alert('Seu email deve conter @ e .');
    finalizarAguardar();
    return false;
  }
  if (senhaVar.length < 6) {
    alert('Sua senha está com menos de 6 caracteres');
    finalizarAguardar();
    return false;
  }
  if (senhaVar != confirmacaoSenhaVar) {
    alert('Sua senha não é a mesma da confirmação');
    finalizarAguardar();
    return false;
  }

  setInterval(sumirMensagem, 0);

  // Enviando os dados para o servidor
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      sobrenomeServer: sobrenomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");
          window.location = "login.html";

        limparFormulario();
        finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none";
}
