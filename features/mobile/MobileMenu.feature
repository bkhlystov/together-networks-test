Feature: Mobile / Hamburger-Menu
  As a mobile visitor
  All Hamburger-Menu elements should be available to me.

  Background:
    Given I open the site "/"

  Scenario: Top-bar elements exist
    Then I wait page element "Top-bar" to be displayed
#    Then I click on page element "Top-bar / Mobile Menu Toggle"
#    Then I expect Mobile-Menu link "https://bullionexchanges.com/" contains the text "Home"
#    Then I expect Mobile-Menu link "https://bullionexchanges.com/buy-gold/" contains the text "Gold"
#    Then I expect Mobile-Menu link "https://bullionexchanges.com/buy-silver/" contains the text "Silver"
#    Then I expect Mobile-Menu link "https://bullionexchanges.com/buy-platinum/" contains the text "Platinum"
#    Then I expect Mobile-Menu link "https://bullionexchanges.com/deals/" contains the text "On sale"
#    Then I expect Mobile-Menu link "#other" contains the text "Other"
#    Then I expect Mobile-Menu link "https://bullionexchanges.com/ira/" contains the text "IRA"
#    Then I expect Mobile-Menu link "https://wholesale.bullionexchanges.com/" contains the text "Sell to us"
#    Then I expect Mobile-Menu link "https://bullionexchanges.com/charts/gold-price/" contains the text "Charts"
#    Then I expect Mobile-Menu link "#why-be" contains the text "Why BE?"
#
#    Then I expect domain "https://bullionexchanges.com" for all links ".menu-mobile>li>a[href='https://bullionexchanges.com/buy-gold/']+ul a[href]"
#    Then I expect domain "https://bullionexchanges.com" for all links ".menu-mobile>li>a[href='https://bullionexchanges.com/buy-silver/']+ul a[href]"
#    Then I expect domain "https://bullionexchanges.com" for all links ".menu-mobile>li>a[href='https://bullionexchanges.com/buy-platinum/']+ul a[href]"
#    Then I expect domain "https://bullionexchanges.com" for all links ".menu-mobile>li>a[href='#other']+ul a[href]"
#    Then I expect domain "https://bullionexchanges.com" for all links ".menu-mobile>li>a[href='#why-be']+ul a[href]"

