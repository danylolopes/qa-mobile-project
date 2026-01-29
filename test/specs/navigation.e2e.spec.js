// test/specs/navigation.e2e.spec.js
const { expect } = require('chai');

describe('Navegação - Parte 1 (Login + Home + Webview)', () => {
  it('deve logar, validar Home e executar o Teste 3 no WebView', async () => {
    
    // TESTE 1 — FAZER LOGIN = PÁGINA DE LOGIN
    
    const loginBtn = await $('~Login');
    await loginBtn.waitForDisplayed({ timeout: 20000 });
    await loginBtn.click();

    const loginTitle = await $('//*[@text="Login / Sign up Form" or contains(@text,"Login / Sign up")]');
    await loginTitle.waitForDisplayed({ timeout: 20000 });

    const email = await $('~input-email');
    await email.waitForDisplayed({ timeout: 20000 });
    await email.clearValue();
    await email.setValue('test@webdriver.io');

    const password = await $('~input-password');
    await password.waitForDisplayed({ timeout: 20000 });
    await password.clearValue();
    await password.setValue('12345678');

    const btnLogin = await $('~button-LOGIN');
    await btnLogin.waitForEnabled({ timeout: 20000 });
    await btnLogin.click();

    const successMsg = await $('-android uiautomator:new UiSelector().text("You are logged in!")');
    await successMsg.waitForDisplayed({ timeout: 20000 });
    expect(await successMsg.getText()).to.equal('You are logged in!');

    const okBtn = await $('-android uiautomator:new UiSelector().text("OK")');
    await okBtn.waitForDisplayed({ timeout: 20000 });
    await okBtn.click();


    // TESTE 2 — IR PARA A PÁGINA HOME
  
    const homeTab = await $('~Home');
    await homeTab.waitForDisplayed({ timeout: 20000 });
    await homeTab.click();

    const homeText = await $('-android uiautomator:new UiSelector().textContains("Demo app for the appium-boilerplate")');
    await homeText.waitForDisplayed({ timeout: 20000 });

    
    // TESTE 3 — NAVEGAR PELA PÁGINA WEBVIEW 
    

    // 3.1) Ir para a aba Webview
    const webviewTab = await $('~Webview');
    await webviewTab.waitForDisplayed({ timeout: 20000 });
    await webviewTab.click();

    // 3.2) Esperar o contexto WEBVIEW aparecer e trocar para ele
    let contexts = [];
    for (let i = 0; i < 50; i++) {
      contexts = await browser.getContexts();
      if (contexts.some((c) => c.includes('WEBVIEW'))) break;
      await browser.pause(400);
    }

    const webviewCtx = contexts.find((c) => c.includes('WEBVIEW'));
    expect(webviewCtx, 'Contexto WEBVIEW não apareceu (Webview pode estar demorando para carregar)').to.exist;

    await browser.switchContext(webviewCtx);

    // 3.3) Esperar DOM estabilizar
    await browser.waitUntil(
      async () => {
        const readyState = await browser.execute(() => document.readyState);
        return readyState === 'complete' || readyState === 'interactive';
      },
      {
        timeout: 30000,
        interval: 500,
        timeoutMsg: 'A página dentro do WebView não terminou de carregar (document.readyState)',
      }
    );

    // 3.4) Confirmar texto principal da página Webview
    const textHomeWeb = 'Next-gen browser and mobile automation test framework for Node.js';

    await browser.waitUntil(
      async () => {
        const pageText = await browser.execute(() => document.documentElement.innerText);
        return pageText.includes(textHomeWeb);
      },
      {
        timeout: 30000,
        interval: 600,
        timeoutMsg: `Não encontrei o texto esperado na página Webview: "${textHomeWeb}"`,
      }
    );

    // 3.5) Clicar no menu hamburger: "Toggle navigation bar"
    const toggleNav = await $('[aria-label="Toggle navigation bar"]');
    await toggleNav.waitForExist({ timeout: 30000 });
    await toggleNav.click();

    // 3.6) Clicar em "Docs"
    const docsLink = await $('=Docs');
    await docsLink.waitForExist({ timeout: 30000 });
    await docsLink.click();

    
    // 3.7) Confirmar/ Validar o texto "Getting Started"
    
    await browser.waitUntil(
      async () => {
        const rs = await browser.execute(() => document.readyState);
        return rs === 'complete' || rs === 'interactive';
      },
      {
        timeout: 30000,
        interval: 400,
        timeoutMsg: 'A página não estabilizou após clicar em Docs (readyState)',
      }
    );

    const ensureGettingStarted = async () => {
      // A) tentar achar um H1/H2
      const heading = await $('//*[self::h1 or self::h2][contains(normalize-space(.),"Getting Started")]');
      if (await heading.isExisting()) {
        await heading.waitForDisplayed({ timeout: 15000 });
        return true;
      }

      // B) se abriu outra página, força clique em "Getting Started"
      const gettingStartedLinkByText = await $('=Getting Started');
      if (await gettingStartedLinkByText.isExisting()) {
        await gettingStartedLinkByText.click();
        await browser.pause(800);

        const heading2 = await $('//*[self::h1 or self::h2][contains(normalize-space(.),"Getting Started")]');
        await heading2.waitForDisplayed({ timeout: 20000 });
        return true;
      }

      // C) fallback por texto total do documento
      return await browser.execute(() => {
        return document.documentElement?.innerText?.includes('Getting Started') || false;
      });
    };

    const gotGettingStarted = await ensureGettingStarted();
    expect(gotGettingStarted, 'Não consegui confirmar "Getting Started" após clicar em Docs').to.equal(true);

    
    // 3.8) Scroll REAL (NATIVO) BEM DEVAGAR até "OpenJS Foundation Logo"
    
    const logoSelectors = [
      '[aria-label="OpenJS Foundation Logo"]',
      'img[alt="OpenJS Foundation Logo"]',
    ];

    const isLogoVisibleInWeb = async () => {
      for (const sel of logoSelectors) {
        const el = await $(sel);
        if (await el.isExisting()) {
          try { await el.scrollIntoView({ block: 'center' }); } catch (e) {}
          await browser.pause(300);

          if (await el.isDisplayed()) return true;
          const rect = await el.getRect().catch(() => null);
          if (rect && rect.width > 0 && rect.height > 0) return true;
        }
      }
      return false;
    };

    const slowNativeScrollOnWebView = async () => {
      await browser.switchContext('NATIVE_APP');

      let left, top, width, height;

      const webviewNative = await $('android=new UiSelector().className("android.webkit.WebView")');

      if (await webviewNative.isExisting()) {
        const r = await webviewNative.getRect();
        left = r.x + 5;
        top = r.y + 5;
        width = r.width - 10;
        height = r.height - 10;
      } else {
        const win = await browser.getWindowRect();
        left = Math.floor(win.width * 0.05);
        top = Math.floor(win.height * 0.15);
        width = Math.floor(win.width * 0.90);
        height = Math.floor(win.height * 0.70);
      }

      await browser.execute('mobile: scrollGesture', {
        left,
        top,
        width,
        height,
        direction: 'down',
        percent: 0.12,
        speed: 250
      });

      await browser.pause(1200);
      await browser.switchContext(webviewCtx);
    };

    let logoFound = false;

    try {
      await browser.execute(() => window.scrollTo(0, 0));
    } catch (e) {}
    await browser.pause(800);

    for (let i = 0; i < 80; i++) {
      if (await isLogoVisibleInWeb()) {
        logoFound = true;
        break;
      }
      await slowNativeScrollOnWebView();
    }

    expect(logoFound, 'Não encontrei o "OpenJS Foundation Logo" mesmo com scroll nativo lento').to.equal(true);

    // 3.9) Voltar pro contexto nativo
    await browser.switchContext('NATIVE_APP');

    
    // TESTE 4 — IR PARA A PÁGINA FORMS
    
    const formsTab = await $('~Forms');
    await formsTab.waitForDisplayed({ timeout: 20000 });
    await formsTab.click();

    const formComponentsText = await $(
      '-android uiautomator:new UiSelector().text("Form components")'
    );
    await formComponentsText.waitForDisplayed({ timeout: 20000 });

    // TESTE 5 — IR PARA A PÁGINA SWIPE
    
    const swipeTab = await $('~Swipe');
    await swipeTab.waitForDisplayed({ timeout: 20000 });
    await swipeTab.click();

    const swipeTitle = await $(
      '-android uiautomator:new UiSelector().text("Swipe horizontal")'
    );
    await swipeTitle.waitForDisplayed({ timeout: 20000 });

    // TESTE 6 — IR PARA A PÁGINA DRAG 
    
    const dragTab = await $('~Drag');
    await dragTab.waitForDisplayed({ timeout: 20000 });
    await dragTab.click();

    const dragTitle = await $(`-android uiautomator:new UiSelector().text("Drag and Drop")`);
    await dragTitle.waitForDisplayed({ timeout: 20000 });

    expect(await dragTitle.getText()).to.equal('Drag and Drop');
  });
});
