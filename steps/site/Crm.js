import CrmPage from "../../pages/site/crm.page";
import openWebsite from '../../support/action/openWebsite';

import waitFor from "../../support/action/waitFor";
import clickElement from "../../support/action/clickElement";
import moveToElement from "../../support/action/moveToElement";
import setInputField from "../../support/action/setInputField";
import isDisplayed from "../../support/check/isDisplayed";
import checkContainsText from "../../support/check/checkContainsText";
import checkLinksDomain from "../../support/check/checkLinksDomain";

const { Then } = require('cucumber');

Then(
	/^I go to CRM Orders App and check for "([^"]*)?" order number, shipping method "([^"]*)?", order status "([^"]*)?"$/,
	(customer, payment_method, order_status) => {
		CrmPage.goToOrderAndCheckOrderDataInGrid(customer, payment_method, order_status);
	}
);

Then(
	/^I check contact info and customer info$/,
	() => {
		CrmPage.checkContactInfoAndCustomerInfo();
	}
);

Then(
	/^I check billing addresses$/,
	() => {
		CrmPage.checkBillingAddresses();
	}
);

Then(
	/^I check shipping addresses$/,
	() => {
		CrmPage.checkShippingAddresses();
	}
);

Then(
	/^I check 2 emails "([^"]*)?" and "([^"]*)?"$/,
	(email_name_1, email_name_2) => {
		CrmPage.checkOrderEmails(email_name_1, email_name_2);
	}
);

Then(
	/^I check products summary$/,
	() => {
		CrmPage.checkProductsSummary();
	}
);

Then(
	/^I change order status to the "([^"]*)?" and check email "([^"]*)?"$/,
	(order_status, email_name) => {
		CrmPage.changeOrderStatusAndCheckEmail(order_status, email_name);
	}
);


Then(
	/^I check email "([^"]*)?"$/,
	(email_name) => {
		CrmPage.checkOrderEmail(email_name);
	}
);