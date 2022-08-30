const Usuario = require('../model/usuario');
const bcrypt = require('bcrypt');
require('dotenv').config();

const listar = (req, res) => {
    Usuario.find().sort()
        .then(usuarios => {
            if (!usuarios) {
                return res.status(404).json({
                    "status": 404,
                    "conteudo": "Nenhum usuário encontrado"
                });
            }
            return res.status(200).render('comunidade', {
                usuario: req.session.user, 
                usuarios: usuarios
            });
        }).catch(err => {
            return res.status(500).json({
                "status": 500,
                "conteudo": `${err.message}`
            });
        });
}

const listarPorId = async (req, res) => {
    if(req.session.user) {
        if(req.params.id === req.session.user._id) {
            return res.redirect('/perfil');
        }
    }
    
    const result = await Usuario.findById(req.params.id);
        res.status(200).render('visita-perfil', {
            usuario: req.session.user,
            usuarioLogado: result
        });
}

const listarPorEmail = (req, res) => {
    Usuario.findOne({
        email: req.params.email
    })
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({
                    "status": 404,
                    "conteudo": "usuário não encontrado"
                });
            }
            return res.status(200).send(usuario);
        }).catch(err => {
            return res.status(500).json({
                "status": 500,
                "conteudo": `${err.message}`
            });
        });
}

const cadastrar = async (req, res) => {
    let usuario = null;
    try {
        usuario = Usuario.findOne({
            email: req.body.email
        });

    } catch (erro) {
        res.json({
            mensagemErro: erro.message
        });
    }


    const salt = await bcrypt.genSalt(10);
    let hashedSenha;

    try {
        hashedSenha = await bcrypt.hash(req.body.senha, salt);
    } catch(e) {
        return res.status(500).send(e); 
    }

    const novoUsuario = new Usuario(Object.assign({}, req.body));
    novoUsuario.senha = hashedSenha;

    try {
        await novoUsuario.save().then(() => {
            res.status(201).redirect('/');
        })
        .catch(e => {
            if (e.code === 11000) {
                res.status(400).json({ "status": 400, "conteudo": "usuário já cadastrado" });
            }
        });
    } catch (e) {
        res.status(500).json({ "status": 500, "mensagem": e.message });
    };

}

const login = async (req, res) => {

    const usuario = await Usuario.findOne({
        email: req.body.email
    });

    if (usuario === null) {
        res.status(401).redirect('/auth/login');
    }

    try {
        bcrypt.compare(req.body.senha, usuario.senha, (err, result) => {
            if (err) {
                res.status(401).send('Não autorizado');
            }
            if (result) {
                const user = usuario;

                req.session.user = user;

                res.status(200).redirect('/');

            }
        });
    } catch (e) {
        res.status(500).end(e.message);
    }

}

const atualizar = (req, res) => {
    Usuario.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({
                    "status": 404,
                    "conteudo": "usuário não encontrado"
                });
            }
            req.session.user = usuario;
            return res.status(200).redirect('/perfil');
        }).catch(err => {
            return res.status(500).json({
                "status": 500,
                "conteudo": `${err.message}`
            });
        });
}

const deletar = (req, res) => {

    try {
        Usuario.deleteOne({
            _id: req.params.id
        })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({
                        "status": 404,
                        "conteudo": "usuário não encontrado"
                    });
                }
                req.session.destroy();
                return res.status(200).redirect('/');
            })
            .catch(err => {
                return res.status(500).json({
                    "status": 500,
                    "conteudo": `${err.message}`
                });
            })
    } catch(e) {
        return res.status(500).send(`<b>Error:</b> ${e.message}`);
    }
}

const atualizarPerfil = (req, res) => {

    res.status(200).render('atualizar-perfil', {
        usuario: req.session.user
    });

}


const logout = (req, res) => {
    req.session.destroy();
    res.status(200).redirect('/');
}


module.exports = { listar, listarPorId, listarPorEmail, cadastrar, login, atualizar, deletar, atualizarPerfil, logout }
