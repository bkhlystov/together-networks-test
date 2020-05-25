import Test from '../test';
import openWebsite from '../../support/action/openWebsite';

// More details about page object you can read in this guide: https://webdriver.io/docs/pageobjects.html

class CrmPage extends Test {
	constructor() {
		super();
		this.TIMEOUT = 30000;
	}

	changeOrderStatusAndCheckEmail(order_status, email_name) {
		const change_status_btn = '.js-page-buttons .js-order-status .js-btn-order-status';
		const order_status_dropdown_menu_link = `.js-order-status-dropdown-menu .dropdown-menu a[data-name="${order_status}"]`;
		const sent_email = '.js-order-emails .js-sent-email-list  table tbody tr:first-child td:first-child';

		$(change_status_btn).waitForDisplayed(this.TIMEOUT);

		this.click(change_status_btn);

		$(order_status_dropdown_menu_link).waitForDisplayed(this.TIMEOUT);

		this.clickAndWaitAjax(order_status_dropdown_menu_link, this.TIMEOUT);

		browser.refresh();

		$(sent_email).waitForDisplayed(this.TIMEOUT);

		const order_sent_email_name = $(sent_email).getText();

		expect(email_name).to
			.equal(
				order_sent_email_name,
				`In order expect email_name: ${email_name} not equal grid order_sent_email_name: ${order_sent_email_name}`
			);
	}

	checkProductsSummary() {
		const products = '.app-orders-products .order-summary-products .table-products tbody .product';

		this.click(".appholder-content a.list-group-item[data-caption='Summary']");

		$(`${products}:last-child`).waitForDisplayed(this.TIMEOUT);

		const getProductId = element => {
			const url = element.$('.name div:first-child a').getAttribute('href');
			return (url.match(/[-0-9a-f]+$/g))[0];
		};

		const getOrderProductSpotPrice = element => {
			const spot_price_element = element.$('.price:nth-child(4) span');
			spot_price_element.waitForDisplayed();

			return parseFloat((spot_price_element.getText().replace(/,/g, '').split('$'))[1]);
		};

		const getOrderProductPremium = element => {
			let premium = null;

			const premium_element = element.$('.price:nth-child(3) span');
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
			const price_element = element.$('.price:nth-child(5)');
			price_element.waitForDisplayed();

			return parseFloat((price_element.getText().replace(/,/g, '').split('$'))[1]);
		};

		$$(products).forEach( element => {
			const prod_id = getProductId(element);

			//TODO uncoment when strat tests on jenkins (first need pased tests WholesalerCheckoutProcess.feature)
			// const review_product = this.storage[`product_review_${prod_id}`];
			//
			// const spot_price = getOrderProductSpotPrice(element);
			//
			// const premium = getOrderProductPremium(element);
			//
			// const price = getOrderProductPrice(element);
			//
			// expect(review_product.spot_price).to.equal(
			// 	spot_price,
			// 	`Expect product id: ${prod_id} crm spot price ${spot_price} not equal review spot price ${review_product.spot_price}`
			// );
			//
			// expect(review_product.premium).to.equal(
			// 	premium,
			// 	`Expect product id: ${prod_id} crm product premium ${premium} not equal review product premium ${review_product.premium}`
			// );
			//
			// expect(review_product.price).to.equal(
			// 	price,
			// 	`Expect product id: ${prod_id} crm unit price ${price} not equal review product price ${review_product.price}`
			// );
		});


		this.click(".appholder-content a.list-group-item[data-caption='Emails']");
		$('.js-order-emails .js-sent-email-list').waitForDisplayed(this.TIMEOUT);
	}

	checkOrderEmail(email_name) {
		this.click(".appholder-content a.list-group-item[data-caption='Emails']");

		const order_confirmation = `.js-order-emails .js-sent-email-list table tbody tr:first-child td:first-child`;

		$(order_confirmation).waitForDisplayed(this.TIMEOUT);

		const order_confirmation_email_name = $(order_confirmation).getText();

		expect(email_name).to
			.equal(
				order_confirmation_email_name,
				`In order expect email_name: ${email_name} not equal grid order_confirmation_email_name: ${order_confirmation_email_name}`
			);
	}

	checkOrderEmails(email_name_1, email_name_2) {
		this.click(".appholder-content a.list-group-item[data-caption='Emails']");

		const sent_email_list = '.js-order-emails .js-sent-email-list';

		const order_shipment_labels = `${sent_email_list} table tbody tr:first-child td:first-child`;
		const order_confirmation = `${sent_email_list} table tbody tr:last-child td:first-child`;

		$(order_shipment_labels).waitForDisplayed(this.TIMEOUT);
		$(order_confirmation).waitForDisplayed(this.TIMEOUT);

		const order_shipment_labels_email_name = $(order_shipment_labels).getText();
		const order_confirmation_email_name = $(order_confirmation).getText();

		expect(email_name_1).to
			.equal(
				order_confirmation_email_name,
				`In order expect email_name_1: ${email_name_1} not equal grid order_confirmation_email_name: ${order_confirmation_email_name}`
			);

		expect(email_name_2).to
			.equal(
				order_shipment_labels_email_name,
				`In order expect email_name_2: ${email_name_2} not equal grid order_shipment_labels_email_name: ${order_shipment_labels_email_name}`
			);
	}

