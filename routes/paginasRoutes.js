const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const eventoController = require('../controllers/eventoController');

// routes

router.get('/', eventoController.listarHome);

router.get('/eventos', (req, res) => {
    res.status(200).render('eventos', {
        usuario: req.session.user     
    });
});

router.get('/sobre', (req, res) => {
    res.status(200).render('sobre', {
        usuario: req.session.user
    });
});

router.get('/perfil', auth, (req, res) => {
    res.status(200).render('perfil', {
        usuario: req.session.user
    });
})

router.get('/publicar', auth, (req, res) => {
    res.status(200).render('publicar', {
        usuario: req.session.user
    });
})

module.exports = router;