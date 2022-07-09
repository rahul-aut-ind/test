exports.config = {
  tests: "./tests/*_test.js",
  output: "./output",
  helpers: {
    Playwright: {
      url: "https://www.contorion.de",
      show: true,
      //browser: "chromium",
      channel: "chrome",
      waitForNavigation: "networkidle0",
      timeout: 10000,
      //uniqueScreenshotNames: true,
      waitForAction: 500,
      restart: "session",
      trace: false,
      video: true,
    },
    Mochawesome: {
      uniqueScreenshotNames: "true",
    },
  },
  include: {
    I: "./steps_file.js",
    landingPage: "./model/pages/landingPage.js",
    testData: "./config/testData.json",
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      reportDir: "output",
      inlineAssets: true,
      reportPageTitle: "Onboarding Test Reports",
      reportTitle: "Onboarding Test Reports",
    },
  },
  name: "test",
  plugins: {
    retryFailedStep: {
      enabled: false,
      retries: 1,
    },
    retryTo: {
      enabled: false,
    },
  },
};
