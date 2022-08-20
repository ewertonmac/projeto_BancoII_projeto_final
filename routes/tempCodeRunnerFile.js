const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuarioController');

router.get('/usuario', usuario.listar);
router.get('/usuario/:id', usuario.listarPorId);
router.get('/usuario/email/:email', usuario.listarPorEmail);
router.post('/usuario', usuario.cadastrar);
router.put('/usuario/:id', usuario.atualizar);
router.delete('/usuario/:id', usuario.deletar);

