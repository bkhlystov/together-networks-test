Feature: Desktop / Mega-Menu
  As a desktop visitor
  All common page elements should be available to me.

  Background:
    Given I open the site "/"

  Scenario: Tabs
    Then I expect Mega-Menu link "https://bullionexchanges.com/buy-gold/" contains the text "GOLD"
    Then I expect Mega-Menu link "https://bullionexchanges.com/buy-silver/" contains the text "SILVER"
    Then I expect Mega-Menu link "https://bullionexchanges.com/buy-platinum/" contains the text "PLATINUM"
    Then I expect Mega-Menu link "https://bullionexchanges.com/deals/" contains the text "SALE"
    Then I expect Mega-Menu link "https://bullionexchanges.com/ira/" contains the text "IRA"
    Then I expect Mega-Menu link "https://bullionexchanges.com/charts/gold-price/" contains the text "CHARTS"
    Then I expect Mega-Menu link "#other" contains the text "OTHER"
    Then I expect Mega-Menu link "#whybe" contains the text "WHY BE?"

    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-gold/" is not displayed
    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-silver/" is not displayed
    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-platinum/" is not displayed
    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/ira/" is not displayed
    Then I expect sub-menu for Mega-Menu link "#other" is not displayed

#    When I hover on Mega-Menu link "https://bullionexchanges.com/buy-gold/"
#    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-gold/" is displayed

#    When I hover on Mega-Menu link "https://bullionexchanges.com/buy-silver/"
#    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-silver/" is displayed

#    When I hover on Mega-Menu link "https://bullionexchanges.com/buy-platinum/"
#    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-platinum/" is displayed

#    When I hover on Mega-Menu link "https://bullionexchanges.com/ira/"
#    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/ira/" is displayed

#    When I hover on Mega-Menu link "#other"
#    Then I expect sub-menu for Mega-Menu link "#other" is displayed

#    When I hover on Mega-Menu link "#whybe"
#    Then I expect sub-menu for Mega-Menu link "#whybe" is displayed

#    When I move to element ".mega-menu" with an offset of 10,1000
#    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-gold/" is not displayed
#    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-silver/" is not displayed
#    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/buy-platinum/" is not displayed
#    Then I expect sub-menu for Mega-Menu link "https://bullionexchanges.com/ira/" is not displayed
#
#  Scenario: Sub-menu links
#    Then I expect domain "https://bullionexchanges.com" for all links ".mega-dropdown>a[href='https://bullionexchanges.com/buy-gold/']+ul a"
#    Then I expect domain "https://bullionexchanges.com" for all links ".mega-dropdown>a[href='https://bullionexchanges.com/buy-silver/']+ul a"
#    Then I expect domain "https://bullionexchanges.com" for all links ".mega-dropdown>a[href='https://bullionexchanges.com/buy-platinum/']+ul a"
#    Then I expect domain "https://bullionexchanges.com" for all links ".mega-dropdown>a[href='https://bullionexchanges.com/ira/']+ul a"
#    Then I expect domain "https://bullionexchanges.com" for all links ".mega-dropdown>a[href='#other']+ul a"
#    Then I expect domain "https://bullionexchanges.com" for all links ".mega-dropdown>a[href='#whybe']+ul a"

