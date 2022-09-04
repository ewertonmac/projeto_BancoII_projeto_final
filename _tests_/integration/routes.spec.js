const server = require('../../app')
const axios = require('axios')

describe("Operações com o usuário", () => {

    let response

    beforeEach(() => {
        response = null
    })


    test('Deve retornar dados corretamente na rota de login', async () => {
        response = await axios('http://localhost:3002/auth/login')
        
        expect(response.status).toBe(200)
        expect(response.data).toBeTruthy();
        expect(response.data.length).toBeTruthy();

    })

    test('Deve retornar dados corretamente na rota de cadastro', async () => {
        response = await axios('http://localhost:3002/auth/signup')

        expect(response.status).toBe(200)
        expect(response.data).toBeTruthy();
        expect(response.data.length).toBeTruthy();

    })
})