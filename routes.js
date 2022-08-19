const express = require('express');
const router = express.Router();

const palestranteController = require('./controllers/palestranteController');
const ouvinteController = require('./controllers/ouvinteController');

//palestrante routes
router.get('/palestrantes', palestranteController.listar);
router.get('/palestrante/:id', palestranteController.listarPorId);
router.get('/palestrante/email/:email', palestranteController.listarPorEmail);
router.post('/palestrante', palestranteController.cadastrar);
router.put('/palestrante/:id', palestranteController.atualizar);
router.delete('/palestrante/:id', palestranteController.deletar);

//ouvinte routes
router.get('/ouvintes', ouvinteController.listar);
router.get('/ouvinte/:id', ouvinteController.listarPorId);
router.get('/ouvinte/email/:email', ouvinteController.listarPorEmail);
router.post('/ouvinte', ouvinteController.cadastrar);
router.put('/ouvinte/:id', ouvinteController.atualizar);
router.delete('/ouvinte/:id', ouvinteController.deletar);

module.exports = router;