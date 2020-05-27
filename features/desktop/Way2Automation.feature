Feature: Desktop / Protractor Form Profile

	Scenario: Check Protractor Form Profile
		When I open the site "/angularjs-protractor/multiform/#/form/profile"
		Then I expect page header name is "Let's Learn Protractor"
		Then I check statuses buttons forms content
		Then I fill user name and email form
		Then I choose game console
		Then I complete the test and check final result