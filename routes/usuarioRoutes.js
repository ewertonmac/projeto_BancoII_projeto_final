const express = require('express');
const router = express.Router();

// controller
const usuario = require('../controllers/usuarioController');

// routes

router.get('/usuario/', usuario.listar);
router.get('/usuario/:id', usuario.listarPorId);
router.get('/usuario/email/:email', usuario.listarPorEmail);
router.put('/usuario/:id', usuario.atualizar);
router.delete('/usuario/:id', usuario.deletar);

module.exports = router;
