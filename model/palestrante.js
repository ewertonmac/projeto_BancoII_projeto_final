const mongoDB = require('../database/mongo');

const schema = new mongoDB.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    minicurriculo: {type: String, required: true},
    status: {type: String, required: true},
    site: {type: String, required: true},
    curriculoLattes: {type: String, required: true},
    redeSocial: {type: String, required: true}
})

const Palestrante = mongoDB.model('Palestrante', schema);

module.exports = Palestrante;