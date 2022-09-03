const validaObjeto = (objeto) => Object.keys(objeto).every(key => key != "__v" ? !!objeto[key] : true)

module.exports = {
    validaObjeto
}