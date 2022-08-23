const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

// routes

router.get('/', auth, (req, res) => {
    res.status(200).render('index', {
        usuario: req.session.user.nome,
    });
});

router.get('/eventos', auth, (req, res) => {
    res.status(200).render('eventos', {
        usuario: req.session.user.nome       
    });
});

router.get('/sobre', auth, (req, res) => {
    res.status(200).render('sobre', {
        usuario: req.session.user.nome
    });
});


module.exports = router;