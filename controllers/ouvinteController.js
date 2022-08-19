const Ouvinte = require('../model/ouvinte');

const listar = (req, res) => {
    Ouvinte.find()
        .then(ouvintes => {
            if (!ouvintes.length) {
                return res.status(404).json({ "status": 404, "conteudo": "ouvinte não encontrado" });
            }
            return res.status(200).send(ouvintes);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });

}

const listarPorId = (req, res) => {
    Ouvinte.findById(req.params.id)
        .then(ouvinte => {
            if (!ouvinte) {
                return res.status(404).json({ "status": 404, "conteudo": "ouvinte não encontrado" });
            }
            return res.status(200).send(ouvinte);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const listarPorEmail = (req, res) => {
    Ouvinte.findOne({ email: req.params.email })
        .then(ouvinte => {
            if (!ouvinte) {
                return res.status(404).json({ "status": 404, "conteudo": "ouvinte não encontrado" });
            }
            return res.status(200).send(ouvinte);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const cadastrar = (req, res) => {
    const ouvinte = new Ouvinte(req.body);
    ouvinte.save()
        .then(() => {
            return res.status(201).json({ "status": 201, "conteudo": "ouvinte cadastrado com sucesso" });
        }).catch(err => {
            if (err.code === 11000) {
                return res.status(400).json({ "status": 400, "conteudo": "ouvinte já cadastrado" });
            }
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const atualizar = (req, res) => {
    Ouvinte.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(ouvinte => {
            if (!ouvinte) {
                return res.status(404).json({ "status": 404, "conteudo": "ouvinte não encontrado" });
            }
            return res.status(200).send(ouvinte);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const deletar = (req, res) => {
    Ouvinte.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ "status": 404, "message": "ouvinte não encontrado" });
            }
            return res.status(200).json({ "status": 200, "conteudo": "ouvinte deletado com sucesso" });
        })
        .catch(err => {
            return res.status(500).json({ "status": 500, "message": `${err.message}` });
        })
}
module.exports = { listar, listarPorId, listarPorEmail, cadastrar, atualizar, deletar };