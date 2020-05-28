import Test from '../test';
import makeAjax from '../../support/action/makeAjax.js';
import decimalAdjust from '../../support/action/decimalAdjust.js';

// More details about page object you can read in this guide: https://webdriver.io/docs/pageobjects.html

class FlackyAPITest extends Test {
	constructor() {
		super();
	}

	apiTest(action, url) {
		let users = null;

        const user = {
            name: configData.store.user.name,
            email: configData.store.user.email
        };

        const updated_user = {
            name: configData.store.updated_user.name,
            email: configData.store.updated_user.email
        };

        const getUsers = (method, url, params) => {

            return makeAjax(url, method, params);
        };



        switch (action) {
            case 'create':
                users = getUsers('POST', url, user);
                console.log(users);

                break;
            case 'get':
                users = getUsers('GET', url);
                console.log(users);
                break;
            case 'update':
                users = getUsers('PUT', url, updated_user);
                console.log(users);
                break;
            case 'delete':
                users = getUsers('DELETE', url);
                console.log(users);
                break;
        }
	}
}

export default new FlackyAPITest();