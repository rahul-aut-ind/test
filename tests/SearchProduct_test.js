Feature("Open Website & Search Product | @Sanity");
const assert = require("assert");

Before(({ I, landingPage }) => {
  I.amOnPage("");
  I.say("Opening Website");
  landingPage.handlePrivacyPopup();
});

Scenario(
  "Search for valid Product - Hammer | @Positive",
  ({ I, testData, landingPage }) => {
    landingPage.searchForProducts(testData.searchTerms.valid);
    landingPage.checkSearchSuggestions();
    landingPage.clickSearchButton();
    landingPage.waitForSearchProducts(10);
    I.see(testData.messages.searchResults);
  }
),
  Scenario(
    "Search for invalid Product | @Negative",
    async ({ I, testData, landingPage }) => {
      landingPage.searchForProducts(testData.searchTerms.invalid);
      landingPage.clickSearchButton();
      landingPage.waitForSearchErrorMessage();
      I.see(testData.messages.noProductFoundInSearch);
      var errorMessage = await landingPage.getSearchErrorMessage();
      assert(errorMessage.includes(testData.searchTerms.invalid));
    }
  );
