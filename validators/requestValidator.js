const validaObjeto = (objeto) => Object.values(objeto).every(value => !!value)

module.exports = {
    validaObjeto
}