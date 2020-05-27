import Test from '../test';

// More details about page object you can read in this guide: https://webdriver.io/docs/pageobjects.html

class Way2Automation extends Test {
	constructor() {
		super();
	}

    header() { return '.page-header'; }
    headerText() { return `${this.header()} h2`; }
    statusButtons() {return `${this.header()} #status-buttons`;}
    statusButtonProfile() { return `${this.statusButtons()} a:nth-of-type(1)`;}
    statusButtonInterests() { return `${this.statusButtons()} a:nth-of-type(2)`;}
    statusButtonPayment() { return `${this.statusButtons()} a:nth-of-type(3)`;}
    signUpForm() { return '#signup-form'; }
    signUpFormName() { return `${this.signUpForm()} input[name="name"]`; }
    signUpFormEmail() { return `${this.signUpForm()} input[name="email"]`; }

    signUpFormGameConsoleInterests() { return `${this.signUpForm()} .radio label input`; }

    signUpFormNextBtn() { return `${this.signUpForm()} a`; }

    signUpFormSubmitBtn() { return `${this.signUpForm()} button[type="submit"]`; }

    finalResult() { return 'pre'; }

    completeTheTestAndCheckFinalResult() {
		const sign_up_form_submit_btn = this.signUpFormSubmitBtn();
		const final_result = this.finalResult();
        const user_data = configData.store.user;

        $(sign_up_form_submit_btn).waitForDisplayed(this.TIMEOUT);
        this.click(sign_up_form_submit_btn);

        browser.pause(this.TICK*3);
        browser.acceptAlert();

		// Check final result
        $(final_result).waitForDisplayed(this.TIMEOUT);
		const page_final_result_data = JSON.parse(($(final_result).getText()).trim());

		console.log('page_final_result_data ', page_final_result_data);

        expect(page_final_result_data.name).to
            .equal(
                user_data.name,
                `Error expect user data name: ${user_data.name} is not equal page text name: ${page_final_result_data.name}`
            );

        expect(page_final_result_data.email).to
            .equal(
                user_data.email,
                `Error expect user data email: ${user_data.email} is not equal page text email: ${page_final_result_data.email}`
            );

        expect(page_final_result_data.type).to
            .equal(
                user_data.type_console,
                `Error expect user data console type: ${user_data.type_console} is not equal page type console: ${page_final_result_data.type}`
            );
	}

    chooseGameConsole() {
        const sign_up_form_game_console_interests = this.signUpFormGameConsoleInterests();
        const sign_up_form_next_btn = this.signUpFormNextBtn();

        $(sign_up_form_game_console_interests).waitForDisplayed(this.TIMEOUT);
        this.click(sign_up_form_game_console_interests);

        $(sign_up_form_next_btn).waitForDisplayed(this.TIMEOUT);
        this.click(sign_up_form_next_btn);

        browser.pause(this.TICK);
	}

    fillNameAndEmailForm() {
        const sign_up_form_name = this.signUpFormName();
        const sign_up_form_email = this.signUpFormEmail();
        const sign_up_form_next_btn = this.signUpFormNextBtn();
        const sign_up_form_game_console_interests = this.signUpFormGameConsoleInterests();
        const user_data = configData.store.user;

        $(sign_up_form_name).waitForDisplayed(this.TIMEOUT);
        $(sign_up_form_email).waitForDisplayed(this.TIMEOUT);

        this.clearAndSetValue(sign_up_form_name, user_data.name);
        this.clearAndSetValue(sign_up_form_email, user_data.email);

        $(sign_up_form_next_btn).waitForDisplayed(this.TIMEOUT);
        this.click(sign_up_form_next_btn);
	}

    checkStatusButtonsFormContent() {
		const status_button_profile = this.statusButtonProfile();
		const status_button_interests = this.statusButtonInterests();
		const status_button_payment = this.statusButtonPayment();

		const sign_up_form_name = this.signUpFormName();
		const sign_up_form_email = this.signUpFormEmail();
		const sign_up_form_game_console_interests = this.signUpFormGameConsoleInterests();
		const sign_up_form_next_btn = this.signUpFormNextBtn();
		const sign_up_form_submit_btn = this.signUpFormSubmitBtn();

        // Sign up form submit btn
        $(status_button_payment).waitForDisplayed(this.TIMEOUT);
        this.click(status_button_payment);

        $(sign_up_form_submit_btn).waitForDisplayed(this.TIMEOUT);

        //Check form game console interests
        $(status_button_interests).waitForDisplayed(this.TIMEOUT);
        this.click(status_button_interests);

        $(sign_up_form_game_console_interests).waitForDisplayed(this.TIMEOUT);

        // Check form name and email
        $(status_button_profile).waitForDisplayed(this.TIMEOUT);
        this.click(status_button_profile);

        $(sign_up_form_name).waitForDisplayed(this.TIMEOUT);
        $(sign_up_form_email).waitForDisplayed(this.TIMEOUT);
	}
    checkPageHeaderName(name) {
        const page_header = this.headerText();
        const page_header_text = $(page_header).getText();
        $(page_header).waitForDisplayed(null,false,`Can't get page header text`);

        expect(name).to
            .equal(
                page_header_text,
                `Error expect header name: ${name} is not equal page header text: ${page_header_text}`
            );
    }
}

export default new Way2Automation();