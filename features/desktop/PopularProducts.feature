Feature: Desktop / Popular Products
  As a desktop visitor
  I should be able to use all four product tables on the main page:
  Gold | Silver | Platinum | Palladium

  Background:
    Given I open the site "/"

  Scenario: Tabs
    Then I expect Product-Tabs link "/" contains the text "POPULAR"
    Then I expect Product-Tabs link "/gold" contains the text "GOLD"
    Then I expect Product-Tabs link "/silver" contains the text "SILVER"
    Then I expect Product-Tabs link "/platinum" contains the text "PLATINUM"
    Then I expect Product-Tabs link "/palladium" contains the text "PALLADIUM"
    Then I expect that element ".product-tabs li.active > a" contains the text "POPULAR"

  Scenario: Gold
    Then I expect each item in Product-Table "gold"

  Scenario: Silver
    Then I expect each item in Product-Table "silver"

  Scenario: Platinum
    Then I expect each item in Product-Table "platinum"

  Scenario: Palladium
    Then I expect each item in Product-Table "palladium"