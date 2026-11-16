// ===== Dados do cardápio =====
const produtos = [
  { id: 1, categoria: "Entradas", nome: "Carpaccio de Filé", descricao: "Lâminas finas de filé, alcaparras, parmesão e azeite trufado.", preco: 48.9, icone: "🥩" },
  { id: 2, categoria: "Entradas", nome: "Bruschetta de Burrata", descricao: "Pão artesanal, burrata cremosa, tomate confit e manjericão.", preco: 36.0, icone: "🍅" },
  { id: 3, categoria: "Entradas", nome: "Camarão ao Alho", descricao: "Camarões salteados com alho dourado e toque de limão siciliano.", preco: 54.5, icone: "🍤" },
  { id: 4, categoria: "Pratos principais", nome: "Filé ao Molho Madeira", descricao: "Filé alto grelhado, molho madeira e purê de batata rústico.", preco: 89.9, icone: "🍽️" },
  { id: 5, categoria: "Pratos principais", nome: "Risoto de Cogumelos", descricao: "Arroz arbóreo, mix de cogumelos frescos e finalização com parmesão.", preco: 72.0, icone: "🍄" },
  { id: 6, categoria: "Pratos principais", nome: "Salmão Grelhado", descricao: "Salmão com crosta de ervas, legumes assados e arroz de amêndoas.", preco: 94.0, icone: "🐟" },
  { id: 7, categoria: "Pratos principais", nome: "Massa Trufada", descricao: "Tagliatelle fresco, creme de trufas negras e lascas de pecorino.", preco: 78.5, icone: "🍝" },
  { id: 8, categoria: "Sobremesas", nome: "Petit Gâteau", descricao: "Bolo quente de chocolate belga com sorvete de baunilha.", preco: 32.0, icone: "🍫" },
  { id: 9, categoria: "Sobremesas", nome: "Crème Brûlée", descricao: "Creme de baunilha com crosta de açúcar caramelizado na hora.", preco: 28.0, icone: "🍮" },
  { id: 10, categoria: "Sobremesas", nome: "Tarte de Limão", descricao: "Massa amanteigada, creme cítrico e merengue maçaricado.", preco: 26.5, icone: "🍋" },
  { id: 11, categoria: "Bebidas", nome: "Vinho Tinto (taça)", descricao: "Malbec reserva, encorpado e com notas de frutas negras.", preco: 34.0, icone: "🍷" },
  { id: 12, categoria: "Bebidas", nome: "Gin Tônica Ouro", descricao: "Gin premium, tônica, zimbro e casca de laranja.", preco: 38.0, icone: "🍸" },
  { id: 13, categoria: "Bebidas", nome: "Suco Natural", descricao: "Laranja, limão, maracujá ou abacaxi com hortelã (400 ml).", preco: 14.0, icone: "🍹" },
  { id: 14, categoria: "Bebidas", nome: "Água com Gás", descricao: "Garrafa de 500 ml, servida gelada.", preco: 8.0, icone: "💧" }
];

const categorias = ["Todos", ...new Set(produtos.map(p => p.categoria))];

// ===== Estado =====
let categoriaAtual = "Todos";
const pedido = {}; // { idProduto: quantidade }

// ===== Utilitários =====
const $ = (id) => document.getElementById(id);
const moeda = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const buscar = (id) => produtos.find(p => p.id === id);

// ===== AV1: categorias e apresentação dos produtos =====
function renderCategorias() {
  $("categorias").innerHTML = categorias
    .map(c => `<button data-cat="${c}" class="${c === categoriaAtual ? "ativa" : ""}">${c}</button>`)
    .join("");
}

function renderProdutos() {
  const lista = categoriaAtual === "Todos" ? produtos : produtos.filter(p => p.categoria === categoriaAtual);
  $("tituloSecao").textContent = categoriaAtual === "Todos" ? "Todos os pratos" : categoriaAtual;
  $("grade").innerHTML = lista.map(p => `
    <article class="prato ${pedido[p.id] ? "no-pedido" : ""}" data-id="${p.id}">
      <div class="prato-foto" aria-hidden="true">${p.icone}</div>
      <div class="prato-corpo">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <div class="prato-rodape">
          <span class="preco">${moeda(p.preco)}</span>
          <div class="qtd">
            <button data-acao="menos" data-id="${p.id}" aria-label="Remover ${p.nome}">−</button>
            <span>${pedido[p.id] || 0}</span>
            <button data-acao="mais" data-id="${p.id}" aria-label="Adicionar ${p.nome}">+</button>
          </div>
        </div>
      </div>
    </article>`).join("");
}

