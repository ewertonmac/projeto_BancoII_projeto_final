import eventoService from './eventoService'
import repository from '../repository/eventoRepository'

jest.mock('../repository/eventoRepository', () => ({
    listarPorId: jest.fn(),
    cadastrar: jest.fn(),
    inscreverOuvinte: jest.fn()
}))

let result
let exceptionMessage
const palestrante = {
    nome: "Ewerton",
    sobrenome: "Maciel",
    email: "ewertoncz@gmail.com",
    minicurriculo: "Discente do curso de ADS IFPB",
    curriculoLattes: "www.lattes.cnpq.br",
    site: "www.meusite.com",
    twitterUser: "@ewertonmac",
    instagramUser: "@ewertonmac"
}

const eventoValido = {
    nome: "Evento teste",
    descricao: "Um evento de teste",
    data: new Date().toDateString(),
    urlImagem: "www.imagem.com",
    siteOficial: "www.siteevento.com",
    categoria: "Testes",
    ouvintes: []
}

const eventoInvalido = {
    ...eventoValido,
    data: null
}

const ouvinteValido = {
    nome: "Ewerton",
    sobrenome: "Maciel",
    email: "meuemail@email.com"
}

const ouvinteInvalido = {
    ...ouvinteValido,
    email: ""
}

const eventoComOuvinte = {
    ...eventoValido,
    ouvintes: [{ ...ouvinteValido }]
}

beforeEach(() => {

    result = null
    exceptionMessage = null

})

describe("Listar por Id", () => {

    test("Não deve listar evento com parametros invalidos", async () => {
        try {
            result = await eventoService.listarPorId(null, null)
        } catch (error) { }

        expect(result.evento).toBeFalsy()
        expect(result.adminEvento).toBeUndefined()
    })
})

describe("Cadastrar evento", () => {
    test("Deve cadastrar evento válido", async () => {

        repository.cadastrar.mockReturnValue(true)
        try {
            result = await eventoService.cadastrar(palestrante, eventoValido)
        } catch (error) { }

        expect(result).toBeTruthy()
    })

    test("Não deve cadastrar evento inválido", async () => {

        try {
            result = await eventoService.cadastrar(palestrante, eventoInvalido)
        } catch (error) {
            exceptionMessage = error.message
        }

        expect(result).toBeNull()
        expect(exceptionMessage).toEqual("todos os dados devem ser informados")
    })
})

describe("Inscrever ouvinte", () => {
    test("Deve inscrever ouvinte", async () => {
        repository.listarPorId.mockReturnValue(eventoValido)
        try {
            result = await eventoService.inscreverOuvinte(1, ouvinteValido)
        } catch (error) {
            exceptionMessage = error.message
        }

        expect(result).toBeTruthy()
    })

    test("Não deve inscrever ouvinte ja inscrito", async () => {

        repository.listarPorId.mockReturnValue(eventoComOuvinte)
        try {
            result = await eventoService.inscreverOuvinte(1, ouvinteValido)
        } catch (error) { }

        expect(result).toBeFalsy()
    })

    test("Não deve inscrever ouvinte quando dados invalidos", async () => {
        repository.listarPorId.mockReturnValue(eventoValido)

        try {
            result = await eventoService.inscreverOuvinte(1, ouvinteInvalido)
        } catch (error) {
            exceptionMessage = error.message
        }

        expect(result).toBeNull()
        expect(exceptionMessage).toEqual("todos os dados devem ser informados")
    })
})