	goToOrderAndCheckOrderDataInGrid(customer, payment_method, order_status) {
		let order_number = null;
		const filter_btn = '.grid-table-wrapper .open-filters-btn';
		const order_num_field_from = '.filters input[filtername="order_ref_number_site_from"]';
		const order_num_field_to = '.filters input[filtername="order_ref_number_site_to"]';
		const btn_start_filters = '.js-filter-actions button[name="start_filters"]';

		const grid_edit_order_btn = '.grid-table-wrapper tbody tr:first-child .action button[name="edit"]';
		const grid_cutomer_fname = '.grid-table-wrapper tbody tr:first-child td:nth-child(3)';
		const grid_cutomer_lname = '.grid-table-wrapper tbody tr:first-child td:nth-child(4)';
		const grid_cutomer_email = '.grid-table-wrapper tbody tr:first-child td:nth-child(5)';
		const grid_total = '.grid-table-wrapper tbody tr:first-child td:nth-child(8) span';
		const grid_shipping_method = '.grid-table-wrapper tbody tr:first-child td:nth-child(9)';
		const grid_status = '.grid-table-wrapper tbody tr:first-child td:nth-child(10) span';
		const grid_payment_method = '.grid-table-wrapper tbody tr:first-child td:nth-child(11)';

		//TODO uncoment when start all tests
		// $(filter_btn).waitForDisplayed();
		//
		// this.click(filter_btn);
		//
		// switch (customer) {
		// 	case "Wholesale Customer":
		// 		order_number = this.storage['wholesale_customer_order_number'];
		// 		break;
		// 	case "General Customer":
		// 		order_number = this.storage['general_customer_order_number'];
		// 		break;
		// }
		//
		// this.clearAndSetValue(order_num_field_from, order_number);
		// this.clearAndSetValue(order_num_field_to, order_number);
		//
		// this.clickAndWaitAjax(btn_start_filters);

		//TODO temporary Check last order
		$('.grid-table-wrapper th[fieldname="order_date"]').waitForDisplayed();
		this.clickAndWaitAjax('.grid-table-wrapper th[fieldname="order_date"]');

		browser.pause(1500);

		$(grid_cutomer_fname).waitForDisplayed(this.TIMEOUT);
		$(grid_cutomer_lname).waitForDisplayed(this.TIMEOUT);
		$(grid_cutomer_email).waitForDisplayed(this.TIMEOUT);
		$(grid_total).waitForDisplayed(this.TIMEOUT);
		$(grid_shipping_method).waitForDisplayed(this.TIMEOUT);
		$(grid_status).waitForDisplayed(this.TIMEOUT);
		$(grid_payment_method).waitForDisplayed(this.TIMEOUT);

		const cutomer_fname_text = $(grid_cutomer_fname).getText();
		const cutomer_lname_text = $(grid_cutomer_lname).getText();
		const cutomer_email_text = $(grid_cutomer_email).getText();
		const total_price_text = $(grid_total).getText().replace(/,/g, '').replace(/\$/g, '');
		const shipping_method_text = $(grid_shipping_method).getText();
		const order_status_text = $(grid_status).getText();
		const payment_method_text = $(grid_payment_method).getText();

		const wholesale_customer = configData.store.customer.wholesale_customer;

		expect(cutomer_fname_text).to
			.equal(
				wholesale_customer.fname,
				`In order #${order_number} expect configData fname: ${wholesale_customer.fname} not equal grid fname: ${cutomer_fname_text}`
			);

		expect(cutomer_lname_text).to
			.equal(
				wholesale_customer.lname,
				`In order #${order_number} expect configData lname: ${wholesale_customer.lname} not equal grid lname: ${cutomer_lname_text}`
			);

		expect(cutomer_email_text).to
			.equal(
				wholesale_customer.email,
				`In order #${order_number} expect configData email: ${wholesale_customer.lname} not equal grid email: ${cutomer_email_text}`
			);

		expect(payment_method).to
			.equal(
				payment_method_text,
				`In order #${order_number} expect payment method ${payment_method} not equal grid payment method  ${payment_method_text}`
			);

		expect(order_status).to
			.equal(
				order_status_text,
				`In order #${order_number} expect order status text ${order_status} not equal grid order status ${order_status_text}`
			);

		this.clickAndWaitAjax(grid_edit_order_btn);

		$(".appholder-content a.list-group-item[data-caption='Customer']").waitForDisplayed(this.TIMEOUT);

		this.click(".appholder-content a.list-group-item[data-caption='Customer']");
	}

