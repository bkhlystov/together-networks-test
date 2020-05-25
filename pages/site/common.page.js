import Test from '../test';
import makeAjax from '../../support/action/makeAjax.js';
import decimalAdjust from '../../support/action/decimalAdjust.js';

// More details about page object you can read in this guide: https://webdriver.io/docs/pageobjects.html

class SitePage extends Test {
	constructor() {
		super();
	}

    get header() { return `header`; }
    get footer() { return `footer`; }
    get navTop() { return `#nav-top`; }
    get navTopCustomerMenu() { return `${this.navTop} .app-customer-menu > .nav`; }
    get navTopUnloggedCustomerMenu() { return `${this.navTopCustomerMenu} .js-unlogged-user-elements`; }
    get navTopLiveChatBtn() { return `${this.navTop} a[href="#live-chat"]`; }
    get navTopCartMenu() { return `${this.navTop} .app-cart-menu`; }
    get navTopSpotPricing() { return `${this.navTop} .js-spot-pricing-btn > a`; }
    get mobileMenu() { return `.js-top-menu .menu-mobile`; }
    get mobileMenuToggle() { return `${this.navTop} .navbar-toggle`; }
    get spotPricing() { return `#spot-pricing-placeholder`; }
    get spotPricingCloseBtn() { return `${this.spotPricing} .js-spot-close`; }
    get spotPricingViewAllChartsLink() { return `${this.spotPricing} .view-all-charts`; }
    get spotPrices() { return `${this.header} .spot-prices`; }
    get navBarHeader() { return `${this.header} .navbar-header`; }
    get navBarHeaderLogoImg() { return `${this.navBarHeader} .logo a[itemprop='url'] img[itemprop='logo']`; }
    get navBarHeaderPhone() { return `${this.navBarHeader} .navbar-info .phone`; }
    get navBarHeaderBHDay() { return `${this.navBarHeader} .navbar-info .business-hours .hours-day`; }
    get navBarHeaderBHTime() { return `${this.navBarHeader} .navbar-info .business-hours .hours-time`; }
    get megaMenu() { return `${this.header} .mega-menu`; }
    get productTabs() { return `.product-tabs`; }
    get newsletter() { return `.newsletter`; }
    get newsletterTitle() { return `${this.newsletter} h3`; }
    get newsletterEmailField() { return `${this.newsletter} input[name="email"]`; }
    get newsletterSubscribeBtn() { return `${this.newsletter} button[name="subscribe"]`; }
    get companyInfo() { return `.companyinfo`; }
    get companyInfoPromo() { return `${this.companyInfo} .promo`; }
    get companyInfoPromoTitle() { return `${this.companyInfoPromo} li.title`; }
    get companyInfoContacts() { return `${this.companyInfo} .contacts`; }
    get footerAddress() { return `${this.footer} .address`; }
    get footerCopyrights() { return `${this.footer} .copy`; }
    get accountPage() { return '.account-page'; }

    spotPricingPrices() { return `${this.spotPricing} .price`;}
    spotPricingLink(href) { return `${this.spotPricing} a[href='${href}']`; }
    megaMenuLink(href) { return `${this.megaMenu} a[href='${href}']`; }
    megaMenuLinkDrop(href) { return `${this.megaMenuLink(href)}+ul`; }
    productTabsLink(href) { return `${this.productTabs} a[href='${href}']`; }
    productTable(type) { return `${this.productTabs} table.${type}`; }
    productTableItems(type) { return `${this.productTable(type)} .js-product-item`; }
    companyInfoLink(href) { return `${this.companyInfo} a[href='${href}']`; }
    companyInfoContactsLink(href) { return `${this.companyInfoContacts} a[href='${href}']`; }
    footerAddressLink(href) { return `${this.footerAddress} a[href='${href}']`; }
    iconedLink(link,iconClass) { return `a[href="${link}"]>i.${iconClass}`; }
    mobileMenuLink(href) { return `${this.mobileMenu} a[href='${href}']`; }
    accountAddresses() {return `${this.accountPage} .addresses-app .addresses`;}
    catalogFirstProduct() {return `.js-products-grid .js-product-item:first-child`;}
	accountOrdersApp() { return `${this.accountPage} .orders-app`;}

