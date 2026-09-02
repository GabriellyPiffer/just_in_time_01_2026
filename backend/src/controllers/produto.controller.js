const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.produto.create({
        data
    });

    res.json(item).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.produto.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.produto.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.produto.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.produto.delete({
      where: { id_produto: Number(id) } 
    });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir produto", detalhe: err.message });
  }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
