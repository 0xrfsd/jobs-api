const Vaga = require("../models/Vaga");

exports.add = async (req, res) => {
  try {
    const { instituicao, cargo, tipo, descricao, presencial, localidade } =
      req.body;

    const vaga = new Vaga({
      instituicao,
      cargo,
      tipo,
      descricao,
      presencial,
      localidade,
    });
    await vaga.save();

    return res.json({ status: "Vaga adicionada com sucesso!", vaga });
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.get = async (req, res) => {
  try {
    const vagas = await Vaga.find();
    res.json(vagas);
  } catch (e) {
    return res.status(500).json({ stauts: "Erro!", erorr: e });
  }
};

exports.delete = async (req, res) => {
  try {
    const { _id } = req.body;
    await Vaga.findByIdAndDelete(_id);
    return res.send("Vaga deletada com sucesso!");
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.param = async (req, res) => {
  try {
    if (req.params.filter === "tipo") {
      const tipo = await Vaga.distinct("tipo");
      res.json(tipo);
    } else if (req.params.filter === "instituicao") {
      const instituicao = await Vaga.distinct("instituicao");
      res.json(instituicao);
    } else if (req.params.filter === "cargo") {
      const cargo = await Vaga.distinct("cargo");
      res.json(cargo);
    } else if (req.params.filter === "localidade") {
      const localidade = await Vaga.distinct("localidade");
      res.json(localidade);
    } else if (req.params.filter === "filters") {
      const instituicao = await Vaga.distinct("instituicao");
      const tipo = await Vaga.distinct("tipo");
      const cargo = await Vaga.distinct("cargo");
      const localidades = await Vaga.distinct("localidade");
      res.json({
        instituicoes: instituicao,
        tipos: tipo,
        cargos: cargo,
        localidades: localidades,
      });
    }
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.filter = async (req, res) => {
  try {
    console.log(req.body);
    const results = await Vaga.find(req.body);
    res.json(results);
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};
