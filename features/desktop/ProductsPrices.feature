Feature: Desktop / Prices

	Scenario: Check Spot Prices data for all metals
		When I open the site "/#header-spot-pricing"
		Then I expect response data in api url "/my/api/2/spot-price" UpdatedAt costs the current date-time with an accuracy of 1 minute
		Then I expect response prices in api "/my/api/2/spot-price" has the same prices in header main page

	Scenario: Gold / Price
		Then I expect first "5" items prices in Product-Table "gold", and Sign In button
		Then I expect first "5" items prices in Product-Table "gold" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "Not Logined Customer"

	Scenario: Silver / Price
		Then I expect first "5" items prices in Product-Table "silver", and Sign In button
		Then I expect first "5" items prices in Product-Table "silver" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "Not Logined Customer"

	Scenario: Platinum / Price
		Then I expect first "5" items prices in Product-Table "platinum", and Sign In button
		Then I expect first "5" items prices in Product-Table "platinum" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "Not Logined Customer"

	Scenario: Palladium / Price
		Then I expect first "5" items prices in Product-Table "palladium", and Sign In button
		Then I expect first "5" items prices in Product-Table "palladium" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "Not Logined Customer"

	Scenario: Checking prices for a General Customer
		Then I open the site "/my/signin?next=/"
		When I fill form ".js-login-form":
			| email    | <users["General Customer"].email>    |
			| password | <users["General Customer"].password> |
		When I click on MyAccount page button "LogIn Form / Submit button"
		Then I wait on MyAccount page element "Top-bar / Logged Customer" to be displayed

	Scenario: Gold / Price
		Then I expect first "5" items prices in Product-Table "gold", and Sell button
		Then I expect first "5" items prices in Product-Table "gold" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "General Customer"

	Scenario: Silver / Price
		Then I expect first "5" items prices in Product-Table "silver", and Sell button
		Then I expect first "5" items prices in Product-Table "silver" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "General Customer"

	Scenario: Platinum / Price
		Then I expect first "5" items prices in Product-Table "platinum", and Sell button
		Then I expect first "5" items prices in Product-Table "platinum" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "General Customer"

	Scenario: Palladium / Price
		Then I expect first "5" items prices in Product-Table "palladium", and Sell button
		Then I expect first "5" items prices in Product-Table "palladium" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "General Customer"

	Scenario: Checking prices for a Wholesale Customer
		Then I open the site "/my/signin?next=/"
		When I fill form ".js-login-form":
			| email    | <users["Wholesale Customer"].email>    |
			| password | <users["Wholesale Customer"].password> |
		When I click on MyAccount page button "LogIn Form / Submit button"
		Then I wait on MyAccount page element "Top-bar / Logged Customer" to be displayed

	Scenario: Gold / Price
		Then I expect first "5" items prices in Product-Table "gold", and Sell button
		Then I expect first "5" items prices in Product-Table "gold" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "Wholesale Customer"

	Scenario: Silver / Price
		Then I expect first "5" items prices in Product-Table "silver", and Sell button
		Then I expect first "5" items prices in Product-Table "silver" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "Wholesale Customer"

	Scenario: Platinum / Price
		Then I expect first "5" items prices in Product-Table "platinum", and Sell button
		Then I expect first "5" items prices in Product-Table "platinum" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "Wholesale Customer"

	Scenario: Palladium / Price
		Then I expect first "5" items prices in Product-Table "palladium", and Sell button
		Then I expect first "5" items prices in Product-Table "palladium" of dynamic rendering is equal to the price of the product in api "/my/api/2/product/" for "Wholesale Customer"