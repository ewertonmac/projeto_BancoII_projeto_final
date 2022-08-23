const express = require('express');
const router = express.Router();

// controller
const usuario = require('../controllers/usuarioController');

// routes

router.get('/auth/login', (req, res) => {
   res.status(200).render('login');
})

router.get('/auth/signup', (req, res) => {
    res.status(200).render('signup');
});

router.post('/auth/login', usuario.login);

router.post('/auth/signup', usuario.cadastrar);

module.exports = router;