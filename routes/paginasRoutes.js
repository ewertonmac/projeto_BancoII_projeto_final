const express = require('express');
const router = express.Router();

// routes

router.get('/', (req, res) => {
    res.status(200).render('index');
});

router.get('/eventos', (req, res) => {
    res.status(200).render('eventos');
});

router.get('/sobre', (req, res) => {
    res.status(200).render('sobre');
});

module.exports = router;