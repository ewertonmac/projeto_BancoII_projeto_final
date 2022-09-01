const Evento = require('../model/evento');


const listar = async () => {
    return await Evento.find()
}

const ultimosEventos = async (limit) => {
    return await Evento.find().limit(limit).sort({ data: -1 })
}

const listarPorId = async (id) => {
    return await Evento.findById(id);
}

const cadastrar = async (dados) => {
    try{
        const evento = new Evento(dados)
        await evento.save()
        return true
    }catch(err){
        if (e.code === 11000) { // evento já cadastrado
            return false;
        }
        else {
            throw e;
        }
    }
}

module.exports = {
    listar,
    ultimosEventos,
    listarPorId,
    cadastrar
};