	checkContactInfoAndCustomerInfo() {
		const contact_info = '.js-contact .js-view';
		const customer_info = '.js-customer';

		$(contact_info).waitForDisplayed(this.TIMEOUT);
		$(customer_info).waitForDisplayed(this.TIMEOUT);

		const contact_info_full_name = $(`${contact_info} strong`).getText();
		const contact_info_email = $(`${contact_info} > a`).getText();

		const customer_info_full_name = $(`${customer_info} strong`).getText();
		const customer_info_email = $(`${customer_info} a`).getText();


		const user_data = configData.store.customer.wholesale_customer;

		const user_full_name = `${user_data.fname} ${user_data.lname}`;
		const user_email = user_data.email;

		expect(contact_info_full_name).to
			.equal(
				user_full_name,
				`Customer App contact info full name: ${contact_info_full_name} not equal configData info full name: ${user_full_name}`
			);

		expect(contact_info_email).to
			.equal(
				user_email,
				`Customer App contact info email: ${contact_info_email} not equal configData info email: ${user_email}`
			);



		expect(customer_info_full_name).to
			.equal(
				user_full_name,
				`Customer App customer info full name: ${customer_info_full_name} not equal configData info full name: ${user_full_name}`
			);

		expect(customer_info_email).to
			.equal(
				user_email,
				`Customer App customer info email: ${customer_info_email} not equal configData info email: ${user_email}`
			);
	}

	checkShippingAddresses() {
		const shipping = '.order-customer-placeholder .js-shipping';
		const shipping_edit_btn = `${shipping} .js-view .buttons button[name="edit"]`;
		const shipping_edit = `${shipping} .js-edit`;

		$(shipping_edit_btn).waitForDisplayed(this.TIMEOUT);
		this.click(shipping_edit_btn);

		$(shipping_edit).waitForDisplayed(this.TIMEOUT);

		const ship_fname = $(`${shipping_edit} .flat input[name="ship_fname"]`).getValue();
		const ship_lname = $(`${shipping_edit} .flat input[name="ship_lname"]`).getValue();
		const ship_address = $(`${shipping_edit} .flat input[name="ship_address"]`).getValue();
		const ship_city = $(`${shipping_edit} .flat input[name="ship_city"]`).getValue();
		const ship_zip = $(`${shipping_edit} .flat input[name="ship_zip"]`).getValue();


		const customer_address = configData.store.customer.address;
		const wholesale_customer = configData.store.customer.wholesale_customer;

		expect(wholesale_customer.fname).to
			.equal(
				ship_fname,
				`Customer App shipping Address fname: ${ship_fname} not equal configData fname: ${wholesale_customer.fname}`
			);

		expect(wholesale_customer.lname).to
			.equal(
				ship_lname,
				`Customer App shipping Address lname: ${ship_fname} not equal configData lname: ${wholesale_customer.lname}`
			);

		expect(customer_address.street_address).to
			.equal(
				ship_address,
				`Customer App shipping Address ship_address: ${ship_address} not equal configData ship_address: ${customer_address.street_address}`
			);

		expect(customer_address.city).to
			.equal(
				ship_city,
				`Customer App shipping Address ship_city: ${ship_city} not equal configData city: ${customer_address.city}`
			);

		expect(customer_address.zip).to
			.equal(
				ship_zip,
				`Customer App shipping Address ship_zip: ${ship_zip} not equal configData city: ${customer_address.zip}`
			);
	}

	checkBillingAddresses() {
		const billing = '.order-customer-placeholder .js-billing';
		const billing_edit_btn = `${billing} .js-view .buttons button[name="edit"]`;
		const billing_edit = `${billing} .js-edit`;

		$(billing_edit_btn).waitForDisplayed(this.TIMEOUT);
		this.click(billing_edit_btn);

		$(billing_edit).waitForDisplayed(this.TIMEOUT);

		const bill_fname = $(`${billing_edit} .js-billing-info-form input[name="bill_fname"]`).getValue();
		const bill_lname = $(`${billing_edit} .js-billing-info-form input[name="bill_lname"]`).getValue();
		const bill_address = $(`${billing_edit} .js-billing-info-form input[name="bill_address"]`).getValue();
		const bill_city = $(`${billing_edit} .js-billing-info-form input[name="bill_city"]`).getValue();
		const bill_zip = $(`${billing_edit} .js-billing-info-form input[name="bill_zip"]`).getValue();


		const customer_address = configData.store.customer.address;
		const wholesale_customer = configData.store.customer.wholesale_customer;

		expect(wholesale_customer.fname).to
			.equal(
				bill_fname,
				`Customer App billing Address fname: ${bill_fname} not equal configData fname: ${wholesale_customer.fname}`
			);

		expect(wholesale_customer.lname).to
			.equal(
				bill_lname,
				`Customer App billing Address lname: ${bill_fname} not equal configData lname: ${wholesale_customer.lname}`
			);

		expect(customer_address.street_address).to
			.equal(
				bill_address,
				`Customer App billing Address bill_address: ${bill_address} not equal configData bill_address: ${customer_address.street_address}`
			);

		expect(customer_address.city).to
			.equal(
				bill_city,
				`Customer App billing Address bill_city: ${bill_city} not equal configData city: ${customer_address.city}`
			);

		expect(customer_address.zip).to
			.equal(
				bill_zip,
				`Customer App billing Address bill_zip: ${bill_zip} not equal configData city: ${customer_address.zip}`
			);


	}
}

export default new CrmPage();