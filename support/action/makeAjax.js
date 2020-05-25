/**
 * Method make Ajax request
 * @param url String
 * @param method String (GET || POST || PUT || DELETE)
 * @param params Object ({key: value})
 * @return Object
 */
module.exports = (url, method, params) => {
	let _method = method || 'GET';
	let _params = (method === 'GET' && params && typeof params === 'object' ) ? formatParams( params ) : params;
	let _url = (_params && typeof _params !== 'object') ? url + "?" + _params : url;

	function formatParams( params ){
		return "?" + Object.keys(params)
			.map(key => {
				return key+"="+encodeURIComponent(params[key]);
			})
			.join("&");
	}

	// Execute code which takes a long time
	const result = browser.executeAsync((url, method, params, done) => {
		let http = new XMLHttpRequest();

		http.onload = () => {
			done(http.responseText);
		};

		http.open(method, url, true);

		switch (method) {
			case 'GET':
				http.send(null);
				break;
			case 'POST':
				http.send(params);
				break;
            case 'PUT':
                http.send(params);
                break;
            case 'DELETE':
                http.send(null);
                break;
		}
	}, _url, _method, _params);

	return JSON.parse(result);
};
