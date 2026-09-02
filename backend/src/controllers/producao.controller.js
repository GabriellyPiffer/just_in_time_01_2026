const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
  try {
    const data = req.body;

    const produto = await prisma.produto.findUnique({
      where: { id_produto: data.id_produto }
    });
    if (!produto) {
      return res.status(400).json({ erro: "Produto não encontrado" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: data.id_usuario }
    });
    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    if (data.quantidade <= 0) {
      return res.status(400).json({ erro: "Quantidade deve ser maior que zero" });
    }

    if (data.tipo === "pedido") {
      if (produto.quantidade_estoque < data.quantidade) {
        return res.status(400).json({ erro: "Estoque insuficiente" });
      }
    }

    const item = await prisma.producao.create({
      data: {
        id_produto: data.id_produto,
        tipo: data.tipo,
        quantidade: data.quantidade,
        id_usuario: data.id_usuario,
        data_producao: new Date()   
      }
    });


    const novoEstoque = data.tipo === "pedido"
      ? produto.quantidade_estoque - data.quantidade
      : produto.quantidade_estoque + data.quantidade;

    await prisma.produto.update({
      where: { id_produto: data.id_produto },
      data: { quantidade_estoque: novoEstoque }
    });

    if (novoEstoque < produto.estoque_minimo) {
      console.warn("⚠️ Estoque abaixo do mínimo configurado!");
    }

    res.status(201).json(item);
  } catch (err) {
    console.error("Erro ao cadastrar produção:", err);
    res.status(500).json({ erro: "Erro ao cadastrar produção", detalhe: err.message });
  }
};


const listar = async (req, res) => {
    const lista = await prisma.producao.findMany();
    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const { id } = req.params;
    const item = await prisma.producao.findUnique({
        where: { id_producao: Number(id) }
    });
    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    const item = await prisma.producao.update({
        where: { id_producao: Number(id) },
        data: dados
    });
    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;
    const item = await prisma.producao.delete({
        where: { id_producao: Number(id) }
    });
    res.status(200).json(item);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};
