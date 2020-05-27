Feature: Desktop / Prices

	Scenario: Gold / Price
		When I visit website "//pixabay.com/accounts/login/"
		When I fill form "#login_form":
			| username    | <users["Test User"].username>    |
			| password | <users["Test User"].password> |