// ===== AV2: seleção, quantidades e total =====
function alterarQuantidade(id, delta) {
  const nova = (pedido[id] || 0) + delta;
  if (nova <= 0) delete pedido[id];
  else pedido[id] = nova;
  atualizar();
}

function calcularTotal() {
  return Object.entries(pedido).reduce((soma, [id, qtd]) => soma + buscar(Number(id)).preco * qtd, 0);
}

function totalDeItens() {
  return Object.values(pedido).reduce((a, b) => a + b, 0);
}

function renderCarrinho() {
  const ids = Object.keys(pedido).map(Number);
  $("itens").innerHTML = ids.map(id => {
    const p = buscar(id), q = pedido[id];
    return `
      <li class="item">
        <span class="item-nome">${p.nome}</span>
        <span class="item-valor">${moeda(p.preco * q)}</span>
        <span class="item-detalhe">${q} × ${moeda(p.preco)}</span>
        <div class="qtd">
          <button data-acao="menos" data-id="${id}" aria-label="Diminuir ${p.nome}">−</button>
          <span>${q}</span>
          <button data-acao="mais" data-id="${id}" aria-label="Aumentar ${p.nome}">+</button>
        </div>
      </li>`;
  }).join("");

  const vazio = ids.length === 0;
  $("vazio").hidden = !vazio;
  $("total").textContent = moeda(calcularTotal());
  $("contador").textContent = totalDeItens();
  $("finalizar").disabled = vazio;
  $("limpar").disabled = vazio;
}

function atualizar() {
  renderCarrinho();
  // Atualiza os seletores dos cartões sem recriar a grade
  document.querySelectorAll(".prato").forEach(card => {
    const q = pedido[card.dataset.id] || 0;
    card.querySelector(".qtd span").textContent = q;
    card.classList.toggle("no-pedido", q > 0);
  });
}

function mostrarAviso(texto) {
  const aviso = $("aviso");
  aviso.textContent = texto;
  aviso.classList.add("visivel");
  setTimeout(() => aviso.classList.remove("visivel"), 3500);
}

function abrirResumo() {
  $("resumoItens").innerHTML = Object.keys(pedido).map(id => {
    const p = buscar(Number(id)), q = pedido[id];
    return `<li class="item"><span class="item-nome">${q}× ${p.nome}</span><span class="item-valor">${moeda(p.preco * q)}</span></li>`;
  }).join("");
  $("resumoTotal").textContent = moeda(calcularTotal());
  $("resumo").showModal();
}

// ===== Eventos =====
document.addEventListener("click", (e) => {
  const botao = e.target.closest("[data-acao]");
  if (botao) alterarQuantidade(Number(botao.dataset.id), botao.dataset.acao === "mais" ? 1 : -1);

  const cat = e.target.closest("[data-cat]");
  if (cat) {
    categoriaAtual = cat.dataset.cat;
    renderCategorias();
    renderProdutos();
  }
});

$("abrirCarrinho").addEventListener("click", () => $("carrinho").classList.add("aberto"));
$("fecharCarrinho").addEventListener("click", () => $("carrinho").classList.remove("aberto"));
$("limpar").addEventListener("click", () => { Object.keys(pedido).forEach(k => delete pedido[k]); atualizar(); });
$("finalizar").addEventListener("click", abrirResumo);
$("voltar").addEventListener("click", () => $("resumo").close());
$("confirmar").addEventListener("click", () => {
  const total = moeda(calcularTotal());
  $("resumo").close();
  Object.keys(pedido).forEach(k => delete pedido[k]);
  atualizar();
  $("carrinho").classList.remove("aberto");
  mostrarAviso(`Pedido confirmado! Total: ${total}`);
});

// ===== Início =====
renderCategorias();
renderProdutos();
renderCarrinho();