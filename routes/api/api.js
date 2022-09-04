const express = require('express');
const router = express.Router();
const Usuario = require('../../model/usuario');


// Usuário

router.post('/api/cadastrar-usuario', async (req, res) => {
    const {nome, sobrenome, email, senha, status } = req.body;
    const usuarioObjeto = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
        status: status
    };
    try {
        const usuario = new Usuario(usuarioObjeto);
        usuario.save().then(() => {
            return res.status(201).send("Usuário cadastrado!");
        }).catch(() => {
            return res.status(400).send("Usuário não cadastrado!");
        })
    } catch(e) {
        return res.status(500).send(`Erro: ${e.message}`);
    }
});

router.get('/api/usuario-email/:email', async (req, res) => {
    
    const { email } = req.params;
    try {
        const usuario = await Usuario.findOne({ email: email });
        const usuarioFormatado = {
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            email: usuario.email,
            status: usuario.status
        }
        if(usuario) {
            return res.status(200).send(usuarioFormatado);
        }
        return res.status(404).send("Usuário não encontrado!");
    } catch(e) {
        return res.status(500).send(`Erro: ${e.message}`);
    }

});


module.exports = router;