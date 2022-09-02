const repository = require('../repository/usuarioRepository');
const { validaObjeto } = require('../validators/requestValidator');

const listar = async () => {
    try {
        return await repository.listar();
    } catch (error) {
        throw new Error(error.message)
    }
}

const listarPorId = async (id) => {
    if (id) {
        try {
            return await repository.listarPorId(id);
        } catch (error) {
            throw new Error(error.message)
        }
    } else {
        throw new Error("id de usuário não informado")
    }
}

const listarPorEmail = async (email) => {
    if (email) {
        try {
            return await repository.listarPorEmail(email);
        } catch (error) {
            throw new Error(error.message)
        }
    } else {
        throw new Error("email não informado")
    }
}

const cadastrar = async (params) => {
    const { nome, sobrenome, email, senha, status } = params
    const novoUsuario = Object.assign({}, { nome, sobrenome, email, senha, status })

    if (validaObjeto(novoUsuario)) {
        try {
            return await repository.cadastrar(novoUsuario)
        } catch (error) {
            throw new Error(error.message)
        }
    }
    else {
        throw new Error("todos os dados devem ser informados")
    }

}

const atualizar = async (id, params) => {

    if(id && validaObjeto(params)){
        try{
            return await repository.atualizar(id, params)
        }catch(error){
            throw new Error(error.message);
        }
    }else{
        return false
    }
}

const deletar = async (id) => {
    if (!id) {
        throw new Error("id não informado")
    }

    try {
        return await repository.deletar(id);
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { listar, listarPorId, listarPorEmail, cadastrar, atualizar, deletar }
