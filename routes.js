const express = require('express');
const router = express.Router();

const usuarioController = require('./controllers/usuarioController');
const eventoController = require('./controllers/eventoController');

//usuario routes
router.get('/usuarios', usuarioController.listar);
router.get('/usuario/:id', usuarioController.listarPorId);
router.get('/usuario/email/:email', usuarioController.listarPorEmail);
router.post('/usuario', usuarioController.cadastrar);
router.put('/usuario/:id', usuarioController.atualizar);
router.delete('/usuario/:id', usuarioController.deletar);

//evento routes
router.get('/eventos', eventoController.listar);
router.get('/eventos/proximos/:quantidade', eventoController.proximosEventos);
router.get('/evento/:id', eventoController.listarPorId);
router.get('/evento/email/:email', eventoController.listarPorEmailPalestrante);
router.post('/evento', eventoController.cadastrar);
router.put('/evento/inscrever/:id', eventoController.inscreverOuvinte);
router.put('/evento/:id', eventoController.atualizar);
router.delete('/evento/:id', eventoController.deletar);

module.exports = router;