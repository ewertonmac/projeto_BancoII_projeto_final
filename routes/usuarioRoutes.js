const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuarioController');

module.exports = {
    listarUsuarios: router.get('/usuario/', usuario.listar),
    listarPorId: router.get('/usuario/:id', usuario.listarPorId),
    listarPorEmail: router.get('/usuario/email/:email', usuario.listarPorEmail),
    cadastrarUsuario: router.post('/usuario', usuario.cadastrar),
    atualizarUsuario: router.put('/usuario/:id', usuario.atualizar),
    deletarUsuario: router.delete('/usuario/:id', usuario.deletar)
}

