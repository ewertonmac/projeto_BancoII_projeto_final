const repository = require('../repository/eventoRepository')
const { validaObjeto } = require('../validators/requestValidator');

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

const listarPorId = async (id, usuario) => {
    try {
        if (id && usuario) {
            const evento = await repository.listarPorId(id)
            return {
                evento,
                adminEvento: evento.palestrante._id === usuario._id
            }
        }
        else {
            return { evento: false };
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const cadastrar = async (palestrante, params) => {
    const dados = Object.assign({}, params)
    dados.palestrante = palestrante

    const dadosValidos = validaObjeto(dados)

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

const inscreverOuvinte = async (idEvento, usuario) => {
    const usuarioValido = validaObjeto(usuario);

    if (idEvento && usuarioValido) {
        const evento = await repository.listarPorId(idEvento);
        const { ouvintes } = evento;
        if (evento && ouvintes.every(o => o.email !== usuario.email)) {
            await repository.inscreverOuvinte(evento, usuario);
            return true
        }
        return false
    }

    return false
}

const atualizar = async (idEvento, usuario, eventoAtualizar) => {
    const { evento } = await listarPorId(idEvento, usuario);

    if (evento && evento.palestrante._id === usuario._id) {
        const result = await repository.atualizar(evento, eventoAtualizar)
        return {
            idEvento,
            atualizado: result.modifiedCount
        }
    }

    return {
        atualizado: false
    }
}

const deletar = async (idEvento, palestrante) => {
    const { deletedCount } = await repository.deletar(idEvento, palestrante)
    return deletedCount
}

module.exports = {
    listar,
    ultimosEventos,
    listarPorId,
    cadastrar,
    inscreverOuvinte,
    atualizar,
    deletar
};