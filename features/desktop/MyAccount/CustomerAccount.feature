Feature: Desktop / Customer Account
  As a desktop customer
  I have to log in to my account.

  Background:
    Given I open the site "/my/signin?next=/"

  Scenario: Wholesale Customer
    When I fill form ".js-login-form":
      | email    | <users["Wholesale Customer"].email>    |
      | password | <users["Wholesale Customer"].password> |
    When I click on MyAccount page button "LogIn Form / Submit button"
    Then I wait on MyAccount page element "Top-bar / Logged Customer" to be displayed
    When I click on MyAccount page button "Top-bar / Logged Customer"
    Then I wait on MyAccount page element "Top-bar / Logged Customer Menu" to be displayed
    Then I expect on MyAccount page "Top-bar Customer Menu" link "/my/account" contains the text "My Account"
    Then I expect on MyAccount page "Top-bar Customer Menu" link "/my/account/wishlist" contains the text "Wishlist"
    Then I expect on MyAccount page "Top-bar Customer Menu" link "/my/logout?next=/" contains the text "Log Out"
    When I click on MyAccount page button "Top-bar / Log Out"
    Then I wait page element "Top-bar / Unlogged Customer menu" to be displayed

  Scenario: General Customer
    When I fill form ".js-login-form":
      | email    | <users["General Customer"].email>    |
      | password | <users["General Customer"].password> |
    When I click on MyAccount page button "LogIn Form / Submit button"
    Then I wait on MyAccount page element "Top-bar / Logged Customer" to be displayed
    When I click on MyAccount page button "Top-bar / Logged Customer"
    Then I wait on MyAccount page element "Top-bar / Logged Customer Menu" to be displayed
    Then I expect on MyAccount page "Top-bar Customer Menu" link "/my/account" contains the text "My Account"
    Then I expect on MyAccount page "Top-bar Customer Menu" link "/my/account/wishlist" contains the text "Wishlist"
    Then I expect on MyAccount page "Top-bar Customer Menu" link "/my/logout?next=/" contains the text "Log Out"
    When I click on MyAccount page button "Top-bar / Log Out"
    Then I wait page element "Top-bar / Unlogged Customer menu" to be displayed
