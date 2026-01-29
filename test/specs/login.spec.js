const { expect } = require('chai');
const AuthPage = require('../pageobjects/auth.page');
const WebviewPage = require('../pageobjects/webview.page');

let registeredEmail;

describe('Autenticação - Sucesso', () => {

  // garante que sempre existe um usuário cadastrado antes de rodar os testes
  before(async () => {
    await AuthPage.open();

    registeredEmail = `qa_${Date.now()}@mail.com`;

    await AuthPage.goToSignUpTab();

    await AuthPage.fillSignUpForm(registeredEmail, '12345678', '12345678');
    await AuthPage.clickSignUpButton();

    // valida frase + clica OK
    await AuthPage.confirmSignedUpModal();

    // garante que voltou para Login
    await AuthPage.goToLoginTab();
  });

  // aqui só validamos que temos email
  it('CT-AUTH-01: Cadastro com sucesso (validando texto e clicando OK)', async () => {
    expect(registeredEmail).to.be.a('string');
  });

  // aqui validamos o login do cadastro que fizemos no teste anterior
  it('CT-AUTH-02: Login com sucesso + abrir Webview  (timeout maior)', async () => {
    await AuthPage.open();
    await AuthPage.goToLoginTab();

    await AuthPage.login(registeredEmail, '12345678');

    // confirma "You are logged in!" e clica OK
    await AuthPage.confirmLoggedInModal();

    // abre Webview
    await WebviewPage.openWebview();

    // valida texto da página Webview
    await WebviewPage.assertWebviewOpened({ timeout: 45000 });

    expect(true).to.equal(true);
  });

});
