// importações das dependências
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
require('dotenv').config();

// importações dos routes
const usuarioRoutes = require('./routes/usuarioRoutes');

// configurações

const port = process.env.PORT || 3002;
const app = express();

// view e template engine

app.set('view engine', '.hbs');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));

// outras configs
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// rotas e middlewares

//adicionar middleware para controle de rotas / verificar se o usuário está logado

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/login', (req, res) => {
    res.status(200).render('login');
});

app.get('/signup', (req, res) => {
    res.status(200).render('signup');
});

app.get('/sobre', (req, res) => {
    res.status(200).render('sobre');
});

app.get('/eventos', (req, res) => {
    res.status(200).render('eventos');
});

app.get('/editar', (req, res) => {
    res.status(200).render('editar');
});

app.get('/evento/:id', (req, res) => {
    res.status(200).render('detalhes');
})

// rotas do usuário

app.post('/usuario', usuarioRoutes.cadastrarUsuario);

app.use((req, res) => {
    res.status(400).send("Not Found");
});port



// server

app.listen(port, () => console.log(`O servidor está rodando em http://localhost:${port}`));