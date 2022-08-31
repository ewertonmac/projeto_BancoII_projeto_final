const express = require('express');
const router = express.Router();
const flash = require('connect-flash')

// controller
const usuario = require('../controllers/usuarioController');

// Definição dos esquemas a serem usados pela documentação Swagger.
/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: E-mail do usuário.
 *           example: moacir@gmail.com
 *         senha:
 *           type: string
 *           description: Senha do usuário.
 *           example: 123
 *     UsuarioCadastro:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do usuário.
 *           example: Moacir
 *         sobrenome: 
 *           type: string
 *           description: Sobrenome do usuário.
 *           example: David
 *         email:
 *           type: string
 *           description: E-mail do usuário.
 *           example: moacir@gmail.com
 *         senha:
 *           type: string
 *           description: Senha do usuário.
 *           example: 123
 *         status:
 *           type: string
 *           description: Função do usuário (o que ele é).
 *           example: Estudante
 */



// routes


router.get('/auth/login', (req, res) => {
    res.status(200).render('login');
})

router.get('/auth/signup', (req, res) => {
    res.status(200).render('signup');
});

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: 
 *      - Autenticação
 *     summary: Cadastro de usuário.
 *     description: Faz o cadastro de um usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCadastro'        
 *     responses:
 *       200:
 *         description: Usuário cadastrado. 
 *       400:
 *         description: E-mail já cadastrado.
 */

router.post('/auth/login', usuario.login);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: 
 *      - Autenticação
 *     summary: Login de usuário.
 *     description: Faz a autenticação de um usuário já cadastrado no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioLogin'        
 *     responses:
 *       200:
 *         description: Usuário logado.
 *       400:
 *         description: E-mail ou senha inválidos.
 */

router.post('/auth/signup', usuario.cadastrar);

router.get('/auth/logout', usuario.logout);


module.exports = router;
