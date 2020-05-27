import Test from '../test';
import makeAjax from '../../support/action/makeAjax.js';
import openWebsite from '../../support/action/openWebsite.js';
import decimalAdjust from '../../support/action/decimalAdjust.js';

// More details about page object you can read in this guide: https://webdriver.io/docs/pageobjects.html

class PixabayDocsApi extends Test {
	constructor() {
		super();
	}

    logInForm() { return '#login_form'; };

    visitPixabayLogin(url, css_selector) {

        browser.url(url);

        $(css_selector).waitForDisplayed(this.TIMEOUT);
	}
}

export default new PixabayDocsApi();