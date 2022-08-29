const express = require('express');
const router = express.Router();
const flash = require('connect-flash')

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

router.get('/auth/logout', usuario.logout);


module.exports = router;
