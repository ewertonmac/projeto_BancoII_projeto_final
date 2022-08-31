const mongoDB = require('../database/mongo');
const Usuario = require('./usuario');

const schema = new mongoDB.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    urlImagem: {
        type: String,
        require: true
    },
    siteOficial: {
        type: String,
        required: true
    },
    categoria: String,
    palestrante: {
        type: {
            nome: {
                type: String,
                required: true
            },
            sobrenome: {
                type: String,
                required: true
            },
            _id: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            minicurriculo: {
                type: String,
                required: true
            },
            curriculoLattes: {
                type: String,
                required: true
            },
            site: {
                type: String,
                required: true
            },
            twitterUser: {
                type: String,
                required: false
            },
            instagramUser: {
                type: String,
                required: false
            },
        },
        required: true
    },
    ouvintes: {
        type: [{
            nome: {
                type: String,
                required: true
            },
            sobrenome: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
        }],
        required: false
    },
});

const Evento = mongoDB.model('Evento', schema);

module.exports = Evento;