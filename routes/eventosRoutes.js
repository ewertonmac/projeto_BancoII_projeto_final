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
router.put('/eventos/:id', auth, eventoController.atualizar);
router.delete('/eventos/:id', auth, eventoController.deletar);

module.exports = router;