	addProductToTheBasket(catalog_name, qty, customer) {
    	const data_prodid = $(`${this.catalogFirstProduct()}`).getAttribute('data-prodid');
    	const btn_sell = `${this.catalogFirstProduct()} td:nth-child(5) button[name="sell_add_to_cart"]`;
		const update_btn = '.update-cart-btn';
		const quantity = '.cart-modal input[name="quantity"]';

		let we_pay = null;

		switch (customer) {
			case 'Wholesale Customer':
				we_pay = `${this.catalogFirstProduct()} .sell-spot.js-wholesale-price span:last-child`;
				break;
			case 'General Customer':
				we_pay = `${this.catalogFirstProduct()} .sell-spot.js-cart-price span:last-child`;
				break;
		}

		$(we_pay).waitForDisplayed(null,false,`Can't get wee pay text`);

		$(btn_sell).waitForDisplayed();

		const we_pay_text = $(we_pay).getText().replace(/%/g, '');

		this.storage[`we_pay_${data_prodid}`] = we_pay_text;

		this.click(btn_sell);

		$(quantity).waitForDisplayed(30000);

		browser.pause(1000);

		this.clearAndSetValue(quantity, qty);

		browser.pause(1500);

		this.clickAndWaitAjax(update_btn);

		const input_qty_value = $('.cart-modal input[name="quantity"]').getValue();

		expect(input_qty_value).to
			.equal(
				qty,
				`Error input qty updated value: ${input_qty_value} is not equal expect product qty: ${qty}`
			);
	}

	changeQtyForAllProductsInBasket(qty) {
		const products_count = 4;
		const products = '.cart-products .cart-product';
		$(`${products}:last-child`).waitForDisplayed(null, false, "Can't get products in basket");

		$$(products).forEach(element => {
			const input_qty = element.$('.js-product-qty');

			input_qty.waitForDisplayed();
			input_qty.waitForEnabled();
			input_qty.clearValue();
			input_qty.setValue(qty);

			this.waitAjax();
			browser.pause(1500);
		});

		this.reLoadPage();

		this.checkProductsInBasket(products_count, qty);

		browser.takeScreenshot();
	}

	checkProductsInBasket(products_count, qty, customer) {
    	const products = '.cart-products .cart-product';

		$(`${products}:last-child`).waitForDisplayed(null, false, "Can't get products in basket");

		const prod_length = $$(products).length;

		expect(products_count).to
			.equal(
				prod_length,
				`Error in basket: products count: ${products_count} not equal product length in basket: ${prod_length}`
			);

		if(prod_length === products_count) {
			$$('.cart-products .cart-product').forEach(element => {
				const prod_id = element.getAttribute('data-prodid');

				const we_pay = this.storage[`we_pay_${prod_id}`];

				const premium = element.$('.cart-product-data-list li:first-child b').getText();

				const product_qty = element.$('.js-product-qty').getValue();

				expect(qty).to
					.equal(
						product_qty,
						`Error in product id: ${prod_id}, expect qty: ${qty} not equal product_qty: ${product_qty}`
					);

				expect(premium).to
					.equal(
						we_pay,
						`Error in product id: ${prod_id}, expect we_pay: ${we_pay} not equal product premiun: ${premium} in basket`
					);
			});
		}
	}

	deleteAllAccountAddresses() {
		$('.addresses-app').waitForDisplayed(null, false, "Can't get account addresses list");

		browser.pause(1000);

		const addresses_length = $$(`${this.accountAddresses()} .address`).length;

		if(addresses_length > 0) {
			$$(`${this.accountAddresses()} .address`).forEach(element => {
				const btn_delete = element.$('.controls button:last-child');
				const btn_popover_yes = '.store-popover-holder .store-popover-controls button:first-child';

				btn_delete.waitForDisplayed(null, false, "Can't get delete button");

				btn_delete.click();

				$(btn_popover_yes).waitForDisplayed(null,false,`Can't get confirm popover button save`);

				this.clickAndWaitAjax(btn_popover_yes);

				browser.pause(500);
			});
		}
    }

	checkShippingCostWithNegativePrice(customer) {
		let check_shipping_cost = false;

		const $shipping_cost = $('.cart-prices tbody tr:nth-of-type(2) td:last-child');

		switch (customer) {
			case 'Wholesale Customer':
				check_shipping_cost = true;
				break;
			case 'General Customer':
				check_shipping_cost = false;
				break;
		}

		if(check_shipping_cost) {
			$shipping_cost.waitForDisplayed(30000, false, "Can't get shipping cost");

			this.storage.shipping_cost = parseFloat($shipping_cost.getText().replace('$', ''));

			if(this.storage.shipping_cost > 0) {
				throw new Error(`Shipping Cost (${this.storage.shipping_cost}) must be lower then 0`);
			}
		}
	}

