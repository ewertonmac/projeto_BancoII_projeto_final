const Usuario = require('../model/usuario');

const listar = async () => {
    return await Usuario.find().sort()
}

const listarPorId = async (id) => {
    const usuario = await Usuario.findById(id)
    return usuario ? usuario : false;
}

const listarPorEmail = async (email) => {
    const usuario = await Usuario.findOne({ email })
    return usuario ? usuario : false;
}

const cadastrar = async (params) => {
    try{
        const novoUsuario = new Usuario(params);
        await novoUsuario.save()
        return true
    }catch(err){
        if (e.code === 11000) { // usuario já cadastrado
            return false;
        }
        else {
            throw e;
        }
    }
}

const atualizar = async (id, params) => {
    const usuarioAtrualizado = await Usuario.findByIdAndUpdate(id, params, { new: true })
    return usuarioAtrualizado ? usuarioAtrualizado : false;
}

const deletar = async (_id) => {
    const {deletedCount} = await Usuario.deleteOne({ _id })
    return !!deletedCount
}

module.exports = { listar, listarPorId, listarPorEmail, cadastrar, atualizar, deletar }
