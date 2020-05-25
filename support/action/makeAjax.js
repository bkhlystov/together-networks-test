module.exports = (url, method, params) => {
	let _method = method || 'GET';
	let _params = params ? formatParams( params ) : '';
	let _url = _params ? url + "?" + _params : url;

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
		}
	}, _url, _method, _params);

	return JSON.parse(result);
};