	checkProcessingFee(customer) {
		let check_shipping_cost = false;
		let $processing_fee = null;

		switch (customer) {
			case 'Wholesale Customer':
				$processing_fee = $('.app-review-totals-view .cart-prices tbody tr:nth-child(3) td:last-child');
				check_shipping_cost = true;
				break;
			case 'General Customer':
				$processing_fee = $('.app-review-totals-view .cart-prices tbody tr:nth-child(2) td:last-child');
				check_shipping_cost = false;
				break;
		}

		if(check_shipping_cost) {
			$processing_fee.waitForDisplayed(30000, false, "Can't get processing fee");

			const processing_fee = parseFloat($processing_fee.getText().replace('$', ''));

			expect(processing_fee).to
				.equal(
					this.storage.shipping_cost,
					`Processing Fee (${processing_fee}) not equal Shipping Cost (${this.storage.shipping_cost})`
				);
		}
	}

	goToCheckoutPage() {
		const checkout_selector = 'a.btn-checkout';
		$(checkout_selector).scrollIntoView();
		browser.pause(500);
		this.click(checkout_selector);
		$('.checkout-page').waitForDisplayed(null,false,`Can't get checkout page`);

		this.storage.checkout_url = browser.getUrl();
	}

    getElement(elementName){
        switch(elementName){
            case "Top-bar":
                return this.navTop;
            case "Top-bar / Customer menu":
                return this.navTopCustomerMenu;
            case "Top-bar / Unlogged Customer menu":
                return this.navTopUnloggedCustomerMenu;
            case "Top-bar / Live Chat":
                return this.navTopLiveChatBtn;
            case "Top-bar / Cart menu":
                return this.navTopCartMenu;
            case "Top-bar / Spot Pricing":
                return this.navTopSpotPricing;
            case "Spot Pricing":
                return this.spotPricing;
            case "Spot Pricing / Close button":
                return this.spotPricingCloseBtn;
            case "Spot Pricing / View All Charts link":
                return this.spotPricingViewAllChartsLink;
            case "Spot Prices":
                return this.spotPrices;
            case "Nav-bar / Logo":
                return this.navBarHeaderLogoImg;
            case "Nav-bar / Phone":
                return this.navBarHeaderPhone;
            case "Nav-bar / Business-Hours / Day":
                return this.navBarHeaderBHDay;
            case "Nav-bar / Business-Hours / Time":
                return this.navBarHeaderBHTime;
            case "Company Info / Promo":
                return this.companyInfoPromo;
            case "Company Info / Title":
                return this.companyInfoPromoTitle;
            case "Footer / Copyrights":
                return this.footerCopyrights;
            case "Newsletter / Title":
                return this.newsletterTitle;
            case "Newsletter / Email field":
                return this.newsletterEmailField;
            case "Newsletter / Subscribe button":
                return this.newsletterSubscribeBtn;

                // Mobile
            case "Top-bar / Mobile Menu":
                return this.mobileMenu;
            case "Top-bar / Mobile Menu Toggle":
                return this.mobileMenuToggle;

        }
        return elementName;
    }

    isElementDisplayed(elementName) {
        $(this.getElement(elementName)).isDisplayed();
    }

    isSpotPricingLinkDisplayed(href) {
        $(this.spotPricingLink(href)).isDisplayed();
    }

    expectProductTable(productType) {
	    $(`${this.productTableItems(productType)}:last-child`).waitForDisplayed(null,false,`Can't get product table items by product type ${productType}`);

        $$(this.productTableItems(productType)).forEach(element => {
            this.expectProductTableItem(element);
        });
    }

	expectProductTableItemsPrices(count, productType) {
		this.click(this.productTabsLink(`/${productType}`));

		$$(this.productTableItems(productType)).forEach( (element, index) => {
		    let product_position = index + 1;
		    if(index <= count) {
			    element.$(`.js-cart-price`).waitForDisplayed(null,false,`Not loaded cart price by product position ${product_position}`);

			    this.expectProductTableItemLink(element,"/my/signin/?next=/");
            }
		});
	}

