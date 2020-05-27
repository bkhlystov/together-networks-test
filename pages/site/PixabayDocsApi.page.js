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

    checkApiByUrl(url) {
        const api_key = configData.store.pixabay.api_key;
        const link = `${url}?key=${api_key}`;

        const getHints = url => {
            return makeAjax(url, 'GET');
        };

        const response_data = getHints(link);

        if(response_data && Object.keys(response_data).length) {
            if(response_data.hits.length === 0) {
                console.error(`Empty response data hits length in api ${link}`);
            }

        } else {
            console.error(`Can't get response data in api ${link}`);
        }
    }
}

export default new PixabayDocsApi();