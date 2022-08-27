const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const eventoController = require('../controllers/eventoController');

// routes

router.get('/', eventoController.listarHome);
router.get('/eventos/', eventoController.listar);
router.get('/eventos/proximos/:quantidade', eventoController.proximosEventos);
router.get('/eventos/:id', eventoController.listarPorId);
router.get('/eventos/email/:email', eventoController.listarPorEmailPalestrante);
router.post('/eventos', auth, eventoController.cadastrar);
router.post('/eventos/inscrever/:id', auth, eventoController.inscreverOuvinte);
router.get('/atualizar/eventos/:id', auth, eventoController.atualizarEvento);
router.post('/atualizar/eventos/:id', auth, eventoController.atualizar);
router.post('/deletar/eventos/:id', auth, eventoController.deletar);

module.exports = router;