	expectProductTableItemsSellButton(count, productType) {
		this.click(this.productTabsLink(`/${productType}`));

		$$(this.productTableItems(productType)).forEach( (element, index) => {
			if(index <= count) {
				element.$(`td:nth-child(5) button[name="sell_add_to_cart"]`).isDisplayed();
			}
		});
    }

	checkSameProductPrices(count, productType, url, customer_type) {
		let spot_products;

		// Get Spot Products
		(function () {
			const url = '/my/api/2/spot-price';
			spot_products = makeAjax(url);
		}());

		const getProduct = url => {
			return makeAjax(url);
		};

		const calcCurrentPrice = (bid, weight, margin_percent, margin_money) => {
			const net_price = bid * weight;

			const current_price = net_price * ((margin_percent + 100) / 100) + (margin_money);

			// console.warn('current_price = (bid * weight) * ((margin_percent + 100) / 100) + (margin_money)');
			// console.warn(`${current_price} = (${bid} * ${weight}) * ((${margin_percent} + 100) / 100) + (${margin_money})`);

			return decimalAdjust('round', current_price, -2);
		};

		const getSpotProductBid = (spot_price_id) => {

			const spot_product = spot_products.find(item => spot_price_id === item.Id);

			return decimalAdjust('round', Number(spot_product.Bid), -2);
		};

		const getDomCurrentPrice = element => {
			const dom_price = element.$(`.price`).getAttribute('data-price').replace(',', '');

			return decimalAdjust('round', Number(dom_price), -2);
		};

		const getDomProductBid = element => {
			const bid = element.$(`.price`).getAttribute('data-bid').replace(',', '');

			return decimalAdjust('round', Number(bid), -2);
		};

		const getApiCurrentPrice = (bid, product, customer_type) => {
			switch(customer_type) {
				case "Not Logined Customer":
					return calcCurrentPrice(bid, product.weight, product.margin_percent, product.margin_money);
				case "General Customer":
					return calcCurrentPrice(bid, product.weight, product.margin_percent, product.margin_money);
				case "Wholesale Customer":
					return calcCurrentPrice(bid, product.weight, product.wprice_margin_percent, product.wprice_margin_money);
			}
		};

		this.reLoadPage();

		$$(this.productTableItems(productType)).forEach( (element, index) => {
			if(index <= count) {
				const prod_id = element.getAttribute('data-prodid');
				const link = url + prod_id;

				const product = getProduct(link);

				const bid = getSpotProductBid(product.spot_price_id);

				const current_price = getApiCurrentPrice(bid, product, customer_type);

				const dom_price = getDomCurrentPrice(element);

				const dom_bid = getDomProductBid(element);

				//If we get rounding error between server side end JS counting current price, then try to compare integer values
				if(current_price != dom_price) {
					console.error(`Error in category tab: "${productType}", product-id: "${prod_id}"\r\n Dom Current Price ${dom_price} (Bid: ${dom_bid}) not equal calculated api current price ${current_price} (Bid: ${bid})`);

					const int_current_price = parseInt(current_price);
					const int_dom_price = parseInt(dom_price);

					expect(int_current_price).to
						.equal(
							int_dom_price,
							`Error in category tab: "${productType}", product-id: "${prod_id}"\r\n Dom Current Price ${dom_price} (Bid: ${dom_bid}) not equal calculated api current price ${current_price} (Bid: ${bid})`
						);
				}
			}
		});
	}

