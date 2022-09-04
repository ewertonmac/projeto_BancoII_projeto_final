// importações das dependências
const express = require('express');
const flash = require('connect-flash');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const redisClient = require('./database/redis');
let RedisStore = require("connect-redis")(session);
const swaggerUi = require('swagger-ui-express');
const swaggerJsDocs = require('swagger-jsdoc');
require('dotenv').config();

// importações dos routes
const usuarioRoutes = require('./routes/usuarioRoutes');
const autenticacaoRoutes = require('./routes/autenticacao');
const paginasRoutes = require('./routes/paginasRoutes');
const eventosRoutes = require('./routes/eventosRoutes');
const apiRoutes = require('./routes/api/api');
const swaggerJSDoc = require('swagger-jsdoc');

// configurações

const port = process.env.PORT || 3002;
const app = express();


// view e template engine

app.set('view engine', '.hbs');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));


// outras configs
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.token_key,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
        client: redisClient
    }),
}));
app.use(flash());


// rotas e middlewares


// páginas


app.all('/*', paginasRoutes);

// autenticação

app.all('/auth/*', autenticacaoRoutes);

// eventos

app.all(/eventos(\/)*(\w)*(\/*)(\w)*(\/*)(\w)*/, eventosRoutes);

// rotas do usuário

app.all('/usuario/*', usuarioRoutes);

// rotas da api

app.all('/api/*', apiRoutes);

// documentação

const swaggerDefinition = {
    "openapi": "3.0.0",
    "info": {
        "title": "even4",
        "version": "1.2.0",
        "description": "Sistema de publicação de eventos acadêmicos online.",
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "servers": [{
            "url": "http://localhost:3002",
            "description": "Ambiente de desenvolvimento"
        },
        {
            "url": "https://even4.herokuapp.com/",
            "description": "Produção"
        }
    ]
}

const options = {
    swaggerDefinition,
    apis: ['./routes/eventosRoutes.js', './routes/paginasRoutes.js', './routes/autenticacao.js', './routes/usuarioRoutes.js']
};

const swaggerSpecs = swaggerJsDocs(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Not Found

app.use((req, res) => {
    res.status(400).send("Not Found");
});

// server

app.listen(port, () => console.log(`O servidor está rodando em  http://localhost:${port}`));