require('dotenv').config();
const puppeteer = require('puppeteer');

//Teste de sistemas 1 login de usuario já cadastrado

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3002/');

    //Fazendo cadastro do usuario
    await page.click('[href="/auth/signup"]');

    await page.type('#input-nome', 'Natan');
    await page.type('#input-sobrenome', 'Severo');
    await page.type('#input-email', 'natanlinkpark@hotmail.com');
    await page.type('#input-senha', '123456');
    await page.type('#select-status', 'Estudante');

    await page.click('[type="submit"]');

    await page.waitForNavigation();
    // - Acessa a página de login
    await page.click('[href="/auth/login"]');

    await page.waitForNavigation();

    //escreve o email e senha
    await page.type('#login-email', 'natanlinkpark@hotmail.com');
    await page.type('#senha', '123456');

    //-clica no botão de entrar
    await page.click('[type="submit"]');

    await page.waitForNavigation();

    await page.click('[href="#"]');

    await page.click('[href="/perfil/"]');

    await page.waitForNavigation();

    await page.click('[type="submit"]');

})();