	expectDateTimeSpotPricing(url) {
		let res = makeAjax(url).every(item => {
			const date = new Date(item.UpdatedAt);
			const hours = date.getHours();
			const minutes = date.getMinutes();
			const seconds = date.getSeconds();

            return (hours >= 0 && minutes >= 0 && seconds>=0);
        });

		expect(res).to.equal(
			true,
			"Expect date-time spot pricing not valid"
		);
    }
    getSpotPricesFromHeader() {

    	this.click('.js-spot-pricing-btn a');

		browser.pause(1000);

	    return browser.execute(spot_prices_selector => {
		    let prices = [];
		    document.querySelectorAll(`${spot_prices_selector}`).forEach(item => {
			    let price = item.textContent.replace(/,/g, '').split('Bid: $');
			    prices.push(price[1]);
		    });

		    return prices.filter(item => !!item).map(item => parseFloat(item));

	    }, this.spotPricingPrices());
    }
	expectSameSpotPricingInHeader(url_api) {
		const prices = this.getSpotPricesFromHeader();

		const pricing_prices = makeAjax(url_api).map(item => {
			return item.Bid;
		});

		prices.forEach(item => {
			expect(pricing_prices.includes(item)).to.equal(
				true,
				"Expect pricing not equal price in dom"
			);
		});
    }
    saveOrderNumber(customer) {

	    const $order_number = $('.app-confirmation .order-number');

	    $order_number.waitForDisplayed(30000);

	    const order_number = $order_number.getText().replace(/#/g, '');

	    switch (customer) {
		    case "Wholesale Customer":
			    this.storage['wholesale_customer_order_number'] = order_number;
			    break;
		    case "General Customer":
			    this.storage['general_customer_order_number'] = order_number;
			    break;
	    }

    }
	checkAccountOrdersShippingAndBillingAddresses(customer) {

		function titleCase(str) {
			let splitStr = str.toLowerCase().split(' ');
			for (var i = 0; i < splitStr.length; i++) {
				// You do not need to check if i is larger than splitStr length, as your for does that for you
				// Assign it back to the array
				splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
			}
			// Directly return the joined string
			return splitStr.join(' ');
		}

		const $ship_fname = $(`${this.accountOrdersApp()} span[rel='ship_fname']`);
		const $ship_lname = $(`${this.accountOrdersApp()} span[rel='ship_lname']`);

		const $ship_address = $(`${this.accountOrdersApp()} span[rel='ship_address']`);
		const $ship_city = $(`${this.accountOrdersApp()} span[rel='ship_city']`);
		const $ship_zip = $(`${this.accountOrdersApp()} span[rel='ship_zip']`);
		const $ship_country = $(`${this.accountOrdersApp()} span[rel='ship_country']`);

		const $bill_fname = $(`${this.accountOrdersApp()} span[rel='bill_fname']`);
		const $bill_lname = $(`${this.accountOrdersApp()} span[rel='bill_lname']`);

		const $bill_address = $(`${this.accountOrdersApp()} span[rel='bill_address']`);
		const $bill_city = $(`${this.accountOrdersApp()} span[rel='bill_city']`);
		const $bill_zip = $(`${this.accountOrdersApp()} span[rel='bill_zip']`);
		const $bill_country = $(`${this.accountOrdersApp()} span[rel='bill_country']`);


		$ship_fname.waitForDisplayed();
		$ship_lname.waitForDisplayed();
		$ship_address.waitForDisplayed();
		$ship_city.waitForDisplayed();
		$ship_zip.waitForDisplayed();
		$ship_country.waitForDisplayed();

		$bill_fname.waitForDisplayed();
		$bill_lname.waitForDisplayed();
		$bill_address.waitForDisplayed();
		$bill_city.waitForDisplayed();
		$bill_zip.waitForDisplayed();
		$bill_country.waitForDisplayed();

		// Shipping page text
		const ship_fname = titleCase($ship_fname.getText().replace(/ /g, ''));
		const ship_lname = titleCase($ship_lname.getText());
		const ship_address = $ship_address.getText();
		const ship_city = $ship_city.getText();
		const ship_zip = $ship_zip.getText();
		const ship_country = $ship_country.getText();

		// Billing page text
		const bill_fname = titleCase($bill_fname.getText().replace(/ /g, ''));
		const bill_lname = titleCase($bill_lname.getText());
		const bill_address = $bill_address.getText();
		const bill_city = $bill_city.getText();
		const bill_zip = $bill_zip.getText();
		const bill_country = $bill_country.getText();


		let user_data = configData.store.customer;

		switch (customer) {
			case "Wholesale Customer":
				user_data.fname = user_data.wholesale_customer.fname;
				user_data.lname = user_data.wholesale_customer.lname;
				break;
			case "General Customer":
				user_data.fname = user_data.general_customer.fname;
				user_data.lname = user_data.general_customer.lname;
				break;
		}

		// Shipping compare
		expect(ship_fname).to.equal(
			user_data.fname,
			`Expect account ship_fname: ${ship_fname} not equal user data fname: ${user_data.fname}`
		);

		expect(ship_lname).to.equal(
			user_data.lname,
			`Expect account ship_lname: ${ship_fname} not equal user data lname: ${user_data.lname}`
		);

		expect(ship_address).to.equal(
			user_data.address.street_address,
			`Expect account ship_address: ${ship_address} not equal user data street_address: ${user_data.address.street_address}`
		);

		expect(ship_city).to.equal(
			user_data.address.city,
			`Expect account ship_city: ${ship_city} not equal user data city: ${user_data.address.city}`
		);

		expect(ship_zip).to.equal(
			user_data.address.zip,
			`Expect account ship_zip: ${ship_zip} not equal user data zip: ${user_data.address.zip}`
		);

		expect(ship_country).to.equal(
			user_data.address.country_id.option,
			`Expect account ship_country: ${ship_country} not equal user data country: ${user_data.address.country_id.option}`
		);


		// Billing compare
		expect(bill_fname).to.equal(
			user_data.fname,
			`Expect account bill_fname: ${bill_fname} not equal user data fname: ${user_data.fname}`
		);

		expect(bill_lname).to.equal(
			user_data.lname,
			`Expect account bill_lname: ${bill_fname} not equal user data lname: ${user_data.lname}`
		);

		expect(bill_address).to.equal(
			user_data.address.street_address,
			`Expect account bill_address: ${bill_address} not equal user data street_address: ${user_data.address.street_address}`
		);

		expect(bill_city).to.equal(
			user_data.address.city,
			`Expect account bill_city: ${bill_city} not equal user data city: ${user_data.address.city}`
		);

		expect(bill_zip).to.equal(
			user_data.address.zip,
			`Expect account bill_zip: ${bill_zip} not equal user data zip: ${user_data.address.zip}`
		);

		expect(bill_country).to.equal(
			user_data.address.country_id.option,
			`Expect account bill_country: ${bill_country} not equal user data country: ${user_data.address.country_id.option}`
		);
	}
	checkAccountOrdersProductsPrices() {
		const order_products = `${this.accountOrdersApp()} .product-table tbody .order-item`;

		$(`${order_products}:last-child`).waitForDisplayed();

		const getOrderProductSpotPrice = element => {
			const spot_price_element = element.$('.prodname .product-options li:last-child span');
			spot_price_element.waitForDisplayed();

			return parseFloat((spot_price_element.getText().replace(/,/g, '').split('$'))[1]);
		};

		const getOrderProductPremium = element => {
			let premium = null;

			const premium_element = element.$('.prodname .product-options li:first-child span');
			premium_element.waitForDisplayed();

			const text = premium_element.getText();

			if(/\$/i.test(text)) {
				premium = parseFloat((text.replace(/,/g, '').split('$'))[1]);
			} else {
				premium = text.trim();
			}

			return premium;
		};

		const getOrderProductPrice = element => {
			const price_element = element.$('.unit-price');
			price_element.waitForDisplayed();

			return parseFloat((price_element.getText().replace(/,/g, '').split('$'))[1]);
		};


		$$(order_products).forEach( element => {
			const prod_id = element.getAttribute('data-order-id');

			const review_product = this.storage[`product_review_${prod_id}`];

			const spot_price = getOrderProductSpotPrice(element);

			const premium = getOrderProductPremium(element);

			const price = getOrderProductPrice(element);

			expect(review_product.spot_price).to.equal(
				spot_price,
				`Expect product id: ${prod_id} spot price ${spot_price} not equal review spot price ${review_product.spot_price}`
			);

			expect(review_product.premium).to.equal(
				premium,
				`Expect product id: ${prod_id} product premium ${premium} not equal review product premium ${review_product.premium}`
			);

			expect(review_product.price).to.equal(
				price,
				`Expect product id: ${prod_id} unit price ${price} not equal review product price ${review_product.price}`
			);

		});

	}
	saveListOfProductsAndTheirPrices() {
		const cart_product_selector = '.app-review-products-view .cart-products .cart-product';

		$(cart_product_selector).waitForDisplayed();

		const getProductSpotPrice = element => {
			const spot_price_element = element.$('.app-review-products-view .cart-product-data-list li:last-child');
			spot_price_element.waitForDisplayed();

			return parseFloat((spot_price_element.getText().replace(/,/g, '').split('$'))[1]);
		};

		const getProductPremium = element => {
			let premium = null;

			const premium_element = element.$('.app-review-products-view .cart-product-data-list li:first-child');
			premium_element.waitForDisplayed();

			const text = premium_element.getText();

			if(/\$/i.test(text)) {
				premium = parseFloat((text.replace(/,/g, '').split('$'))[1]);
			} else {
				premium = ((text.replace(/%/g, '').split(':'))[1]).trim();
			}

			return premium;
		};

		const getProductPrice = element => {
			const price_element = element.$('.cart-product-price span');
			price_element.waitForDisplayed();

			return parseFloat((price_element.getText().replace(/,/g, '').split('$'))[1]);
		};

		$$(cart_product_selector).forEach( element => {
			const prod_id = element.getAttribute('data-prodid');

			const spot_price = getProductSpotPrice(element);

			const premium = getProductPremium(element);

			const price = getProductPrice(element);

			this.storage[`product_review_${prod_id}`] = {
				spot_price: spot_price,
				premium: premium,
				price: price
			};
		});
	}
    compareSpotPricesInHeaderAndInBasketForProducts() {
    	const cart_product_selector = '.cart-products .cart-product';
	    const spot_prices = this.getSpotPricesFromHeader();

	    $(cart_product_selector).waitForDisplayed();

	    const getBasketProductSpotPrice = element => {
		    const spot_price_element = element.$('.cart-product-data-list li:last-child b');
		    spot_price_element.waitForDisplayed();

	    	return parseFloat((spot_price_element.getText().replace(/,/g, '').split('$'))[1]);
	    };

	    $$(cart_product_selector).forEach( element => {
		    const prod_id = element.getAttribute('data-prodid');

		    const spot_price = getBasketProductSpotPrice(element);

		    const compare_result = spot_prices.includes(spot_price);

		    if(!compare_result) {
			    console.log('spot_prices ', spot_prices);
			    console.log('spot_price ', spot_price);
		    }
		    expect(compare_result).to.equal(
			    true,
			    `Expect product id: ${prod_id} spot price ${spot_price} not equal header spot prices array ${spot_prices}`
		    );
	    });

    }
	checkBasketUpdateCounterMessage(delay) {
		$('.toast-notification').waitForDisplayed(delay);
	}
    expectProductTableItem(element) {
        const classes = element.getAttribute("className").split(" ");
        if( classes.includes("no-spot-price") ) {
            this.expectProductTableItemImg(element);
            this.expectProductTableItemName(element);
            //this.expectProductTableItemLink(element,"tel:1 (800) 852-6884");
        } else {
            this.expectProductTableItemImg(element);
            this.expectProductTableItemName(element);
            //this.expectProductTableItemLink(element,"/my/signin/?next=/");
        }
    }
    expectProductTableItemImg(item) {
        const img = item.$(`td:nth-child(1) img`);
        const imgSelector = `${item.selector}:nth-child(${item.index+1}) ${img.selector}`;
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        const itemprop = img.getAttribute('itemprop');
        
        img.moveTo();
        item.$(`td:nth-child(1) img.b-loaded`).waitForDisplayed(null,false,`Not loaded image ${src} with alt "${alt}"`);
        //this.expectBlankJpg(src,`Blank img ${imgSelector}`);
        this.expectItemprop(itemprop,"image",`Wrong itemprop for ${imgSelector}`);
    }
    expectProductTableItemName(item) {
        const span = item.$(`td:nth-child(2) span`);
        const spanSelector = `${item.selector}:nth-child(${item.index+1}) ${span.selector}`;
        const itemprop = span.getAttribute('itemprop');
        this.expectItemprop(itemprop,"name",`Wrong itemprop for ${spanSelector}`);
    }

    expectProductTableItemLink(item,href) {
        const a = item.$(`td:nth-child(5) a[href="${href}"]`);
        expect(a.isDisplayed()).to
            .equal(
                true,
                `Expected element "${item.selector}:nth-child(${item.index+1}) ${a.selector}" to be displayed`
            );
    }
    /*
    expectBlankJpg(text,errorMessage) {
        expect(text).to.not
            .equal(
                '/assets/i/blank.jpg',
                errorMessage || `Expected the text to equal "/assets/i/blank.jpg"`
            );
    }*/
    expectItemprop(text,equalText,errorMessage) {
        expect(text).to
            .equal(
                equalText,
                errorMessage || `Expected the text "${text}" to not equal "${equalText}"`
            );
    }
}

export default new SitePage();