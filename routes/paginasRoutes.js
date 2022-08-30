const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const eventoController = require('../controllers/eventoController');
const usuarioController = require('../controllers/usuarioController');

// routes

router.get('/', eventoController.listarHome);

router.get('/sobre', (req, res) => {
    res.status(200).render('sobre', {
        usuario: req.session.user
    });
});

router.get('/perfil/', auth, (req, res) => {
    res.status(200).render('perfil', {
        usuario: req.session.user
    })
});

router.get('/perfil/:id', usuarioController.listarPorId);


router.get('/publicar', auth, (req, res) => {
    res.status(200).render('publicar', {
        usuario: req.session.user
    });
})

router.get('/comunidade', usuarioController.listar);

module.exports = router;