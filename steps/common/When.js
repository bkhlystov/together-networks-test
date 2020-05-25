import clearValue from '../../support/action/clearValue';
import clickElement from '../../support/action/clickElement';
import deleteCookies from '../../support/action/deleteCookies';
import dragAndDrop from '../../support/action/dragAndDrop';
import focusLastOpenedWindow from '../../support/action/focusLastOpenedWindow';
import handleModal from '../../support/action/handleModal';
import moveToElement from '../../support/action/moveToElement';
import pause from '../../support/action/pause';
import pressButton from '../../support/action/pressButton';
import scroll from '../../support/action/scroll';
import selectOption from '../../support/action/selectOption';
import selectOptionByIndex from '../../support/action/selectOptionByIndex';
import setCookie from '../../support/action/setCookie';
import setInputField from '../../support/action/setInputField';
import setPromptText from '../../support/action/setPromptText';
import submitForm from '../../support/action/submitForm';
import fillForm from '../../support/action/fillForm';
import fillAddressAutocomplete from '../../support/action/fillAddressAutocomplete';
import selectDropListOption from '../../support/action/selectDropListOption';
import selectFile from '../../support/action/selectFile';
import clickLabelCheckbox from '../../support/action/clickLabelCheckbox';
import switchToFrame from '../../support/action/switchToFrame';
import switchToParentFrame from '../../support/action/switchToParentFrame';


const { When } = require('cucumber');


When(
    /^I (click|doubleclick) on the (link|button|element|label) "([^"]*)?"$/,
    clickElement
);

When(
    /^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/,
    setInputField
);

When(
    /^I clear the inputfield "([^"]*)?"$/,
    clearValue
);

When(
    /^I switch to frame "([^"]*)"$/,
    switchToFrame
);

When(
    /^I switch to parent frame$/,
    switchToParentFrame
);

When(
    /^I drag element "([^"]*)?" to element "([^"]*)?"$/,
    dragAndDrop
);

When(
    /^I submit the form "([^"]*)?"$/,
    submitForm
);

When(
    /^I pause for (\d+)ms$/,
    pause
);

When(
    /^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/,
    setCookie
);

When(
    /^I delete the cookie "([^"]*)?"$/,
    deleteCookies
);

When(
    /^I press "([^"]*)?"$/,
    pressButton
);

When(
    /^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
    handleModal
);

When(
    /^I enter "([^"]*)?" into the prompt$/,
    setPromptText
);

When(
    /^I scroll to element "([^"]*)?"$/,
    scroll
);

When(
    /^I focus the last opened (window|tab)$/,
    focusLastOpenedWindow
);

When(
    /^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/,
    selectOptionByIndex
);

When(
    /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
    selectOption
);

When(
    /^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/,
    moveToElement
);

When(
    /^I fill form "([^"]*)?":$/,
    fillForm
);

When(
    /^I fill address with autocomplete in form "([^"]*)?":$/,
    fillAddressAutocomplete
);

When(
    /^I select the option with the (name|value|text) "([^"]*)?" for drop-list "([^"]*)?"$/,
    selectDropListOption
);

When(
    /^I select a file "([^"]*)?" for the field "([^"]*)?"$/,
    selectFile
);

When(
    /^I click on the (checkbox|radio) with name "([^"]*)?" labeled as "([^"]*)?"$/,
    clickLabelCheckbox
);

When(
	/^I refresh page and waite for element "([^"]*)"$/,
	(selector) => {
		browser.refresh();

		if(selector) {
			$(`${selector}`).waitForDisplayed(null, false, `Can't get selector "${selector}"`);
		}
	}
);