const { I } = inject();
var assert = require("assert");

module.exports = {
  WAIT_IN_SECS_FOR_ELEMENT: 5,
  // locators
  fields: {
    privacyPopup: "#popin_tc_privacy_text",
    acceptPrivacy: "#popin_tc_privacy_button",
    searchBar: "#search-input",
    searchSuggestions: ".m-search-flyout__results-item",
    searchBtn: "#search-button",
    searchErrorMsg: ".nothing-found__title",
    searchProducts: { css: "[data-qa='itemProductWidgets']" },
  },

  // methods
  handlePrivacyPopup() {
    I.waitForVisible(this.fields.privacyPopup, this.WAIT_IN_SECS_FOR_ELEMENT);
    I.click(this.fields.acceptPrivacy);
    I.waitForInvisible(this.fields.privacyPopup, this.WAIT_IN_SECS_FOR_ELEMENT);
  },
  searchForProducts(keyword) {
    I.waitForVisible(this.fields.searchBar, this.WAIT_IN_SECS_FOR_ELEMENT);
    I.fillField(this.fields.searchBar, keyword);
  },
  async checkSearchSuggestions() {
    I.waitForVisible(
      this.fields.searchSuggestions,
      this.WAIT_IN_SECS_FOR_ELEMENT
    );
    var suggestions = await I.grabNumberOfVisibleElements(
      this.fields.searchSuggestions
    );
    assert(suggestions > 0, "No Suggestions displayed for search Term");
  },
  waitForSearchErrorMessage(timeout) {
    timeout = timeout == undefined ? this.WAIT_IN_SECS_FOR_ELEMENT : timeout;
    I.waitForVisible(this.fields.searchErrorMsg, timeout);
  },
  waitForSearchProducts(timeout) {
    timeout = timeout == undefined ? this.WAIT_IN_SECS_FOR_ELEMENT : timeout;
    I.waitForVisible(this.fields.searchProducts, timeout);
  },
  clickSearchButton() {
    I.click(this.fields.searchBtn);
  },
  async getSearchErrorMessage() {
    return await I.grabTextFrom(this.fields.searchErrorMsg);
  },
};
