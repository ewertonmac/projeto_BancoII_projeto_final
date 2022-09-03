const usuarioService = require("./usuarioService")
const repository = require("../repository/usuarioRepository")

jest.mock("../repository/usuarioRepository", () => ({
    listar: jest.fn(),
    listarPorId: jest.fn(),
    listarPorEmail: jest.fn(),
    cadastrar: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn()
}))

let result
let exceptionMessage

let usuarioValido = {
    nome: "Ewerton",
    sobrenome: "Maciel",
    email: "ewerton@mail.com",
    senha: "minhasenha",
    status: "estudante"
}

let usuarioInvalido = {
    nome: "Ewerton",
    sobrenome: "Maciel",
    email: "ewerton@mail.com",
    senha: "minhasenha",
    status: ""
}

let usuarioRetorno = {
    nome: "ewerton",
    sobrenome: "maciel"
}

let  usuarioAtualizarValido = {
    ...usuarioValido,
    minicurriculo: "Discente do curso de ADS IFPB",
    urlImagemPerfil: "https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=2000",
    instituicao: "IFPB",
    telefone: "1234567890",
    site: "www.meusite.com",
    githubUser: "@ewertonmac",
    twitterUser: "@ewertonmac",
    instagramUser: "@ewertonmac",
    curriculoLattes: "www.lattes.cnpq.br"
}

let usuarioAtualizarInvalido = {
    ...usuarioInvalido
}

const idValido = "630fd127557cc786c3d4abe5"

beforeEach(() => {
    result = null
    exceptionMessage = null
})

describe("Listar por id", () => {
    test("Deve listar usuário quando id informado", async () => {
        repository.listarPorId.mockReturnValue([usuarioRetorno])
        try {
            result = await usuarioService.listarPorId(1)
        } catch (error) { }

        expect(result.length).toBe(1)
        expect(result[0]).toEqual(usuarioRetorno)
    })

    test("Não deve listar usuário quando id informado inválido", async () => {
        try {
            result = await usuarioService.listarPorId(null)
        } catch (error) {
            exceptionMessage = error.message
        }

        expect(result).toBeNull()
        expect(exceptionMessage).toEqual("id de usuário não informado")

    })
})

describe("Listar por email", () => {
    test("Deve listar usuário quando email informado", async () => {
        repository.listarPorEmail.mockReturnValue([usuarioRetorno])
        try {
            result = await usuarioService.listarPorEmail("meu@email.com")
        } catch (error) { }

        expect(result.length).toBe(1)
        expect(result[0]).toEqual(usuarioRetorno)
    })

    test("Não deve listar usuário quando id informado inválido", async () => {
        try {
            result = await usuarioService.listarPorEmail(null)
        } catch (error) {
            exceptionMessage = error.message
        }

        expect(exceptionMessage).toEqual("email não informado")
        expect(result).toBeNull()
    })
})

describe("Cadastrar usuario", () => {

    test("Deve cadastrar usuário válido", async () => {
        repository.cadastrar.mockReturnValue(true)

        try {
            result = await usuarioService.cadastrar(usuarioValido)
        } catch (error) { }

        expect(result).toBeTruthy()
    })

    test("Não deve cadastrar usuario inválido", async () => {

        try {
            result = await usuarioService.cadastrar(usuarioInvalido)
        } catch (error) {
            exceptionMessage = error.message
        }
        expect(result).toBeNull()
        expect(exceptionMessage).toEqual("todos os dados devem ser informados")
    })
})

describe("Atualizar usuário", () => {
    test("Deve atualizar um usuário válido", async () => {

        repository.atualizar.mockReturnValue(true)
        try {
            result = await usuarioService.atualizar(idValido, usuarioAtualizarValido)
        } catch (error) { }

        expect(result).toBeTruthy()
    })

    test("Não deve atualizar usuário com dados inválidos", async () => {
        try {
            result = await usuarioService.atualizar(idValido, usuarioAtualizarInvalido)
        } catch (error) {
            exceptionMessage = error.message
        }
        expect(result).toBeNull()
        expect(exceptionMessage).toEqual("todos os dados devem ser informados")
    })
})

describe("Deletar usuário", () => {
    test("Deve deletar quando id válido for informado", async () => {

        repository.deletar.mockReturnValue(true)
        try {
            result = await usuarioService.deletar(idValido)
        } catch (error) { }

        expect(result).toBeTruthy()
    })

    test("Não deve deletar quando id inválido", async () => {

        try {
            result = await usuarioService.deletar("")
        } catch (error) {
            exceptionMessage = error.message
        }

        expect(result).toBeNull()
        expect(exceptionMessage).toEqual("id não informado")
    })
})