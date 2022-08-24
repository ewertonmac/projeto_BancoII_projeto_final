const express = require('express');
const router = express.Router();

// controller
const usuario = require('../controllers/usuarioController');

// routes
router.get('/usuario/', usuario.listar);
router.get('/usuario/:id', usuario.listarPorId);
router.get('/usuario/:email', usuario.listarPorEmail);
router.post('/usuario/cadastrar', usuario.cadastrar);
router.post('/usuario/atualizar/:id', usuario.atualizar);
router.get('/usuario/atualizar/:id', usuario.atualizarPerfil);
router.post('/usuario/deletar/:id', usuario.deletar);

module.exports = router;