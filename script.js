const commitButton = document.getElementById("button-commit");
const branchButton = document.getElementById("button-branch");
const resultadoInput = document.getElementById("resultado");
const buttonCopiar = document.getElementById("button-copiar");

const obterValoresDosCampos = (ids) => {
  const valores = {};
  ids.forEach((id) => {
    const campo = document.getElementById(id);
    valores[id] = campo.value;
  });
  return valores;
};

const gerarMensagemCommit = () => {
  const campos = ["tempo-commit", "chamado-commit", "mensagem-commit","select-box"];
  const valoresDosCampos = obterValoresDosCampos(campos);
  const tempoGasto = valoresDosCampos["tempo-commit"];
  const chamadoCommit = valoresDosCampos["chamado-commit"];
  const mensagemCommit = valoresDosCampos["mensagem-commit"];
  const statusCommit = valoresDosCampos["select-box"];

  if (!ehTempoValido(tempoGasto)) {
    alert("Deve conter apenas horas e minutos.");
    return;
  }
  debugger
  if (!ehNumeroChamadoValido(chamadoCommit)) {
    return;
  }

  let mensagem = `git commit -m "${mensagemCommit} (${statusCommit} #${formataNumeroChamado(chamadoCommit)} @${tempoGasto}min)"`;

  if (resultadoInput) {
    resultadoInput.value = mensagem;
  }
};

const gerarNomeDeBranch = () => {
  const campos = ["chamado-branch", "branch-mensagem"];
  const valoresDosCampos = obterValoresDosCampos(campos);
  const chamadoBranch = valoresDosCampos["chamado-branch"]
  const nomeBranch = valoresDosCampos["branch-mensagem"]

  if (!ehNumeroChamadoValido(chamadoBranch)) {
    return;
  }

  let mensagem = `git checkout -b "${formataNumeroChamado(mensagemCommit)}-${converterNomeDaBranch(nomeBranch)}`;
  
  if (resultadoInput) {
    resultadoInput.value = mensagem;
  }
};

commitButton.addEventListener("click", gerarMensagemCommit);
branchButton.addEventListener("click", gerarNomeDeBranch);

buttonCopiar.addEventListener("click", () => {
  resultadoInput.select();
  document.execCommand("copy");
});

const ehTempoValido = (tempo) => {
  const regex = /^\d{1,2}h\d{1,2}$/;
  return regex.test(tempo);
};

const ehNumeroChamadoValido = (chamado) => {
  let numero = formataNumeroChamado(chamado);
  return validarNumeroChamado(numero);
};

const contemSomenteNumeros = (chamado) => {
  const regex = /^[0-9]+$/;
  return regex.test(chamado);
};

const validaCampoVazio = (campo) => {
  return campo === undefined || campo === "" ? false : true;
};

const validaTamanhoCampo = (tamanhoCampo) => {
  return tamanhoCampo < 4 || tamanhoCampo > 7 ? false : true;
};

/*
    ================ REGRAS ============
    1) O Chamado deve conter apenas Numeros
    2) O chamado não pode ser menor que 4
    3) O chamado não pode ser maior que 6
*/
const validarNumeroChamado = (numero) => {

  if (!contemSomenteNumeros(numero)) {
    alert("O chamado deve conter somente numeros");
    return false;
  }

  if (!validaCampoVazio(numero)) {
    alert("O chamado não pode ser Vazio");
    return false;
  }

  if (!validaTamanhoCampo(numero.length)) {
    alert("O Chamado deve ter entre 4 e 7 caracteres");
    return false;
  }

  return true;
};

const converterNomeDaBranch = (mensagem) => {
  let texto = padronizarNome(mensagem);
  return texto.toLowerCase();
};

const formataNumeroChamado = (chamado) => {
  return chamado.replace("#", "").replace(" ", "");
};

const padronizarNome = (str) => {
  const semAcentos = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
  const semParentesesNoFinal = semAcentos.replace(/\((.*?)\)$/g, "$1"); // Remove parênteses no final da string
  const substituido = semParentesesNoFinal.replace(/[^\w\s()-]+/g, "-"); // Substitui caracteres especiais (exceto parênteses) por hífen
  return substituido
    .replace(/\s+/g, "-") // Substitui espaços por hífen
    .replace(/\-\-+/g, "-") // Substitui múltiplos hífens por um único hífen
    .replace(/(^-+|-+$)/g, ""); // Remove hífens extras do final ou do início da string
};