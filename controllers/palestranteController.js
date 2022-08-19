const Palestrante = require('../model/palestrante');

const listar = (req, res) => {
    Palestrante.find()
        .then(palestrantes => {
            if (!palestrantes) {
                return res.status(404).json({ "status": 404, "conteudo": "Nenhum palestrante encontrado" });
            }
            return res.status(200).send(palestrantes);
        }).catch(err => {
            return res.status(500).json({"status":500, "conteudo":`${err.message}`});
        });
}

const listarPorId = (req, res) => {
    Palestrante.findById(req.params.id)
        .then(palestrante => {
            if (!palestrante) {
                return res.status(404).json({"status":404, "conteudo":"palestrante não encontrado"});
            }
            return res.status(200).send(palestrante);
        }).catch(err => {
            return res.status(500).json({"status":500, "conteudo":`${err.message}`});
        });
}

const listarPorEmail = (req, res) => {
    Palestrante.findOne({ email: req.params.email })
        .then(palestrante => {
            if (!palestrante) {
                return res.status(404).json({"status":404, "conteudo":"palestrante não encontrado"});
            }
            return res.status(200).send(palestrante);
        }).catch(err => {
            return res.status(500).json({"status":500, "conteudo":`${err.message}`});
        });
}

const cadastrar = (req, res) => {
    const palestrante = new Palestrante(req.body);
    palestrante.save()
        .then(() => {
            return res.status(201).json({"status":201, "conteudo":"palestrante cadastrado com sucesso"});
        })
        .catch(err => {
            if (err.code === 11000) {
                return res.status(400).json({"status":400, "conteudo":"palestrante já cadastrado"});
            }
            return res.status(500).json({"status":500, "conteudo":`${err.message}`});
        });
}

const atualizar = (req, res) => {
    Palestrante.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(palestrante => {
            if (!palestrante) {
                return res.status(404).json({"status":404, "conteudo":"palestrante não encontrado"});
            }
            return res.status(200).send(palestrante);
        }).catch(err => {
            return res.status(500).json({"status":500, "conteudo":`${err.message}`});
        });
}

const deletar = (req, res) => {
    Palestrante.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({"status":404, "conteudo":"palestrante não encontrado"});
            }
            return res.status(200).json({"status":200, "conteudo":"palestrante deletado com sucesso"});
        })
        .catch(err => {
            return res.status(500).json({"status":500, "conteudo":`${err.message}`});
        })
}

module.exports = { listar, listarPorId, listarPorEmail, cadastrar, atualizar, deletar }