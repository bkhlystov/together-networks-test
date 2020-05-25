import SitePage from "../../pages/site/common.page";
import waitFor from "../../support/action/waitFor";
import clickElement from "../../support/action/clickElement";
import moveToElement from "../../support/action/moveToElement";
import setInputField from "../../support/action/setInputField";
import isDisplayed from "../../support/check/isDisplayed";
import checkContainsText from "../../support/check/checkContainsText";
import checkLinksDomain from "../../support/check/checkLinksDomain";

const { When, Then } = require('cucumber');

When(
    /^I (click|doubleclick) on page (link|button|element|label) "([^"]*)?"$/,
    (action, type, elementName) => {
        clickElement(action, type, SitePage.getElement(elementName));
    }
);

When(
    /^I hover on ([^"]*)? link "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/,
    (elementName,href,x,y) => {
        switch(elementName){
            case "Mega-Menu":
                moveToElement(SitePage.megaMenuLink(href),x,y);
                break;
        }
    }
);

When(
    /^I (add|set) "([^"]*)?" to page field "([^"]*)?"$/,
    (method, value, selector) => {
        setInputField(method, value, SitePage.getElement(selector));
    }
);

Then(
    /^I expect page element "([^"]*)?" is( not)* displayed$/,
    (elementName, falseCase) => {
        isDisplayed(SitePage.getElement(elementName),falseCase);
    }
);

Then(
    /^I expect link "([^"]*)?" iconed as "([^"]*)?" is displayed$/,
    (link,iconClass) => {
        isDisplayed(SitePage.iconedLink(link,iconClass));
    }
);

Then(
    /^I wait page element "([^"]*)?"(?: for (\d+)ms)*(?: to( not)* (be checked|be enabled|be selected|be displayed|contain a text|contain a value|exist))*$/,
    (elementName, ms, falseState, state) => {
        waitFor(SitePage.getElement(elementName), ms, falseState, state);
    }
);

Then(
    /^I expect spot pricing link "([^"]*)?" is displayed$/,
    (element) => {
        SitePage.isSpotPricingLinkDisplayed(element);
    }
);

Then(
    /^I expect page (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    (elementType, elementName, falseCase, expectedText) => {
        checkContainsText(elementType, SitePage.getElement(elementName), falseCase, expectedText);
    }
);

Then(
    /^I expect ([^"]*)? link "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    (elementName, href, falseCase, expectedText) => {
        switch(elementName){
            case "Mega-Menu":
                checkContainsText("element", SitePage.megaMenuLink(href), falseCase, expectedText);
                break;
            case "Product-Tabs":
                checkContainsText("element", SitePage.productTabsLink(href), falseCase, expectedText);
                break;
            case "Company-Info":
                checkContainsText("element", SitePage.companyInfoLink(href), falseCase, expectedText);
                break;
            case "Company-Info > Contacts":
                checkContainsText("element", SitePage.companyInfoContactsLink(href), falseCase, expectedText);
                break;
            case "Footer > Address":
                checkContainsText("element", SitePage.footerAddressLink(href), falseCase, expectedText);
                break;

            case "Mobile-Menu":
                checkContainsText("element", SitePage.mobileMenuLink(href), falseCase, expectedText);
                break;
        }
    }
);

Then(
    /^I expect sub-menu for Mega-Menu link "([^"]*)?" is( not)* displayed$/,
    (href, falseCase) => {
        waitFor(SitePage.megaMenuLinkDrop(href), null, falseCase, "be displayed");
        //isDisplayed(SitePage.megaMenuLinkDrop(href),falseCase);
    }
);

Then(
    /^I expect each item in Product-Table "([^"]*)?"$/,
    (productType) => {
        SitePage.expectProductTable(productType);
    }
);

Then(
	/^I expect response data in api url "([^"]*)?" UpdatedAt costs the current date-time with an accuracy of 1 minute$/,
	(url) => {
		SitePage.expectDateTimeSpotPricing(url);
	}
);

Then(
	/^I expect response prices in api "([^"]*)?" has the same prices in header main page$/,
	(url_api) => {
		SitePage.expectSameSpotPricingInHeader(url_api);
	}
);

Then(
	/^I expect first "([^"]*)?" items prices in Product-Table "([^"]*)?", and Sign In button$/,
	(count, productType) => {
		SitePage.expectProductTableItemsPrices(count, productType);
	}
);

Then(
	/^I expect first "([^"]*)?" items prices in Product-Table "([^"]*)?" of dynamic rendering is equal to the price of the product in api "([^"]*)?" for "([^"]*)?"$/,
	(count, productType, url, customer_type) => {
		SitePage.checkSameProductPrices(count, productType, url, customer_type);
	}
);

Then(
	/^I expect first "([^"]*)?" items prices in Product-Table "([^"]*)?", and Sell button$/,
	(count, productType) => {
		SitePage.expectProductTableItemsSellButton(count, productType);
	}
);

Then(
	/^I delete all account addresses$/,
	() => {
		SitePage.deleteAllAccountAddresses();
	}
);

Then(
	/^I add to the basket one product of catalog "([^"]*)?" with a quantity of "([^"]*)?" for "([^"]*)?"$/,
	(catalog_name, qty, customer) => {
		SitePage.addProductToTheBasket(catalog_name, qty, customer);
	}
);

Then(
	/^I go to the basket, there should be "([^"]*)?" products for each qty "([^"]*)?" for "([^"]*)?"$/,
	(products_count, qty, customer) => {
		SitePage.checkProductsInBasket(Number(products_count), qty, customer);
	}
);

Then(
	/^I check that the Spot Price for each product is equal to the Spot Price site header$/,
	() => {
		SitePage.compareSpotPricesInHeaderAndInBasketForProducts();
	}
);

Then(
	/^I check visible basket update counter message in delay "([^"]*)?" ms$/,
	(delay) => {
		SitePage.checkBasketUpdateCounterMessage(Number(delay));
	}
);

Then(
	/^I for all products, increase qty to "([^"]*)?"$/,
	(qty) => {
		SitePage.changeQtyForAllProductsInBasket(qty);
	}
);

Then(
	/^I go to checkout page$/,
	() => {
		SitePage.goToCheckoutPage();
	}
);

Then(
	/^I check Shipping Cost with negative price for "([^"]*)?"$/,
	(customer) => {
		SitePage.checkShippingCostWithNegativePrice(customer);
	}
);

Then(
	/^I save list of products and their prices added to the basket$/,
	() => {
		SitePage.saveListOfProductsAndTheirPrices();
	}
);

Then(
	/^I check Processing Fee for "([^"]*)?"$/,
	(customer) => {
		SitePage.checkProcessingFee(customer);
	}
);

Then(
	/^I check that all products prices is equal basket products prices$/,
	() => {
		SitePage.checkAccountOrdersProductsPrices();
	}
);

Then(
	/^I check shipping and billing addresses for "([^"]*)?"$/,
	(customer) => {
		SitePage.checkAccountOrdersShippingAndBillingAddresses(customer);
	}
);

Then(
	/^I save order-number for "([^"]*)?"$/,
	(customer) => {
		SitePage.saveOrderNumber(customer);
	}
);

