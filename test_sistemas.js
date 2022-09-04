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
    await Promise.all([page.click('[href="/auth/signup"]'), page.waitForNavigation({
        waitUntil: 'networkidle2'
    })])

    await page.type('#input-nome', 'Natan');
    await page.type('#input-sobrenome', 'Severo');
    await page.type('#input-email', 'natanlinkpark@hotmail.com');
    await page.type('#input-senha', '123456');
    await page.type('#select-status', 'Estudante');

    await Promise.all([page.click('[type="submit"]'), page.waitForNavigation({
        waitUntil: 'networkidle2'
    })])
    // - Acessa a página de login

    await Promise.all([page.click('[href="/auth/login"]'), page.waitForNavigation({
        waitUntil: 'networkidle2'
    })])

    //escreve o email e senha
    await page.type('#login-email', 'natanlinkpark@hotmail.com');
    await page.type('#senha', '123456');

    //-clica no botão de entrar

    await Promise.all([page.click('[type="submit"]'), page.waitForNavigation({
        waitUntil: 'networkidle2'
    })])

    await page.click('[href="#"]')

    await Promise.all([page.click('[href="/perfil/"]'), page.waitForNavigation({
        waitUntil: 'networkidle2'
    })])

    await page.click('[type="submit"]');

    await page.close()
    await browser.close()
})();