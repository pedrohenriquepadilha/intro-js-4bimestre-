const inputNome = document.querySelector("#nome")
const inputIdade = document.querySelector("#idade")
const Formulario = document.querySelector("#formulario")
const Resultado = document.querySelector("#resultado")

formulario.addEventListener('submit', function(event) {
   const nome = inputNome.value
    const idade = inputIdade.value

    alert(nome + idade)
})