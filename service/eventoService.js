const repository = require('../repository/eventoRepository')

const listar = async () => {
    try {
        return await repository.listar();
    } catch (error) {
        throw new Error(error.message)
    }
}

const ultimosEventos = async (limit) => {
    try {
        return await repository.ultimosEventos(limit || 3)
    } catch (error) {
        throw new Error(error.message)
    }
}

const listarPorId = async (id) => {
    try {
        if (id) {
            return await repository.listarPorId(id);
        }
        else {
            return false;
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const cadastrar = async (palestrante, params) => {
    const dados = Object.assign({}, params)
    dados.palestrante = palestrante

    const dadosValidos = Object.entries(dados).every((key,value) => value !== null && value !== '')

    if (dadosValidos) {
        try {
            return await repository.cadastrar(dados)
        } catch (error) {
            throw new Error(error.message)
        }
    }
    else {
        throw new Error("todos os dados devem ser informados")
    }
}

module.exports = {
    listar,
    ultimosEventos,
    listarPorId,
    cadastrar
};