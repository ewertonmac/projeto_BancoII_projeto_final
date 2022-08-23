const Usuario = require('../model/usuario');
const bcrypt = require('bcrypt');
const redis = require('../database/redis');
require('dotenv').config();

const listar = (req, res) => {
    Usuario.find()
        .then(usuarios => {
            if (!usuarios) {
                return res.status(404).json({
                    "status": 404,
                    "conteudo": "Nenhum usuário encontrado"
                });
            }
            return res.status(200).send(usuarios);
        }).catch(err => {
            return res.status(500).json({
                "status": 500,
                "conteudo": `${err.message}`
            });
        });
}

const listarPorId = (req, res) => {
    Usuario.findById(req.params.id)
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
    const hashedSenha = await bcrypt.hash(req.body.senha, salt);

    const novoUsuario = new Usuario(Object.assign({}, req.body));
    novoUsuario.senha = hashedSenha;

    try {
        usuario = novoUsuario.save().then(() => {
            res.status(201).redirect('/');
        }).catch(e => {
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
        req.flash('Não autorizado')
        res.status(401).redirect('/auth/login');
    }

    try {
        bcrypt.compare(req.body.senha, usuario.senha, (err, result) => {
            if (err) {
                res.status(401).send('Não autorizado!');
            }
            if (result) {
                const user = usuario;

                req.session.user = user;
                // setando o token da sessão no Redis
                
                res.status(200).redirect('/');

            }
        });
    } catch(e) {
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
            return res.status(200).send(usuario);
        }).catch(err => {
            return res.status(500).json({
                "status": 500,
                "conteudo": `${err.message}`
            });
        });
}

const deletar = (req, res) => {
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
            return res.status(200).json({
                "status": 200,
                "conteudo": "usuário deletado com sucesso"
            });
        })
        .catch(err => {
            return res.status(500).json({
                "status": 500,
                "conteudo": `${err.message}`
            });
        })
}

const auth = async (req, res) => {
    console.log(req.body);

    const {
        email,
        senha
    } = req.body;

    const usuario_encontrado = await Usuario.findOne({
        email
    });
    console.log(usuario_encontrado);
    if (!usuario_encontrado) {
        return res.status(404).json({
            "status": 404,
            "conteudo": "usuário não encontrado"
        });
    }

    const senha_comparada = await bcrypt.compare(senha, usuario_encontrado.senha);
    console.log(senha_comparada);
    if (!senha_comparada) {
        return res.status(401).json({
            "status": 401,
            "conteudo": "Senhas diferentes"
        });
    }

    const {
        token_key
    } = process.env;

    const token = sign({
        email
    }, token_key, {
        expiresIn: '4h',
        subject: email
    })

    return res.status(200).json({
        token
    })
}



module.exports = { listar, listarPorId, listarPorEmail, cadastrar, login, atualizar, deletar, auth }
