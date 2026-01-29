class AuthPage {
  // Bottom tab
  get bottomTabLogin() {
    return $('~Login');
  }

  // Inner tabs
  get innerTabLogin() {
    return $('android=new UiSelector().text("Login")');
  }

  get innerTabSignUp() {
    return $('android=new UiSelector().text("Sign up")');
  }

  // Inputs
  get emailInput() {
    return $('~input-email');
  }

  get passwordInput() {
    return $('~input-password');
  }

  get repeatPasswordInput() {
    return $('~input-repeat-password');
  }

  // Buttons
  get loginButton() {
    return $('~button-LOGIN');
  }

  get signUpButton() {
    return $('~button-SIGN UP');
  }

  async open() {
    await this.bottomTabLogin.waitForDisplayed({ timeout: 15000 });
    await this.bottomTabLogin.click();
  }

  async goToLoginTab() {
    await this.innerTabLogin.waitForDisplayed({ timeout: 10000 });
    await this.innerTabLogin.click();
  }

  async goToSignUpTab() {
    await this.innerTabSignUp.waitForDisplayed({ timeout: 10000 });
    await this.innerTabSignUp.click();
  }

  async login(email, password) {
    if (typeof email !== 'string' || !email.trim()) {
      throw new Error(`AuthPage.login: email inválido -> ${email}`);
    }
    if (typeof password !== 'string' || !password.trim()) {
      throw new Error(`AuthPage.login: password inválido -> ${password}`);
    }

    await this.emailInput.waitForDisplayed({ timeout: 10000 });
    await this.emailInput.setValue(email);

    await this.passwordInput.waitForDisplayed({ timeout: 10000 });
    await this.passwordInput.setValue(password);

    await this.loginButton.waitForEnabled({ timeout: 10000 });
    await this.loginButton.click();
  }

  async fillSignUpForm(email, password, repeatPassword) {
    if (typeof email !== 'string' || !email.trim()) {
      throw new Error(`AuthPage.fillSignUpForm: email inválido -> ${email}`);
    }

    await this.emailInput.waitForDisplayed({ timeout: 10000 });
    await this.emailInput.setValue(email);

    await this.passwordInput.waitForDisplayed({ timeout: 10000 });
    await this.passwordInput.setValue(password);

    await this.repeatPasswordInput.waitForDisplayed({ timeout: 10000 });
    await this.repeatPasswordInput.setValue(repeatPassword);
  }

  async clickSignUpButton() {
    await this.signUpButton.waitForEnabled({ timeout: 10000 });
    await this.signUpButton.click();
  }

  async confirmSignedUpModal() {
    const title = await $('android=new UiSelector().text("Signed Up!")');
    await title.waitForDisplayed({ timeout: 15000 });

    const message = await $('android=new UiSelector().text("You successfully signed up!")');
    await message.waitForDisplayed({ timeout: 15000 });

    const okBtn = await $('android=new UiSelector().text("OK")');
    await okBtn.waitForDisplayed({ timeout: 10000 });
    await okBtn.click();

    await title.waitForDisplayed({ reverse: true, timeout: 15000 });
  }

  async confirmLoggedInModal() {
    const message = await $('android=new UiSelector().text("You are logged in!")');
    await message.waitForDisplayed({ timeout: 15000 });

    const okBtn = await $('android=new UiSelector().text("OK")');
    await okBtn.waitForDisplayed({ timeout: 10000 });
    await okBtn.click();

    await message.waitForDisplayed({ reverse: true, timeout: 15000 });
  }
}

module.exports = new AuthPage();
