const inputNome = document.querySelector("#nome");
const inputIdade = document.querySelector("#idade");
const Formulario = document.querySelector("#formulario");
const Resultado = document.querySelector("#resultado");

Formulario.addEventListener('submit', function(event) {
   const nome = inputNome.value;
    const idade = inputIdade.value;

   if (idade > 18) {
    Resultado.textContent = "olá, " + nome + "! você é maior de idade.";  
} else {
    Resultado.textContent = `olá, ${nome}! você é menor de idade.`;
    Resultado.classList.add("alert-danger");
}

Resultado.classList.remove("d-none");
});
