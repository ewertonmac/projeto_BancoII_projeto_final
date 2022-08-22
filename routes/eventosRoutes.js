const express = require('express');
const router = express.Router();

// routes

router.get('/eventos', eventoController.listar);
router.get('/eventos/proximos/:quantidade', eventoController.proximosEventos);
router.get('/eventos/:id', eventoController.listarPorId);
router.get('/eventos/email/:email', eventoController.listarPorEmailPalestrante);
router.post('/eventos', eventoController.cadastrar);
router.put('/eventos/inscrever/:id', eventoController.inscreverOuvinte);
router.put('/eventos/:id', eventoController.atualizar);
router.delete('/eventos/:id', eventoController.deletar);

module.exports = router;