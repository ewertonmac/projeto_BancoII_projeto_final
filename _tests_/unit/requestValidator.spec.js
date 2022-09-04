const { validaObjeto } = require("../../validators/requestValidator")

describe("Request Validator suite", () => {
    test("Deve retornar true quando parametros válidos", () => {
        const objetoValidar = {
            texto: "Texto",
            numero: 1,
            boleano: true
        }

        const result = validaObjeto(objetoValidar)
        expect(result).toBeTruthy()
    })

    test("Deve retornar false quando parametros inválidos", () => {
        const objetoValidar = {
            texto: "",
            numero: 0,
            boleano: false,
            nulo: null,
            naoNumerico: NaN
        }

        const result = validaObjeto(objetoValidar)
        expect(result).toBeFalsy()
    })
})