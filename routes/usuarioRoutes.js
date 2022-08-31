const express = require('express');
const router = express.Router();

// controller
const usuario = require('../controllers/usuarioController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioAtualizar:
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
 *         minicurriculo:
 *           type: string
 *           description: Breve descrição acadêmica do usuário.
 *           example: Estudante de Análise e Desenvolvimento de Sistemas - IFPB Campus Cajazeiras.
 *         urlImagemPerfil:
 *           type: string
 *           description: Url de alguma imagem hospedada na internet (com extensão no final) para foto de perfil.
 *           example: https://64.media.tumblr.com/baee0ea0d219e72d2c3a3ce2849757ee/1d520097001d1183-34/s400x600/576bd1b221eea0d056bedab0f3170cba2aa3ef36.pnj
 *         instituicao:
 *           type: string
 *           description: Instituição acadêmica do usuário.
 *           example: IFPB - Campus Cajazeiras.
 *         telefone:
 *           type: string
 *           description: Telefone do usuário.
 *           example: (83) 98200-0001
 *         site:
 *           type: string
 *           description: URL do site pessoal do usuário.
 *           example: http://www.moacirdavidag.github.io
 *         curriculoLattes:
 *           type: string
 *           description: URL do currículo Lattes do usuário.
 *           example: http://www.link.com
 *         instagramUser:
 *           type: string
 *           description: Instagram do usuário.
 *           example: moacirinstagram
 *         twitterUser:
 *           type: string
 *           description: Twitter do usuário.
 *           example: moacirtwitter
 *         githubUser:
 *           type: string
 *           description: Nome de usuário do github do usuário.
 *           example: moacirdavidag
 */


// routes

/**
 * @swagger
 * /usuario/:
 *   get:
 *     tags: 
 *      - Usuário
 *     summary: Lista todos os usuários cadastrados.
 *     description: Faz a listagem de todos os usuários cadastrados na página 'Comunidade'.       
 *     responses:
 *       200:
 *         description: Ok. 
 *       404:
 *         description: Nenhum usuário encontrado.
 */

router.get('/usuario/', usuario.listar);

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *     tags: 
 *      - Usuário
 *     summary: Retorna um usuário pelo seu id.
 *     description: Retorna um usuário pelo seu id.       
 *     responses:
 *       200:
 *         description: Ok.
 *       404:
 *         description: Nenhum usuário encontrado.
 */

router.get('/usuario/:id', usuario.listarPorId);

/**
 * @swagger
 * /usuario/cadastrar:
 *   post:
 *     tags: 
 *      - Usuário
 *     summary: Rota de cadastro de um usuário.
 *     description: Rota de cadastro de um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCadastro'       
 *     responses:
 *       201:
 *         description: Usuário cadastrado. 
 *       400:
 *         description: Usuário já cadastrado.
 */

router.post('/usuario/cadastrar', usuario.cadastrar);

/**
 * @swagger
 * /usuario/atualizar/{id}:
 *   post:
  *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *     tags: 
 *      - Usuário
 *     summary: Atualiza as informações de perfil de um usuário.
 *     description: Atualiza as informações de perfil de um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioAtualizar'       
 *     responses:
 *       201:
 *         description: Informações atualizadas com sucesso. 
 *       404:
 *         description: Usuário não encontrado.
 */

router.post('/usuario/atualizar/:id', usuario.atualizar);

router.get('/usuario/atualizar/:id', usuario.atualizarPerfil);

/**
 * @swagger
 * /usuario/deletar/{id}:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *          required: true
 *     tags: 
 *      - Usuário
 *     summary: Deleta um usuário.
 *     description: Deleta um usuário a partir de seu id.             
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso. 
 *       404:
 *         description: Usuário não encontrado.
 */

router.post('/usuario/deletar/:id', usuario.deletar);

module.exports = router;