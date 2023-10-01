const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "chromeWebSecurity": false,
  e2e: {
    commandDelay: 3000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
