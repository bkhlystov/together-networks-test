Feature: Desctop / Checkout Process

	Scenario: Login General Customer
		Then I open the site "/my/signin?next=/"
		When I fill form ".js-login-form":
			| email    | <users["General Customer"].email>    |
			| password | <users["General Customer"].password> |
		When I click on MyAccount page button "LogIn Form / Submit button"
		Then I wait on MyAccount page element "Top-bar / Logged Customer" to be displayed

	Scenario: Account / Addresses
		Then I open the site "/my/account/addresses/"
		Then I delete all account addresses

	Scenario: Add gold product to basket
		Then I open the site "/gold"
		Then I add to the basket one product of catalog "gold" with a quantity of "2" for "General Customer"

	Scenario: Add silver product to basket
		Then I open the site "/silver"
		Then I add to the basket one product of catalog "silver" with a quantity of "2" for "General Customer"

	Scenario: Add platinum product to basket
		Then I open the site "/platinum"
		Then I add to the basket one product of catalog "platinum" with a quantity of "2" for "General Customer"

	Scenario: Add palladium product to basket
		Then I open the site "/palladium"
		Then I add to the basket one product of catalog "palladium" with a quantity of "2" for "General Customer"

	Scenario: Check products in basket
		Then I open the site "/my/2/cart"
		Then I go to the basket, there should be "4" products for each qty "2" for "General Customer"
		Then I check that the Spot Price for each product is equal to the Spot Price site header
		Then I check visible basket update counter message in delay "40000" ms
		Then I for all products, increase qty to "3"
		Then I go to checkout page

	Scenario: Checkout
		When I fill form ".address-form":
			| country_id    | <store.customer.address.country_id.option> |
			| state_id | <store.customer.address.state_id.option> |
			| city | <store.customer.address.city> |
			| zip | <store.customer.address.zip> |
			| street_address | <store.customer.address.street_address> |
			| street_address1 | <store.customer.address.street_address1> |
			| phone_number | <store.customer.address.phone> |
		Then I'm waiting for 1000ms
		Then I click on the button ".app-shipping-view .js-continue"
		Then I check Shipping Cost with negative price for "General Customer"
		Then I click on the button ".app-shipping-method-view .js-continue"
		When I click on the element ".app-billing-view .addresses .checkout-list-item.address:first-child"
		Then I click on the button ".app-billing-view .js-continue"
		When I click on the element ".payment-methods .payment-method[data-alias='wireabove7500']"
		When I click on the element ".payment-methods .payment-method[data-alias='wireabove7500'] .credit-card-list .credit-card-item:first-child .close.js-remove"
		Then I wait on element ".modal .modal-footer .confirm" for 20000ms to be displayed
		When I click on the element ".modal .modal-footer .confirm"
		When I fill form ".credit-card-form":
			| card_number    | <store.customer.card.card_number> |
			| name_as_printed    | <store.customer.card.name_as_printed> |
			| expiration_month    | <store.customer.card.expiration_month> |
			| expiration_year    | <store.customer.card.expiration_year.option> |
			| cvv    | <store.customer.card.cvv> |
		Then I click on the element ".app-credit-form .js-save"
		Then I click on the element ".app-payment-method-view .js-continue"
		Then I check Processing Fee for "General Customer"
		When I refresh page and waite for element ".app-review-totals-view .cart-prices tbody tr:nth-child(2) td:last-child"
		Then I check Processing Fee for "General Customer"
		Then I check visible basket update counter message in delay "30000" ms
		Then I save list of products and their prices added to the basket
		Then I take screenshot
		Then I click on the element ".app-review-totals-view button[name='submit_order']"

	Scenario: Confirmation page
		Then I wait on element ".app-confirmation .order-number" for 60000ms to be displayed
		Then I save order-number for "General Customer"
		When I click on the element ".app-confirmation .order-number"
		Then I wait on MyAccount page element "Account / Orders" to be displayed
		Then I expect that element ".orders-app .order-heading > h2 .label.label-default" contains the text "WAITING FOR APPROVAL"
		Then I check that all products prices is equal basket products prices
		Then I check shipping and billing addresses for "General Customer"




