const express = require('express');
const router = express.Router();

// controller
const usuario = require('../controllers/usuarioController');

// routes
router.get('/usuario/', usuario.listar);
router.get('/usuario/:id', usuario.listarPorId);
router.get('/usuario/:email', usuario.listarPorEmail);
router.post('/', usuario.cadastrar);
router.put('/usuario/atualizar/:id', usuario.atualizar);
router.post('/usuario/deletar/:id', usuario.deletar);
// router.post('/auth', usuario.auth);

module.exports = router;