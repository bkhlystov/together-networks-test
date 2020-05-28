import Test from '../test';
import makeAjax from '../../support/action/makeAjax.js';

// More details about page object you can read in this guide: https://webdriver.io/docs/pageobjects.html

class FlackyAPITest extends Test {
	constructor() {
		super();
	}

	saveCreatedUserIdFromResponse(response) {
        const is_created_user = (response && Object.keys(response).length && response.id) ? true : false;
        expect(is_created_user).to.equal(
            true,
            "Expect users is not created"
        );

	    this.storage['user_id'] = response.id;
    }

    checkCreatedUserInResponseList(users_list) {

        const is_user_in_list = (users_list && users_list.length) ? users_list.some(item => {
            return item.id === this.storage['user_id'];
        }) : false;

        expect(is_user_in_list).to.equal(
            true,
            "There is no created user response array"
        );
    }

    checkUpdatedUserInResponse(response) {

        expect(this.storage['user_id'] == response.id).to.equal(
            true,
            "There is no updated user id in response"
        );
    }

    checkDeletedUserInResponse(response) {
        expect(this.storage['user_id'] == response.id).to.equal(
            true,
            "There is no deleted user id in response"
        );
    }

	apiTest(action, url) {
        const user = {
            name: configData.store.user.name,
            email: configData.store.user.email
        };

        const updated_user = {
            name: configData.store.updated_user.name,
            email: configData.store.updated_user.email
        };

        browser.url(url);


        switch (action) {
            case 'create':
                this.saveCreatedUserIdFromResponse(makeAjax( url, 'POST', user));
                break;
            case 'get':
                this.checkCreatedUserInResponseList(makeAjax(url, 'GET'));
                break;
            case 'update':
                this.checkUpdatedUserInResponse(makeAjax( `${url}/${this.storage['user_id']}`, 'PUT', updated_user));
                break;
            case 'delete':
                this.checkDeletedUserInResponse(makeAjax(`${url}/${this.storage['user_id']}`, 'DELETE'));
                break;
        }
	}
}

export default new FlackyAPITest();