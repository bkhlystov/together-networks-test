import Test from '../test';
import Page from './common.page';

// More details about page object you can read in this guide: https://webdriver.io/docs/pageobjects.html

class MyAccount extends Test {
    
    get logInForm() { return `.js-login-form`; };
    get logInFormSubmitBtn() { return `${this.logInForm} [type="submit"]`; };
    get customerMenu() { return `${Page.navTop} .app-customer-menu`; }
    get loggedCustomerTopMenu() { return `${this.customerMenu} .logged-customer`; }
    get dropMenuForLoggedUser() { return `${this.loggedCustomerTopMenu}+.dropdown-menu`; }
	get accountPage() { return '.account-page'; }
	get accountOrdersApp() { return `${this.accountPage} .orders-app`;}

    topCustomerMenuLink(href) { return `${this.dropMenuForLoggedUser} a[href='${href}']`; }

    getElement(elementName){
        switch(elementName){
            case "LogIn Form / Submit button":
                return this.logInFormSubmitBtn;
            case "Top-bar / Logged Customer":
                return this.loggedCustomerTopMenu;
            case "Top-bar / Logged Customer Menu":
                return this.dropMenuForLoggedUser;
            case "Top-bar / Log Out":
                return this.topCustomerMenuLink("/my/logout?next=/");
	        case "Account / Orders":
		        return this.accountOrdersApp;
        }
        return elementName;
    }

    
}

export default new MyAccount();