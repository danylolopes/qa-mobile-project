class HomePage {

    // botão que abre o Webview 
    get webviewButton() {
      return $('~Webview');
    }
  
    // texto que confirma que o Webview carregou corretamente
    get webviewText() {
      return $('android=new UiSelector().textContains("Next-gen browser and mobile automation test framework for Node.js")');
    }
  
    async openWebview() {
      await this.webviewButton.waitForDisplayed({ timeout: 15000 });
      await this.webviewButton.click();
    }
  
    async assertWebviewOpened({ timeout = 45000 } = {}) {
      await this.webviewText.waitForDisplayed({ timeout });
    }
  }
  
  module.exports = new HomePage();
  