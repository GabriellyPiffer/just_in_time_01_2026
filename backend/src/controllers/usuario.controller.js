const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.usuario.create({
        data
    });

    res.json(item).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.usuario.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.usuario.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.usuario.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.usuario.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        if (usuario.senha !== senha) {
            return res.status(400).json({ erro: "Senha inválida" });
        }

        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ erro: "Erro no servidor" });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    login
};