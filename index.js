var data = require('./data');

function filter (value) {
	return function (band) {
		return band.min <= value && value <= band.max;
	};
}

function toFixed (value, precision) {
	if (precision == null) precision = 2;

	var power = Math.pow(10, precision);
	var fixed = (Math.round(value * power) / power).toFixed(precision);
	return parseFloat(fixed);
}

function first (array, filter) {
	var i, length;
	for (i = 0, length = array.length; i < length; i += 1)
		if (filter.call(array, array[i]) === true)
			return array[i];
}

module.exports = function (state, value) {
	if (state == null) state = 'nsw';
	if (value == null) value = 0;

	var bands = data[state.toLowerCase()];
	var band = first(bands, filter(value));
	var duty = band.base + (value - (band.over || band.min)) * (band.rate / 100);

	return toFixed(duty);
};
