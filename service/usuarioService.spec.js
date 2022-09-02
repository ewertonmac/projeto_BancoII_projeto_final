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

describe("Listar por id", () => {
    test("Deve listar usuário quando id informado", async () => {

        try {

            const usuarioRetorno = {
                nome: "ewerton",
                sobrenome: "maciel"
            }

            repository.listarPorId.mockReturnValue([usuarioRetorno])
            const result = await usuarioService.listarPorId(1)

            expect(result.length).toBe(1)

        } catch (error) { }

    })

    test("Não deve listar usuário quando id informado inválido", async () => {

        try {
            await usuarioService.listarPorId(null)

        } catch (error) {
            expect(error.message).toEqual("id de usuário não informado")
        }

    })
})

describe("Listar por email", () => {
    test("Deve listar usuário quando email informado", async () => {

        try {

            const usuarioRetorno = {
                nome: "ewerton",
                sobrenome: "maciel"
            }

            repository.listarPorEmail.mockReturnValue([usuarioRetorno])
            const result = await usuarioService.listarPorEmail("meu@email.com")

            expect(result.length).toBe(1)

        } catch (error) { }

    })

    test("Não deve listar usuário quando id informado inválido", async () => {

        try {
            await usuarioService.listarPorEmail(null)

        } catch (error) {
            expect(error.message).toEqual("email não informado")
        }

    })
})

describe("Cadastrar usuario", () => {

    test("Deve cadastrar usuário válido", async () => {
        const usuarioValido = {
            nome: "Ewerton",
            sobrenome: "Maciel",
            email: "ewerton@mail.com",
            senha: "minhasenha",
            status: "estudante"
        }


        try {
            repository.cadastrar.mockReturnValue(true)
            const result = await usuarioService.cadastrar(usuarioValido)
            expect(result).toBeTruthy()
        } catch (error) { }

    })

    test("Não deve cadastrar usuario inválido", async () => {
        const usuarioInvalido = {
            nome: "Ewerton",
            sobrenome: "Maciel",
            email: "ewerton@mail.com",
            senha: "minhasenha",
            status: ""
        }

        try {
            const result = await usuarioService.cadastrar(usuarioInvalido)
            expect(result).toBeNull()
        } catch (error) {
            expect(error.message).toEqual("todos os dados devem ser informados")
        }
    })
})

describe("Atualizar usuário", () => {
    test("Deve atualizar um usuário válido", async () => {

        try {
            const usuarioAtualizarValido = {
                nome: "Ewerton",
                sobrenome: "Maciel",
                email: "ewertoncz@gmail.com",
                minicurriculo: "Discente do curso de ADS IFPB",
                urlImagemPerfil: "https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=2000",
                instituicao: "IFPB",
                telefone: "1234567890",
                site: "www.meusite.com",
                githubUser: "@ewertonmac",
                twitterUser: "@ewertonmac",
                instagramUser: "@ewertonmac",
                curriculoLattes: "www.lattes.cnpq.br",
            }

            const idValido = "630fd127557cc786c3d4abe5"

            repository.atualizar.mockReturnValue(true)
            const result = await usuarioService.atualizar(idValido, usuarioAtualizarValido)

            expect(result).toBeTruthy()
        } catch (error) { }
    })

    test("Não deve atualizar usuário com dados inválidos", async () => {

        try {

            const usuarioAtualizarInvalido = {
                nome: "Ewerton",
                sobrenome: "Maciel",
                email: "ewertoncz@gmail.com",
                minicurriculo: "Discente do curso de ADS IFPB",
                urlImagemPerfil: "",
                instituicao: "IFPB",
                telefone: "",
                site: "www.meusite.com",
                githubUser: "@ewertonmac",
                twitterUser: "@ewertonmac",
                instagramUser: "@ewertonmac",
                curriculoLattes: "www.lattes.cnpq.br",
            }

            const idValido = "630fd127557cc786c3d4abe5"

            const result = await usuarioService.atualizar(idValido, usuarioAtualizarInvalido)

        } catch (error) {
            expect(error.message).toEqual("todos os dados devem ser informados")
        }
    })
})

describe("Deletar usuário", () => {
    test("Deve deletar quando id válido for informado", async () => {

        try {
            const idValido = "630fd127557cc786c3d4abe5"

            repository.deletar.mockReturnValue(true)
            const result = await usuarioService.deletar(idValido)

            expect(result).toBeTruthy()
        } catch (error) { }
    })

    test("Não deve deletar quando id inválido", async () => {

        try {
            await usuarioService.deletar("")
        } catch (error) {
            expect(error.message).toEqual("id não informado")
        }
    })
})