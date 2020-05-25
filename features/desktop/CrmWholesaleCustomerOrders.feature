Feature: Desctop / Crm / Orders

	Scenario: Login Wholesale Customer
		Then I open the url "/crm/login"
		When I fill form ".js-login-form":
			| Email | <users["CRM User"].email>    |
			| Password | <users["CRM User"].password> |
		When I click on MyAccount page button "LogIn Form / Submit button"
		Then I wait on element "a[data-company-name='Bullion Exchanges / Sell to Us']" for 30000ms to be displayed
		Then I click on the button "a[data-company-name='Bullion Exchanges / Sell to Us']"
		Then I wait on element ".base-content" for 30000ms to be displayed

	Scenario: Orders App
		Then I open the url "/crm/apps/orders"
		Then I go to CRM Orders App and check for "Wholesale Customer" order number, shipping method "Wire above 7500", order status "Waiting for Approval"

	Scenario: Orders App / Customers Sub-App
		Then I check contact info and customer info
		Then I check billing addresses
		Then I check shipping addresses

	Scenario: Orders App / Emails Sub-App
		Then I check 2 emails "Order Confirmation" and "Order Shipment Labels"
		Then I check products summary
		Then I change order status to the "Pending Merchandise" and check email "Invoice"
		Then I change order status to the "Shippment Received" and check email "Order Shipment Confirmation V2"




