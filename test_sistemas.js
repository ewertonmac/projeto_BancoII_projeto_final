require('dotenv').config();
const puppeteer = require('puppeteer');

//Teste de sistemas 1 login de usuario já cadastrado

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3002/');

    // - Acessa a página de login
    await page.click('[href="/auth/login"]');

    //escreve o email e senha
    await page.type('#login-email', 'natanlinkpark@hotmail.com');
    await page.type('#senha', '123456');

    //-clica no botão de entrar
    await page.click('[type="submit"]');

    await page.waitForNavigation();

    //Teste de sistemas 2 cadastro de evento

    //-Acessa a página de cadastro
    await page.click('[href="/publicar"]');

    //fazendo cadastro do usuario
    await page.type('#nome_evento', 'Brasil JS');
    await page.type('#descricao', 'Evento para fazer você se apaixonar por JS');
    await page.type('#url', 'https://substackcdn.com/image/fetch/w_1272,h_764,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe2e8163d-0429-4859-9883-eacecfe9c24b_716x500.png');
    await page.type('#data', '10/09/2022');
    await page.type('#site_evento', 'https://www.braziljs.org/');
    await page.type('#categoria', 'desenvolvimento');

    await page.click('[type="submit"]');

    await page.waitForNavigation();

    await page.click('[href="/eventos"]');

    await page.click('#detalhes');
    await page.click('#excluir');

    await page.waitForNavigation();

    await page.click('[href="/"]');


})();