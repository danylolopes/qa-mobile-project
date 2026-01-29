// wdio.conf.js
const fs = require('fs');
const path = require('path');

// Pasta onde os screenshots serão salvos
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

exports.config = {
    runner: 'local',
    path: '/wd/hub',

    // Specs
    specs: ['./test/specs/**/*.js'],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',

        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:app': './apps/android.wdio.native.app.v2.0.0.apk',
        'appium:newCommandTimeout': 240,
        'appium:autoGrantPermissions': true
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['appium'],

    framework: 'mocha',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    },

   
    //  cria a pasta de screenshot
    
    onPrepare: function () {
        if (!fs.existsSync(SCREENSHOT_DIR)) {
            fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
        }
    },

    
    // screenshoot ao final de cada teste
    
    afterTest: async function (test, context, { error, passed }) {
        try {
            const safeTitle = test.title
                .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
                .replace(/\s+/g, '_');

            const timestamp = new Date()
                .toISOString()
                .replace(/[:.]/g, '-');

            const status = passed ? 'PASS' : 'FAIL';

            const filePath = path.join(
                SCREENSHOT_DIR,
                `${timestamp}_${safeTitle}_${status}.png`
            );

            await browser.saveScreenshot(filePath);
        } catch (err) {
            console.error('Erro ao salvar screenshot:', err.message);
        }
    }
};
