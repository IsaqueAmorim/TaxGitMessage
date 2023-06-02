const chamadoCommit = document.getElementById('chamado-commit').value;
const chamadoBranch = document.getElementById('chamado-branch').value;
const mensagemCommit = document.getElementById('mensagem-commit').value;
const nomeBranch = document.getElementById('branch-mensagem').value;
const tempoGasto = document.getElementById('tempo-commit').value;
const statusCommit = document.getElementById('select-box').value;

const commitButton = document.getElementById("button-commit");
const branchButton = document.getElementById('button-branch');

const resultadoInput = document.getElementById('resultado');


const gerarMensagerCommit = () =>{
    
    let mensagem = `git commit -m "${mensagemCommit} (${statusCommit} #${chamadoCommit} @${tempoGasto})"`;
    console.log("Teste");
    resultadoInput.value = mensagem;
}

commitButton.addEventListener('click',gerarMensagerCommit);

