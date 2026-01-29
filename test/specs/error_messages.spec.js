const { expect } = require('chai');
const AuthPage = require('../pageobjects/auth.page');

describe('Mensagens de erro - Autenticação', () => {

  beforeEach(async () => {
    await AuthPage.open();
  });

  it('CT-ERR-01: Deve exibir erro para email inválido (Login)', async () => {
    await AuthPage.goToLoginTab();
    await AuthPage.login('email_invalido', '12345678');

    const errorMsg = await $('android=new UiSelector().text("Please enter a valid email address")');
    await errorMsg.waitForDisplayed({ timeout: 10000 });

    expect(await errorMsg.isDisplayed()).to.be.true;
  });

  it('CT-ERR-02: Deve exibir erro para senha com menos de 8 caracteres (Login)', async () => {
    await AuthPage.goToLoginTab();
    await AuthPage.login('test@webdriver.io', '123');

    const errorMsg = await $('android=new UiSelector().text("Please enter at least 8 characters")');
    await errorMsg.waitForDisplayed({ timeout: 10000 });

    expect(await errorMsg.isDisplayed()).to.be.true;
  });

  it('CT-ERR-03: Deve exibir erro quando as senhas são diferentes (Sign up)', async () => {
    await AuthPage.goToSignUpTab();

    const emailInput = await $('~input-email');
    const passwordInput = await $('~input-password');
    const repeatPasswordInput = await $('~input-repeat-password');
    const signUpButton = await $('~button-SIGN UP');

    await emailInput.setValue('qa_test@mail.com');
    await passwordInput.setValue('12345678');
    await repeatPasswordInput.setValue('87654321');
    await signUpButton.click();

    const errorText = await $('android=new UiSelector().textContains("same password")');
    await errorText.waitForDisplayed({ timeout: 10000 });

    expect(await errorText.getText()).to.contain('Please enter the same password');
  });

});
