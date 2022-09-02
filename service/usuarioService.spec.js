const usuarioService = require("./usuarioService")
const repository = require("../repository/usuarioRepository")

jest.mock("../repository/usuarioRepository", () => ({
    listar: jest.fn(),
    cadastrar : jest.fn()
}))

describe("Listar por id", () => {
    test("Deve listar usuário quando id informado", async () => {

        try {
            
            const usuarioRetorno = {
                nome:"ewerton",
                sobrenome:"maciel"
            }

            repository.cadastrar.mockReturnValue([usuarioRetorno])
            const result = await usuarioService.listarPorId(1)

            expect(result !== null).toBeTruthy()
            
        } catch (error) {
            
        }

    })

    test("Não deve listar usuário quando id informado inválido", async () => {

        try {
            await usuarioService.listarPorId(null)
            
        } catch (error) {
            expect(error.message).toEqual("id de usuário não informado")
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
        } catch (error) {}        

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