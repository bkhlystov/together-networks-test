Feature: Desktop / Newsletter Subscription
  As a desktop visitor
  I should be able to subscribe to the news and receive a notification in the mail about my subscription.

  Background:
    Given I open the site "/"

  Scenario: Form
    Then I expect page element "Newsletter / Title" contains the text "SUBSCRIBE TO OUR NEWSLETTER TO RECEIVE EXCLUSIVE DISCOUNTS AND INDUSTRY NEWS"
    Then I wait page element "Newsletter / Email field" to be displayed
    Then I wait page element "Newsletter / Email field" to be enabled
    When I set "Bullshit" to page field "Newsletter / Email field"
    Then I wait page element "Newsletter / Subscribe button" to not be enabled
    When I set "maxk@4ib.com" to page field "Newsletter / Email field"
    Then I wait page element "Newsletter / Subscribe button" to be enabled
    # TODO: WARNING: We cannot submit this form with Google recaptcha, for stage tests we need to disable Google recaptcha
    When I click on page button "Newsletter / Subscribe button"
    #Then Wait Ajax

  # TODO: Check IMAP for email notification of new subscription