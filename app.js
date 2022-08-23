// importações das dependências
const express = require('express');
const flash = require('connect-flash');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
require('dotenv').config();

// importações dos routes
const usuarioRoutes = require('./routes/usuarioRoutes');
const autenticacaoRoutes = require('./routes/autenticacao');
const paginasRoutes = require('./routes/paginasRoutes');

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
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: process.env.token_key,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// rotas e middlewares


// páginas

app.all('/*', paginasRoutes);

// autenticação

app.all('/auth/*', autenticacaoRoutes);


// rotas do usuário

app.use('/usuario', usuarioRoutes);

app.use((req, res) => {
    res.status(400).send("Not Found");
});

// server

app.listen(port, () => console.log(`O servidor está rodando em http://localhost:${port}`));