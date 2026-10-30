const formulario = document.querySelector("#formulario");
const inputNome = document.querySelector("#nome");
const inputServico = document.querySelector("#servico");
const inputQuantidade = document.querySelector("#quantidade");
const resultado = document.querySelector("#resultado");

const servicos = [
   {nome: "formatação", preco: 120},
   {nome: "limpeza", preco: 80},
   {nome: "instalação", preco: 50 },
];

for (let i = 0; i < servicos.length; i++) {
  const opcao = document.createElement("option");

  opcao.value = servicos[i].preco;
  opcao.textContent = `${servicos[i].nome} - R$ ${servicos[i].preco}`;

  inputServico.appendChild(opcao);
}

for (let i = 0; i < servicos.length; i++) {
  console.log(servicos[i]);
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = inputNome.value.trim();
  const preco = Number(inputServico.value);
  const quantidadeString = inputQuantidade.value.trim();
  const quantidade = Number(quantidadeString);

  resultado.classList.remove("d-none", "alert-success", "alert-warning");

  if (
    nome === "" ||
    quantidadeString === "" ||
    !Number.isInteger(quantidade) ||
    quantidade <= 0
  ) {
    resultado.textContent = "Preencha todos os campos corretamente!";
    resultado.classList.add("alert-warning");
    return;
  }

  const total = calcularTotal(preco, quantidade);

  resultado.textContent = `Olá ${nome}! O orçamento é de R$ ${total.toFixed(2)}.`;

  resultado.classList.add("alert-success");
});

function calcularTotal(preco, quantidade) {
  return preco * quantidade;
}