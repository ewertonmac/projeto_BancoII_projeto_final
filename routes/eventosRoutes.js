const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const eventoController = require('../controllers/eventoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     CadastroEvento:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do evento.
 *           example: III Sertão Comp
 *         descricao:
 *           type: string
 *           description: Descrição do evento.
 *           example: Encontro de computação do sertão
 *         data:
 *           type: string
 *           description: Data de ocorrência do evento.
 *           example: 16/12/2022
 *         urlImagem:
 *           type: string
 *           description: URL da imagem do evento hospedada na internet (com extensão no final).
 *           example: https://images.even3.com.br/MoXgn5yL_7k1SIZ59cOWPJCyIV8=/1100x440/smart/even3.blob.core.windows.net/banner/WhatsAppImage2021-06-03at16.21.05.5026e6601f1446faaeb6.jpeg.
 *         siteOficial:
 *           type: string
 *           description: Site oficial do evento.
 *           example: http://www.sertaocomp.info
 *         categoria:
 *           type: string
 *           description: Categoria do evento.
 *           example: Desenvolvimento.
 *         palestrante:
 *           type: object
 *           description: Palestrante do evento. Usuário que publicou o evento.
 *           properties:
 *              nome:
 *                type: string
 *                description: Nome do usuário.
 *                example: Moacir
 *              sobrenome:
 *                type: string
 *                description: Sobrenome do usuário.
 *                example: David
 *              email:
 *                type: string
 *                description: E-mail do usuário.
 *                example: moacir@gmail.com
 *              minicurriculo:
 *                type: string
 *                description: Breve descrição acadêmica do usuário.
 *                example: Estudante de Análise e Desenvolvimento de Sistemas - IFPB Campus Cajazeiras.
 *              _id:
 *                type: string
 *                description: Id único do usuário.
 *                example: 63061af8d0165001cd2ce662
 *              instagramUser:
 *                type: string
 *                description: Instagram do palestrante.
 *                example: moacirinstagram
 *              twitterUser:
 *                type: string
 *                description: Twitter do palestrante.
 *                example: moacirtwitter 
 *              curriculoLattes:
 *                type: string
 *                description: Link do currículo Lattes do palestrante.
 *                example: http://www.link.com
 *         ouvintes:
 *          type: array
 *          description: Lista de usuários inscritos no evento.
 *          items:
 *              type: object
 *              properties:
 *                 nome: 
 *                   type: string
 *                   description: Nome do ouvinte.
 *                   example: João
 *                 sobrenome: 
 *                   type: string
 *                   description: Sobrenome do ouvinte.
 *                   example: Silva
 *                 email: 
 *                   type: string
 *                   description: E-mail do ouvinte.
 *                   example: joaosilva@gmail.com
 *     CadastroOuvinte:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do ouvinte.
 *           example: Fernanda
 *         sobrenome:
 *           type: string
 *           description: Sobrenome do ouvinte.
 *           example: Brum
 *         email:
 *           type: string
 *           description: E-mail do ouvinte.
 *           example: fernanda.brum@gmail.com      
 */

// routes

/**
 * @swagger
 * /:
 *   get:
 *     tags: 
 *      - Eventos
 *     summary: Lista os eventos da página inicial.
 *     description: Lista três eventos na página inicial do sistema.             
 *     responses:
 *       200:
 *         description: Ok. 
 */

router.get('/', eventoController.listarHome);

/**
 * @swagger
 * /eventos/:
 *   get:
 *     tags: 
 *      - Eventos
 *     summary: Lista todos os eventos.
 *     description: Lista todos os eventos cadastrados no sistema na rota 'eventos'.             
 *     responses:
 *       200:
 *         description: Ok. 
 */

router.get('/eventos/', eventoController.listar);

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *     tags: 
 *      - Eventos
 *     summary: Retorna um evento pelo seu id.
 *     description: Retorna um evento a partir do seu id.             
 *     responses:
 *       200:
 *         description: Ok. 
 *       404:
 *         description: Evento não encontrado.
 */

router.get('/eventos/:id', eventoController.listarPorId);

/**
 * @swagger
 * /eventos/:
 *   post:
 *     tags: 
 *      - Eventos
 *     summary: Cadastra um evento.
 *     description: Cadastra um evento no sistema. É necessário estar autenticado. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CadastroEvento'          
 *     responses:
 *       201:
 *         description: Evento criado com sucesso!. 
 *       400:
 *         description: Falha no cadastro!
 */

router.post('/eventos', auth, eventoController.cadastrar);

/**
 * @swagger
 * /eventos/inscrever/{id}:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *     tags: 
 *      - Eventos
 *     summary: Inscreve um usuário em um evento.
 *     description: Inscreve um usuário em um evento. É necessário estar autenticado.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CadastroOuvinte'             
 *     responses:
 *       200:
 *         description: Ok. 
 *       404:
 *         description: Dados para a inscrição insuficientes (conferir nome, sobrenome e e-mail).
 */

router.post('/eventos/inscrever/:id', auth, eventoController.inscreverOuvinte);



router.get('/atualizar/eventos/:id', auth, eventoController.atualizarEvento);

/**
 * @swagger
 * /eventos/atualizar/{id}:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *     tags: 
 *      - Eventos
 *     summary: Cadastra um evento.
 *     description: Cadastra um evento no sistema. É necessário estar autenticado. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CadastroEvento'          
 *     responses:
 *       201:
 *         description: Evento criado com sucesso!. 
 *       400:
 *         description: Falha no cadastro!
 */

router.post('/atualizar/eventos/:id', auth, eventoController.atualizar);


router.post('/deletar/eventos/:id', auth, eventoController.deletar);

module.exports = router;