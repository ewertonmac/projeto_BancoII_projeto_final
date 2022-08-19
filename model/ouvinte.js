const mongoDB = require('../database/mongo');

const schema = new mongoDB.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    status: {type: String, required: true}
})

const Ouvinte = mongoDB.model('Ouvinte', schema);

module.exports = Ouvinte;