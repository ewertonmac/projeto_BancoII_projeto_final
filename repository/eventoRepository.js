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
    try {
        const evento = new Evento(dados)
        await evento.save()
        return true
    } catch (err) {
        if (e.code === 11000) { // evento já cadastrado
            return false;
        }
        else {
            throw e;
        }
    }
}

const inscreverOuvinte = async (evento, ouvinte) => await evento.updateOne({ $push: { ouvintes: ouvinte } });

const atualizar = async (evento, eventoAtualizar) => await evento.updateOne(eventoAtualizar, { new: false });

const deletar = async (idEvento, idPalestrante) => await Evento.deleteOne({ $and: [{ _id: idEvento }, { "palestrante._id": idPalestrante }] });

module.exports = {
    listar,
    ultimosEventos,
    listarPorId,
    cadastrar,
    inscreverOuvinte,
    atualizar,
    deletar
};