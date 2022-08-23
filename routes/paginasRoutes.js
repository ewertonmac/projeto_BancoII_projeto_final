const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

// routes

router.get('/', (req, res) => {
    res.status(200).render('index', {
        usuario: req.session.user
    });
});

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

module.exports = router;