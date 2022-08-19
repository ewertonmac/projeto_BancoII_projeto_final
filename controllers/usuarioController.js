const Usuario = require('../model/usuario');

const listar = (req, res) => {
    Usuario.find()
        .then(usuarios => {
            if (!usuarios) {
                return res.status(404).json({ "status": 404, "conteudo": "Nenhum usuário encontrado" });
            }
            return res.status(200).send(usuarios);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const listarPorId = (req, res) => {
    Usuario.findById(req.params.id)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({ "status": 404, "conteudo": "usuário não encontrado" });
            }
            return res.status(200).send(usuario);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const listarPorEmail = (req, res) => {
    Usuario.findOne({ email: req.params.email })
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({ "status": 404, "conteudo": "usuário não encontrado" });
            }
            return res.status(200).send(usuario);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const cadastrar = (req, res) => {
    const usuario = new Usuario(req.body);
    usuario.save()
        .then(() => {
            return res.status(201).json({ "status": 201, "conteudo": "usuário cadastrado com sucesso" });
        })
        .catch(err => {
            if (err.code === 11000) {
                return res.status(400).json({ "status": 400, "conteudo": "usuário já cadastrado" });
            }
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const atualizar = (req, res) => {
    Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({ "status": 404, "conteudo": "usuário não encontrado" });
            }
            return res.status(200).send(usuario);
        }).catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        });
}

const deletar = (req, res) => {
    Usuario.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ "status": 404, "conteudo": "usuário não encontrado" });
            }
            return res.status(200).json({ "status": 200, "conteudo": "usuário deletado com sucesso" });
        })
        .catch(err => {
            return res.status(500).json({ "status": 500, "conteudo": `${err.message}` });
        })
}

module.exports = { listar, listarPorId, listarPorEmail, cadastrar, atualizar, deletar }