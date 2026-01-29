const { expect } = require('chai');
const AuthPage = require('../pageobjects/auth.page');
const FormsPage = require('../pageobjects/forms.page');

describe('Forms - Fluxos completos', () => {

  const email = 'test@webdriver.io';
  const password = '12345678';

  before(async () => {
    // Login direto (SEM cadastro)
    await AuthPage.open();
    await AuthPage.goToLoginTab();
    await AuthPage.login(email, password);
    await AuthPage.confirmLoggedInModal();

    // Abre Forms
    await FormsPage.open();
  });

  it('CT-FORMS-01: Preencher input e validar texto digitado', async () => {
    await FormsPage.fillInput('1234');
    const result = await FormsPage.inputResult.getText();
    expect(result).to.equal('1234');
  });

  it('CT-FORMS-02: Ativar switch e validar texto ON/OFF', async () => {
    await FormsPage.toggleSwitch();
    const text = await FormsPage.switchText.getText();
    expect(text).to.match(/ON|OFF/);
  });

  it('CT-FORMS-03: Selecionar dropdown "Appium is awesome"', async () => {
    await FormsPage.openDropdown();
    await FormsPage.selectDropdownOption('Appium is awesome');
  });

  it('CT-FORMS-04: Selecionar dropdown "webdriver.io is awesome"', async () => {
    await FormsPage.openDropdown();
    await FormsPage.selectDropdownOption('webdriver.io is awesome');
  });

  it('CT-FORMS-05: Clicar em ACTIVE e validar modal', async () => {
    await FormsPage.clickActiveButton();
    await FormsPage.confirmActiveModal();
  });

});
