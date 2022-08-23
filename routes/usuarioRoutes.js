const express = require('express');
const router = express.Router();

// controller
const usuario = require('../controllers/usuarioController');

// routes
router.get('/', usuario.listar);
router.get('/:id', usuario.listarPorId);
router.get('/email/:email', usuario.listarPorEmail);
router.post('/', usuario.cadastrar);
router.put('/:id', usuario.atualizar);
router.delete('/:id', usuario.deletar);
router.post('/auth', usuario.auth);

module.exports = router;