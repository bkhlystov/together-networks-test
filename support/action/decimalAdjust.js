/**
 * Decimal rounding adjustment (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/round).
 *
 * @param {String}  type Adjustment type. (round, floor, ceil)
 * @param {Number}  value Число.
 * @param {Integer} exp   Exponent (decimal logarithm of the basis of adjustment).
 * @returns {Number} Adjusted value.
 */
module.exports = (type, value, exp) => {

	// 	If the degree is not defined, or is equal to zero...
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number, or the degree is not an integer...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Bit shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Reverse shift
	value = value.toString().split('e');
	return Number(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
};
