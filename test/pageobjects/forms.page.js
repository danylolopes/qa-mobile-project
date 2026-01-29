class FormsPage {

  // Aba Forms (menu inferior)
  get formsTab() {
    return $('~Forms');
  }

  // Input
  get inputField() {
    return $('~text-input');
  }

  get inputResult() {
    return $('~input-text-result');
  }

  // Switch
  get switchToggle() {
    return $('~switch');
  }

  get switchText() {
    return $('~switch-text');
  }

  // Dropdown (chevron)
  get dropdownChevron() {
    return $('android=new UiSelector().resourceId("dropdown-chevron")');
  }

  dropdownOption(text) {
    return $(`android=new UiSelector().text("${text}")`);
  }

  // Buttons
  get activeButton() {
    return $('~button-Active');
  }

  get inactiveButton() {
    return $('android=new UiSelector().text("Inactive")');
  }

  // Modal após clicar em Active
  get modalTitle() {
    return $('android=new UiSelector().text("This button is")');
  }

  get modalText() {
    return $('android=new UiSelector().text("This button is active")');
  }

  modalButton(text) {
    return $(`android=new UiSelector().text("${text}")`);
  }

  // ACTIONS

  async open() {
    await this.formsTab.waitForDisplayed({ timeout: 15000 });
    await this.formsTab.click();
  }

  async fillInput(text) {
    await this.inputField.waitForDisplayed({ timeout: 10000 });
    await this.inputField.setValue(text);

    await this.inputResult.waitForDisplayed({ timeout: 5000 });
  }

  async toggleSwitch() {
    await this.switchToggle.waitForDisplayed({ timeout: 5000 });
    await this.switchToggle.click();
  }

  async openDropdown() {
    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true))' +
      '.scrollIntoView(new UiSelector().resourceId("dropdown-chevron"))'
    );

    await this.dropdownChevron.waitForDisplayed({ timeout: 15000 });
    await this.dropdownChevron.click();
  }

  async selectDropdownOption(optionText) {
    const option = this.dropdownOption(optionText);
    await option.waitForDisplayed({ timeout: 10000 });
    await option.click();
  }

  async clickActiveButton() {
    await this.activeButton.waitForDisplayed({ timeout: 10000 });
    await this.activeButton.click();
  }

  async confirmActiveModal() {
    await this.modalTitle.waitForDisplayed({ timeout: 10000 });
    await this.modalText.waitForDisplayed({ timeout: 10000 });

    const okBtn = this.modalButton('OK');
    await okBtn.waitForDisplayed({ timeout: 5000 });
    await okBtn.click();
  }
}

module.exports = new FormsPage();
