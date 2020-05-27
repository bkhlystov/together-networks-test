Feature: Desktop / Pixabay Docs

##	Working only after check recapcha
#	Scenario: Login to Pixabay
#		When I visit website "//pixabay.com/accounts/login/" and waite for element "#login_form"
#		Then I'm waiting for 1000ms
#		Then I expect that element "#login_form" is displayed
#
#		When I fill form "#login_form":
#			| username    | <users["Test User Wrong"].username>    |
#			| password | <users["Test User Wrong"].password> |
#		Then I click on the button "#login_form input[type='submit']"
#		Then I'm waiting for 5000ms
#		Then I expect that element "#login_form .errorlist" is displayed
#
#		When I fill form "#login_form":
#			| username    | <users["Test User Correct"].username>    |
#			| password | <users["Test User Correct"].password> |
#		Then I click on the button "#login_form input[type='submit']"
#		Then I'm waiting for 300000ms

	Scenario: Check Pixabay Docs Page Anchors
		When I visit website "//pixabay.com/api/docs/" and waite for element "#api_rate_limit"
		Then I'm waiting for 100ms

		When I scroll to element "a[href='#api_rate_limit']"
		Then I'm waiting for 100ms
		When I click on the element "a[href='#api_rate_limit']"
		Then I'm waiting for 100ms
		Then I expect that element "#api_rate_limit" is displayed
		Then I expect that element "#api_rate_limit" contains the text "Rate Limit"

		When I scroll to element "a[href='#api_hotlinking']"
		Then I'm waiting for 100ms
		When I click on the element "a[href='#api_hotlinking']"
		Then I'm waiting for 100ms
		Then I expect that element "#api_hotlinking" is displayed
		Then I expect that element "#api_hotlinking" contains the text "Hotlinking"

		When I scroll to element "a[href='#api_error_handling']"
		Then I'm waiting for 100ms
		When I click on the element "a[href='#api_error_handling']"
		Then I'm waiting for 100ms
		Then I expect that element "#api_error_handling" is displayed
		Then I expect that element "#api_error_handling" contains the text "Error Handling"

		When I scroll to element "a[href='#api_search_images']"
		Then I'm waiting for 100ms
		When I click on the element "a[href='#api_search_images']"
		Then I'm waiting for 100ms
		Then I expect that element "#api_search_images" is displayed
		Then I expect that element "#api_search_images" contains the text "Search Images"

		When I scroll to element "a[href='#api_search_videos']"
		Then I'm waiting for 100ms
		When I click on the element "a[href='#api_search_videos']"
		Then I'm waiting for 100ms
		Then I expect that element "#api_search_videos" is displayed
		Then I expect that element "#api_search_videos" contains the text "Search Videos"

		When I scroll to element "a[href='#api_javascript_example']"
		Then I'm waiting for 100ms
		When I click on the element "a[href='#api_javascript_example']"
		Then I'm waiting for 100ms
		Then I expect that element "#api_javascript_example" is displayed
		Then I expect that element "#api_javascript_example" contains the text "JavaScript Example"

		When I scroll to element "a[href='#api_support']"
		Then I'm waiting for 100ms
		When I click on the element "a[href='#api_support']"
		Then I'm waiting for 100ms
		Then I expect that element "#api_support" is displayed
		Then I expect that element "#api_support" contains the text "Support"

	Scenario: Check Pixabay Docs Api Links
		Then I check api "https://pixabay.com/api/"
		Then I check api "https://pixabay.com/api/videos/"

	Scenario: Check Humburger After Resize Screen Size
		When I have a screen that is 800 by 600 pixels
		Then I'm waiting for 100ms
		Then I expect that element "#header_inner .icon_mobile_menu" is displayed