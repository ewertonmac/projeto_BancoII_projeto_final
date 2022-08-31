const usuarioService = require("../service/usuarioService")
const bcrypt = require('bcrypt');
require('dotenv').config();

const listar = async (req, res) => {
    try {
        const usuarios = await usuarioService.listar()
        if (!usuarios) {
            return res.status(404).json({
                "status": 404,
                "conteudo": "Nenhum usuário encontrado"
            });
            }
            return res.status(200).render('comunidade', {
                usuario: req.session.user, 
                usuarios: usuarios
            }
        );        
    } catch (error) {
        return res.status(500).json({
            "status": 500,
            "conteudo": `${error.message}`
        });
    }
}

const listarPorId = async (req, res) => {
    if(req.session.user) {
        if(req.params.id === req.session.user._id) {
            return res.redirect('/perfil');
        }
    }
    
    const result = await usuarioService.listarPorId(req.params.id)
        res.status(200).render('visita-perfil', {
            usuario: req.session.user,
            usuarioLogado: result
        });
}

/* const listarPorEmail = async (req, res) => {
    try{
        const usuario = await usuarioService.listarPorEmail(req.params.email)
        if (!usuario) {
            return res.status(404).json({
                "status": 404,
                "conteudo": "usuário não encontrado"
            });
        }
        return res.status(200).send(usuario);

    }catch(err){
        return res.status(500).json({
            "status": 500,
            "conteudo": `${err.message}`
        });        
    }
} */

const cadastrar = async (req, res) => {
    const dados = Object.assign({}, req.body)

    try {
        const salt = await bcrypt.genSalt(10);
        dados.senha = await bcrypt.hash(req.body.senha, salt);
        const result = usuarioService.cadastrar(dados)
        if(result){
            res.status(201).redirect('/');
        }
        else{
            res.status(400).json({ "status": 400, "conteudo": "usuário já cadastrado" });
        }
    } catch (e) {
        res.status(500).json({ "status": 500, "mensagem": e.message });
    };

}

const login = async (req, res) => {

    const usuario = await usuarioService.listarPorEmail(req.body.email)

    if (usuario === null) {
        res.status(401).json({mensagem: 'E-mail inválido!'});
    }

    try {
        bcrypt.compare(req.body.senha, usuario.senha, 
            (err, result) => {
                if (err) {
                res.status(400).send('Não autorizado');
            }
            if (result) {
                req.session.user = usuario;
                res.status(200).redirect('/');
            }
        });
    } catch (e) {
        res.status(500).end(e.message);
    }

}

const atualizar = async (req, res) => {
    try{
        const usuarioAtualizado = await usuarioService.atualizar(req.params.id, req.body)

        if (!usuarioAtualizado) {
            return res.status(404).json({
                "status": 404,
                "conteudo": "usuário não encontrado"
            });
        }
        req.session.user = usuarioAtualizado;
        return res.status(200).redirect('/perfil');
    }catch(err){
        return res.status(500).json({
            "status": 500,
            "conteudo": `${err.message}`
        });
    }
}

const deletar = async (req, res) => {

    try {
        const result = await usuarioService.deletar(req.params.id)
        if(!result){
            return res.status(404).json({
                "status": 404,
                "conteudo": "usuário não encontrado"
            });
        }
        req.session.destroy();
        return res.status(200).redirect('/');
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


module.exports = { listar, listarPorId, cadastrar, login, atualizar, deletar, atualizarPerfil, logout }
