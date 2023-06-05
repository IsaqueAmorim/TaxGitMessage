const commitButton = document.getElementById("button-commit");
const branchButton = document.getElementById("button-branch");
const resultadoInput = document.getElementById('resultado');
const buttonCopiar = document.getElementById('button-copiar');

const gerarMensagerCommit = () =>{

        const chamadoCommit = document.getElementById('chamado-commit').value;
        const tempoGasto = document.getElementById('tempo-commit').value;
        const statusCommit = document.getElementById('select-box').value;
        const mensagemCommit = document.getElementById('mensagem-commit').value;

    if(validarNumeroChamado(chamadoCommit) == false || validarTempo(tempoGasto) == false){
        let mensagem = `git commit -m "${mensagemCommit} (${statusCommit} #${validarNumeroChamado(chamadoCommit)} @${validarTempo(tempoGasto)}min)"`;
        console.log("Teste");
        resultadoInput.value = mensagem;
    }
}
const gerarNomeDeBranch = () =>{
    const chamadoBranch = document.getElementById('chamado-branch').value;
        const nomeBranch = document.getElementById('branch-mensagem').value;
    if(validarNumeroChamado(chamadoBranch) != false){
        let mensagem = `git checkout -b ${validarNumeroChamado(chamadoBranch)}-${converterNomeDaBranch(nomeBranch)}`;
        resultadoInput.value = mensagem;
    }
   

   
}

commitButton.addEventListener('click',gerarMensagerCommit);
branchButton.addEventListener('click',gerarNomeDeBranch);

buttonCopiar.addEventListener('click', () =>{
    resultadoInput.select();
    document.execCommand('copy');
}
  );

const validarNumeroChamado = (chamado) =>{
   
    /*
    ================ REGRAS ============
    1) O Chamado deve conter apenas Numeros
    2) O chamado não pode ser menor que 4
    3) O chamado não pode ser maior que 6
    */
    
    let numero = chamado.replace("#", "").replace(" ", "");
    if(numero === undefined || numero == ""){
        alert("O chamado não pode ser Vqzio");
    }else{
        if(numero.length < 4 || numero.length > 7){
                   alert("O Chamado deve ter entre 4 e 7 caracteres");
                   return false;
        }else{
            return numero;
        }
    }
    
}
const converterNomeDaBranch = (mensagem) =>{
    let texto = padronizarNome(mensagem);
    
    return texto.toLowerCase();
}
const padronizarNome = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
		.replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
		.replace(/\-\-+/g, '-')	// Substitui multiplos hífens por um único hífen
		.replace(/(^-+|-+$)/, ''); // Remove hífens extras do final ou do inicio da string
}
const validarTempo =(tempo) =>{
    const regex = /^\d{1,2}h\d{1,2}$/;

    if(!regex.test(tempo)){
        alert("O  prdrão aceito é deve conter apenas horas e minutos.");
        return false;
    }
    else{
        return tempo;
    }
}
const copiarValue = ()=>{

}
