const usuarioService = require('../../service/usuarioService');

describe("Operações com o usuário", () => {

    test('Deve retornar falso se não existir um usuário com o e-mail informado na consulta por e-mail', async () => {

        const usuario = await usuarioService.listarPorEmail("usuarioqualquer@gmail.com");

        expect(usuario).toEqual(false);

    })

    test('Deve retornar erro se não for informado um e-mail na consulta por e-mail', async () => {

        try {
            await usuarioService.listarPorEmail(null)

        } catch (error) {
            expect(error.message).toEqual("email não informado")
        }

    })

    test('Deve retornar erro se não for informado um id na operação de deletar usuário', async () => {

        try {
            await usuarioService.deletar(null)

        } catch (error) {
            expect(error.message).toEqual("id não informado")
        }

    });

})