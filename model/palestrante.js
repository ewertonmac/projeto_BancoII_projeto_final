const mongoDB = require('../database/mongo');


const schema = new mongoDB.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    minicurriculo: {type: String},
    status: {type: String, required: true},
    site: {type: String},
    curriculoLattes: {type: String},
    redeSocial: {type: String}
})

const Palestrante = mongoDB.model('Palestrante', schema);

module.exports = Palestrante;