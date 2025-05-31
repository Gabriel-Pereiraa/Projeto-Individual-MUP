 function cadastrar() {
    
    var nomeVar = ipt_nome.value;
    var sobrenomeVar = ipt_sobrenome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_senhaConfirmar.value;
    // var idEmpresaVincular

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      sobrenomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
    ) {
      // cardErro.style.display = "block";
      // mensagem_erro.innerHTML =
      //   "(Mensagem de erro para todos os campos em branco)";

      alert('Deu erro campos em branco');

      finalizarAguardar();
      return false;
    } 
    else if (nomeVar.length <= 1) {
      // cardErro.style.display = "block";
      // mensagem_erro.innerHTML = "(Seu nome deve ter mais de 1 caractere)"

      alert('Seu nome precisa ter mais de 1 caractere')
      finalizarAguardar();
      return false;
    }
    else if (sobrenomeVar.length <= 1) {
      // cardErro.style.display = "block";
      // mensagem_erro.innerHTML = "(Seu nome deve ter mais de 1 caractere)"

      alert('Seu sobrenome precisa ter mais de 1 caractere')
      finalizarAguardar();
      return false;
    }
    else if (!emailVar.includes('@') || !emailVar.includes('.')) {
      // cardErro.style.display = "block";
      // mensagem_erro.innerHTML = "(O seu E-mail deve conter @ e .)"
      alert ('Seu email deve conter @ e .')
      finalizarAguardar();
      return false;
    }
    else if (senhaVar.length < 6) {
      // cardErro.style.display = "block";
      // mensagem_erro.innerHTML = "(Sua senha está com menos de 6 caracteres)"

      alert('Sua senha está com menos de 6 caracteres')
      finalizarAguardar();
      return false;
    }
    else if (senhaVar != confirmacaoSenhaVar) {
      // cardErro.style.display = "block";
      // mensagem_erro.innerHTML = "(Sua senha não é a mesma da confirmação)"

      alert('Sua senha não é a mesma da confirmação')
      finalizarAguardar();
      return false;
    }
   
    else {
      setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        sobrenomeServer: sobrenomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          // cardErro.style.display = "block";

          // mensagem_erro.innerHTML =
           alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

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