module.exports = {
    users: {
        "Wholesale Customer": {
            email: "bx-s2u-qa+wholesaler@4ib.com",
            password: "8475thd9834th3b76rh"
        },
        "General Customer": {
            email: "bx-s2u-qa+general+customer@4ib.com",
            password: "4857tyjd875th2d385td"
        },
        "CRM User": {
            email: "bx-s2u-qa+crm@4ib.com",
            password: "98475fyhd3578thfd34"
        },
		"Test User": {
            username: "Fakeson",
            password: "Qwertyu123456"
		}
    },
	store: {
    	user: {
            name: "Testy Fakeson",
            email: "test-email@exemple.com",
            type_console: "xbox"
		},
		customer: {
			wholesale_customer: {
				fname: 'Wholesaler',
				lname: 'Test Customer',
				email: "bx-s2u-qa+wholesaler@4ib.com"
			},
			general_customer: {
				fname: 'General',
				lname: 'Test Customer',
				email: "bx-s2u-qa+general+customer@4ib.com"
			},
			address: {
				country_id: {
					option: 'United States'
				},
				state_id: {
					option: 'New York'
				},
				city: 'The Bronx',
				zip: '10457',
				street_address: '544 East 171st Street',
				street_address1: '47',
				company: 'Bullion Exchange',
				phone: '+16505388633'
			},
			card: {
				name_as_printed: 'Matthew Perry',
				card_number: '4111111111111111',
				expiration_year: {
					option: '25'
				},
				expiration_month: '12',
				cvv: '123'
			}
		}
	},
    emailCredentials: {
        "...": {
            password: "...",
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false
            }
        }
    }
};