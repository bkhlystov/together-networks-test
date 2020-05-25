Feature: Desktop / Common
  As a desktop visitor
  All common page elements should be available to me.

  Scenario: Open page
    Given I open the site "/"

  Scenario: Top-bar elements exist
    Then I wait page element "Top-bar" to be displayed
    Then I wait page element "Top-bar / Customer menu" to be displayed
    Then I expect page element "Top-bar / Live Chat" is displayed
    Then I expect page element "Top-bar / Cart menu" is displayed
    Then I expect page element "Top-bar / Spot Pricing" is displayed

  Scenario: Spot Pricing
    Then I expect page element "Spot Prices" is not displayed
    When I click on page element "Top-bar / Spot Pricing"
    Then I wait page element "Spot Pricing / Close button" to be displayed
    #Then I expect that local storage "_spot_pricing_panel" contains "true"
    Then I expect spot pricing link "/charts/gold-price" is displayed
    Then I expect spot pricing link "/charts/silver-price" is displayed
    Then I expect spot pricing link "/charts/platinum-price" is displayed
    Then I expect spot pricing link "/charts/palladium-price" is displayed
    Then I expect page element "Spot Pricing / View All Charts link" is displayed
    When I click on page element "Spot Pricing / Close button"
    Then I wait page element "Spot Pricing" to not be displayed
    #Then I expect that local storage "_spot_pricing_panel" not exists

  Scenario: Nav-bar elements exist
    Then I expect page element "Nav-bar / Logo" is displayed
    Then I expect page element "Nav-bar / Phone" is displayed
    Then I expect page element "Nav-bar / Phone" contains the text "1 (800) 852-6884"
    Then I expect page element "Nav-bar / Business-Hours / Day" contains the text "MONDAY - FRIDAY"
    Then I expect page element "Nav-bar / Business-Hours / Time" contains the text "9:00 AM - 5:00 PM"

  Scenario: H1
    Then I expect that element "h1" is displayed
    Then I expect that element "h1" contains the text "TOP BULLION PRODUCTS WE BUY"

  Scenario: Footer / Contacts
    Then I expect Company-Info > Contacts link "#live-chat" contains the text "Live Chat"
    Then I expect Company-Info > Contacts link "tel:18008526884" contains the text "1 (800) 852-6884"
    Then I expect Company-Info > Contacts link "https://bullionexchanges.com/contacts" contains the text "Email Us"

  Scenario: Footer / Links
    Then I expect domain "https://bullionexchanges.com" for all links ".companyinfo .promo a"
    Then I expect domain "https://bullionexchanges.com" for all links "//h3[contains(text(),'CUSTOMER INFO')]/following-sibling::ul/descendant-or-self::a"
    Then I expect domain "https://bullionexchanges.com" for all links "//h3[contains(text(),'MY ACCOUNT')]/following-sibling::ul/descendant-or-self::a"
    Then I expect domain "https://bullionexchanges.com" for all links "//h3[contains(text(),'FIND WHAT YOU NEED')]/following-sibling::ul/descendant-or-self::a"
     # TODO: WARNING: We have two identical links
     #Then I expect Company-Info link "https://bullionexchanges.com/pricealert/" contains the text "Market Alerts"
     #Then I expect Company-Info link "https://bullionexchanges.com/pricealert/" contains the text "Price Alerts"
    Then I expect Company-Info link "https://bullionexchanges.com/customer/account/" contains the text "Account Settings"
    Then I expect Company-Info link "https://bullionexchanges.com/customer/account/create/" contains the text "Sign Up"
    Then I expect Company-Info link "https://bullionexchanges.com/about-us/" contains the text "About BE"
    Then I expect Company-Info link "https://bullionexchanges.com/ira/" contains the text "Precious Metals IRA"
    Then I expect Company-Info link "https://bullionexchanges.com/sell-to-us/" contains the text "Sell To Us"
    Then I expect Company-Info link "https://bullionexchanges.com/bullionaire-club-rewards-program/" contains the text "BULLIONAIRE Club"
    Then I expect Company-Info link "https://bullionexchanges.com/price-match/" contains the text "Price Match"
    Then I expect Company-Info link "https://bullionexchanges.com/careers/" contains the text "Careers"
    Then I expect Company-Info link "http://www.shopperapproved.com/reviews/bullionexchanges.com/" contains the text "Reviews"

  Scenario: Footer / Map link
    Then I expect that the attribute "data-src" from element ".map-link > a[href='https://goo.gl/maps/WrkPLjyC9VsibpAw8'] > img" is contains "assets/i/footer-map.png"
    When I move to element ".map-link > a[href='https://goo.gl/maps/WrkPLjyC9VsibpAw8'] > img"
    When I wait page element ".map-link > a[href='https://goo.gl/maps/WrkPLjyC9VsibpAw8'] > img.b-loaded" to be displayed
    Then I expect that the attribute "src" from element ".map-link > a[href='https://goo.gl/maps/WrkPLjyC9VsibpAw8'] > img" is contains "assets/i/footer-map.png"

  Scenario: Footer / Copyrights
    Then I expect page element "Footer / Copyrights" is displayed
    Then I expect Footer > Address link "https://goo.gl/maps/WrkPLjyC9VsibpAw8" contains the text "30 West 47th Street, Store 1, New York, NY, 10036"
    Then I expect Footer > Address link "mailto:customerservice@bullionexchanges.com" contains the text "customerservice@bullionexchanges.com"

  Scenario: Footer / Social links
    Then I expect link "https://twitter.com/goldexchangenyc" iconed as "fa-twitter" is displayed
    Then I expect link "https://www.facebook.com/bullionexchanges" iconed as "fa-facebook" is displayed
    Then I expect link "https://www.pinterest.com/bullionexchange/" iconed as "fa-pinterest" is displayed
    Then I expect link "https://www.linkedin.com/company/bullion-exchanges-llc" iconed as "fa-linkedin" is displayed
    Then I expect link "https://www.instagram.com/bullionexchanges/" iconed as "fa-instagram" is displayed
    Then I expect link "https://www.youtube.com/channel/UCZkd8vN9T4bhI7L5UhLOacg" iconed as "fa-youtube" is displayed