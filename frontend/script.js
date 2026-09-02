const apiUrl = "http://localhost:3000"; 

const listaProdutos = document.getElementById("listaProdutos");
const formProduto = document.getElementById("formProduto");
const cadastro = document.getElementById("cadastro"); 

async function carregarProdutos() {
  if (!listaProdutos) return;
  const res = await fetch(`${apiUrl}/produto/listar`);   
  const produtos = await res.json();

  listaProdutos.innerHTML = produtos.map(p => `
    <tr>
      <td>${p.nome}</td>
      <td>${p.descricao || ""}</td>
      <td>R$ ${p.custo}</td>
      <td>${p.quantidade_estoque}</td>
      <td>${p.estoque_minimo}</td>
      <td>
        <button onclick="excluirProduto(${p.id_produto})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

async function excluirProduto(id) {
  await fetch(`${apiUrl}/produto/excluir/${id}`, { method: "DELETE" }); 
  carregarProdutos();
}

if (formProduto) {
  formProduto.addEventListener("submit", async (e) => {
    e.preventDefault();
    const produto = {
      nome: document.getElementById("nome").value,
      descricao: document.getElementById("descricao").value,
      custo: parseFloat(document.getElementById("custo").value),
      quantidade_estoque: parseInt(document.getElementById("quantidade").value),
      estoque_minimo: parseInt(document.getElementById("estoqueMinimo").value)
    };

    await fetch(`${apiUrl}/produto/cadastrar`, {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    if (cadastro) cadastro.classList.add("oculto");
    carregarProdutos();
  });
}

const formProducao = document.getElementById("formProducao");
const listaProducao = document.getElementById("listaProducao");
const produtoSelect = document.getElementById("produtoSelect");

async function carregarProducao() {
  if (!listaProducao) return;
  const res = await fetch(`${apiUrl}/producao/listar`);   
  const producoes = await res.json();

  listaProducao.innerHTML = producoes.map(pr => `
    <tr>
      <td>${pr.id_producao}</td>
      <td>${pr.produto?.nome || pr.id_produto}</td>
      <td>${pr.tipo}</td>
      <td>${pr.quantidade}</td>
      <td>${new Date(pr.data_producao).toLocaleDateString()}</td>
    </tr>
  `).join("");
}

async function carregarProdutosSelect() {
  if (!produtoSelect) return;
  const res = await fetch(`${apiUrl}/produto/listar`);
  const produtos = await res.json();

  produtoSelect.innerHTML = produtos
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map(p => `<option value="${p.id_produto}">${p.nome}</option>`)
    .join("");
}

if (formProducao) {
  formProducao.addEventListener("submit", async (e) => {
    e.preventDefault();
    const producao = {
      id_produto: Number(produtoSelect.value),
      tipo: document.getElementById("tipo").value,
      quantidade: parseInt(document.getElementById("quantidadeProd").value),
      id_usuario: 1
    };

    const res = await fetch(`${apiUrl}/producao/cadastrar`, {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producao)
    });

    if (res.ok) {
      alert("Produção registrada com sucesso!");
      carregarProducao();
      carregarProdutosSelect();
    } else {
      const erro = await res.json();
      alert("Erro: " + erro.erro);
    }
  });
}

const formLogin = document.getElementById("formLogin");
const mensagemErro = document.getElementById("mensagemErro");

if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const res = await fetch(`${apiUrl}/usuario/login`, {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (res.ok) {
      const usuario = await res.json();
      localStorage.setItem("usuario", JSON.stringify(usuario));
      window.location.href = "historico.html";
    } else {
      const erro = await res.json();
      mensagemErro.textContent = erro.erro || "Falha na autenticação";
      mensagemErro.classList.remove("oculto");
    }
  });
}

const listaHistorico = document.getElementById("listaHistorico");

async function carregarHistorico() {
  if (!listaHistorico) return;
  const res = await fetch(`${apiUrl}/producao/listar`);   
  const producoes = await res.json();

  listaHistorico.innerHTML = producoes.map(p => `
    <tr>
      <td>${p.usuario?.nome || p.id_usuario}</td>
      <td>${p.tipo === "pedido" ? "Pedido" : "Produção"}</td>
      <td>${p.produto?.nome || p.id_produto}</td>
      <td>${p.quantidade}</td>
      <td>${new Date(p.data_producao).toLocaleString()}</td>
    </tr>
  `).join("");
}

window.onload = () => {
  carregarProdutos();
  carregarProdutosSelect();
  carregarProducao();
  carregarHistorico();
};
