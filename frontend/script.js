const apiUrl = "http://localhost:3000";

const listaProdutos = document.getElementById("listaProdutos");
const formProduto = document.getElementById("formCad"); 
const cadastro = document.getElementById("cadastro");
const buscaProduto = document.getElementById("buscaProduto");
const usuarioLogado = document.getElementById("usuarioLogado");

async function carregarProdutos() {
  if (!listaProdutos) return;
  const res = await fetch(`${apiUrl}/produto/listar`);   
  const produtos = await res.json();

  listaProdutos.innerHTML = produtos.map(p => {
    let alerta = "";
    if (p.quantidade_estoque < p.estoque_minimo) {
      alerta = `<span style="color:red; font-weight:bold;">⚠ Estoque baixo!</span>`;
      document.getElementById("textoMensagem").textContent = `O produto ${p.nome} está abaixo do estoque mínimo!`;
      modalMensagem.classList.remove("oculto");
    }

    const custoFormatado = p.custo !== undefined && p.custo !== null 
      ? Number(p.custo).toFixed(2) 
      : "0.00";

    return `
      <tr>
        <td>${p.nome}</td>
        <td>${p.descricao || ""}</td>
        <td>R$ ${custoFormatado}</td>
        <td>${p.quantidade_estoque} ${alerta}</td>
        <td>${p.estoque_minimo}</td>
        <td>
          <button onclick="editarProduto(${p.id_produto})">Editar</button>
          <button onclick="excluirProduto(${p.id_produto})">Excluir</button>
        </td>
      </tr>
    `;
  }).join("");
}

async function excluirProduto(id) {
  await fetch(`${apiUrl}/produto/excluir/${id}`, { method: "DELETE" });
  carregarProdutos();
}

function editarProduto(id) {
  fetch(`${apiUrl}/produto/buscar/${id}`)
    .then(res => res.json())
    .then(p => {
      document.getElementById("nome").value = p.nome;
      document.getElementById("descricao").value = p.descricao;
      document.getElementById("custo").value = p.custo;
      document.getElementById("quantidade").value = p.quantidade_estoque;
      document.getElementById("estoqueMinimo").value = p.estoque_minimo;

      cadastro.classList.remove("oculto");

      formProduto.onsubmit = async (e) => {
        e.preventDefault();
        const produtoAtualizado = {
          nome: document.getElementById("nome").value,
          descricao: document.getElementById("descricao").value,
          custo: parseFloat(document.getElementById("custo").value),
          quantidade_estoque: parseInt(document.getElementById("quantidade").value),
          estoque_minimo: parseInt(document.getElementById("estoqueMinimo").value)
        };

        await fetch(`${apiUrl}/produto/atualizar/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(produtoAtualizado)
        });

        cadastro.classList.add("oculto");
        carregarProdutos();
      };
    });
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

    cadastro.classList.add("oculto");
    carregarProdutos();
  });
}

if (buscaProduto) {
  buscaProduto.addEventListener("input", async () => {
    const termo = buscaProduto.value.toLowerCase();
    const res = await fetch(`${apiUrl}/produto/listar`);
    const produtos = await res.json();

    const filtrados = produtos.filter(p => 
      (p.nome || "").toLowerCase().includes(termo)
    );

    listaProdutos.innerHTML = filtrados.map(p => `
      <tr>
        <td>${p.nome}</td>
        <td>${p.descricao || ""}</td>
        <td>R$ ${(p.custo !== undefined && p.custo !== null ? Number(p.custo).toFixed(2) : "0.00")}</td>
        <td>${p.quantidade_estoque}</td>
        <td>${p.estoque_minimo}</td>
        <td>
          <button onclick="editarProduto(${p.id_produto})">Editar</button>
          <button onclick="excluirProduto(${p.id_produto})">Excluir</button>
        </td>
      </tr>
    `).join("");
  });
}



function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

const formProducao = document.getElementById("formProducao");
const listaProducao = document.getElementById("listaProducao");
const produtoSelect = document.getElementById("produtoSelect");
const buscaProducao = document.getElementById("buscaProducao");

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

if (buscaProducao) {
  buscaProducao.addEventListener("input", async () => {
    const termo = buscaProducao.value.toLowerCase();
    const res = await fetch(`${apiUrl}/producao/listar`);
    const producoes = await res.json();

    const filtradas = producoes.filter(pr => pr.produto?.nome.toLowerCase().includes(termo));

    listaProducao.innerHTML = filtradas.map(pr => `
      <tr>
        <td>${pr.id_producao}</td>
        <td>${pr.produto?.nome || pr.id_produto}</td>
        <td>${pr.tipo}</td>
        <td>${pr.quantidade}</td>
        <td>${new Date(pr.data_producao).toLocaleDateString()}</td>
      </tr>
    `).join("");
  });
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
      const resultado = await res.json();
      alert("Produção registrada com sucesso!");
      carregarProducao();
      carregarProdutosSelect();

      if (resultado.produto && resultado.produto.quantidade_estoque < resultado.produto.estoque_minimo) {
        document.getElementById("textoMensagem").textContent =
          `O produto ${resultado.produto.nome} está abaixo do estoque mínimo!`;
        modalMensagem.classList.remove("oculto");
      }
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
      window.location.href = "index.html";
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
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (usuario && usuarioLogado) {
    usuarioLogado.textContent = "Logado como: " + usuario.nome;
  }

  carregarProdutos();
  carregarProdutosSelect();
  carregarProducao();
  carregarHistorico();
};
