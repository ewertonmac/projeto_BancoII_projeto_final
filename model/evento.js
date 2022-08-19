const mongoDB = require('../database/mongo');
const Usuario = require('./usuario');

const schema = new mongoDB.Schema({
    nome: { type: String, required: true, unique: true },
    descricao: { type: String, required: true },
    data: { type: Date, required: true },
    siteOficial: { type: String, required: true },
    palestrante: {
        type: {
            nome: { type: String, required: true },
            sobrenome: { type: String, required: true },
            email: { type: String, required: true },
        }, required: true
    },
    ouvintes: {
        type: [{
            nome: { type: String, required: true },
            sobrenome: { type: String, required: true },
            email: { type: String, required: true, unique: true },
        }], required: false
    },
});

const Evento = mongoDB.model('Evento', schema);

module.exports = Evento;