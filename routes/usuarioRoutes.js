const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuarioController');

router.get('/', usuario.listar);
router.get('/:id', usuario.listarPorId);
router.get('/email/:email', usuario.listarPorEmail);
router.post('/', usuario.cadastrar);
router.put('/:id', usuario.atualizar);
router.delete('/:id', usuario.deletar);
router.post('/auth', usuario.aut);
/*
module.exports = {
    listarUsuarios: router.get('/usuario/', usuario.listar),
    listarPorId: router.get('/usuario/:id', usuario.listarPorId),
    listarPorEmail: router.get('/usuario/email/:email', usuario.listarPorEmail),
    cadastrarUsuario: router.post('/usuario', usuario.cadastrar),
    atualizarUsuario: router.put('/usuario/:id', usuario.atualizar),
    deletarUsuario: router.delete('/usuario/:id', usuario.deletar)
}*/

module.exports = router;