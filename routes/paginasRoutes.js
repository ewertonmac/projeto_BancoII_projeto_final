const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

// routes

router.get('/', auth, (req, res) => {
    res.status(200).render('index');
});

router.get('/eventos', auth, (req, res) => {
    res.status(200).render('eventos');
});

router.get('/sobre', auth, (req, res) => {
    res.status(200).render('sobre');
});

module.exports = router;