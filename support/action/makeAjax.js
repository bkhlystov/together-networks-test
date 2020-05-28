/**
 * Method make Ajax request
 * @param url String
 * @param method String (GET || POST || PUT || DELETE)
 * @param params Object ({key: value})
 * @return Object
 */
module.exports = (url, method, body) => {
	let _method = method || 'GET';
	let _body = (_method === 'GET' && body && Object.keys(body).length) ? formatParams( body ) : body;
	let _url = (_body && _method === 'GET') ? url + "?" + _body : url;

	function formatParams( body ){
		return "?" + Object.keys(body)
			.map(key => {
				return key+"="+encodeURIComponent(body[key]);
			})
			.join("&");
	}

	// Execute code which takes a long time
	const result = browser.executeAsync(function(url, method, body, done) {
		let http = new XMLHttpRequest();

		http.onload = () => {
			done(http.responseText);
		};

		http.open(method, url, true);

		const json_body = (body && Object.keys(body).length) ? JSON.stringify(body) : null;

		switch (method) {
			case 'GET':
				http.send(null);
				break;
			case 'POST':
                http.setRequestHeader("content-type", "application/json");
				http.send(json_body);
				break;
            case 'PUT':
                http.setRequestHeader("content-type", "application/json");
                http.send(json_body);
                break;
            case 'DELETE':
                http.send(null);
                break;
		}
	}, _url, _method, _body);

	return JSON.parse(result);
};
