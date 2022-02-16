const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

const JWT_SECRET = "f1naancial!";

exports.fetchId = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await Usuario.findOne({ _id }).lean();
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({ email }).lean();

    if (email.length == 0) {
      return res.json({ status: "Erro!", error: "Qual é o seu email?" });
    }

    if (!user) {
      return res.json({ status: "Erro!", error: "Telefone invalido" });
    }

    if (senha.length == 0) {
      return res.json({ status: "Erro!", error: "Qual é a sua senha?" });
    }

    if (await bcrypt.compare(senha, user.senha)) {
      const token = jwt.sign(
        {
          id: user._id,
          nome: user.nome,
          email: user.email,
          tipo: user.tipo,
        },
        JWT_SECRET
      );

      const userData = {
        id: user._id,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        tipo: user.tipo,
      };

      const data = { token: token, user: userData };

      return res.json({ status: "Usuário logado com sucesso!", data: data });
    } else {
      return res.json({ status: "Erro!", error: "Senha incorreta" });
    }
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.register = async (req, res) => {
  try {
    const { nome, email, cpf, telefone, senha } = req.body;

    const tipo = "User";

    if (nome.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir seu nome",
      });
    }

    if (telefone.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir seu telefone",
      });
    }

    if (email.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir seu email",
      });
    }

    if (cpf.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir seu telefone",
      });
    }

    if (senha.length < 8) {
      return res.json({
        status: "Erro!",
        error: "Sua senha deve conter no minimo 8 digitos",
      });
    }

    const e_email = await Usuario.findOne({ email }).lean();
    if (e_email) {
      return res.json({
        status: "Erro!",
        error: "Esse email já foi registrado",
      });
    }

    const e_cpf = await Usuario.findOne({ cpf }).lean();
    if (e_cpf) {
      return res.json({
        status: "Erro!",
        error: "Esse cpf já foi registrado",
      });
    }

    const e_telefone = await Usuario.findOne({ telefone }).lean();
    if (e_telefone) {
      return res.json({
        status: "Erro!",
        error: "Esse telefone já foi registrado",
      });
    }

    const senhac = await bcrypt.hash(senha, 10);

    const user = new Usuario({
      nome,
      email,
      tipo,
      telefone,
      cpf,
      senha: senhac,
    });
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        tipo: user.tipo,
        email: user.email,
        nome: user.nome,
        telefone: user.telefone,
        cpf: user.cpf,
      },
      JWT_SECRET
    );

    const userData = {
      id: user._id,
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      tipo: user.tipo,
    };

    const data = { token: token, user: userData };

    return res.json({ status: "Usuário criado com sucesso!", data });
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};
