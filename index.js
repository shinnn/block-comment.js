'use strict';

var appendType = require('append-type');

/*!
 * block-comment | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/block-comment
*/

module.exports = function blockComment(str, option) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a <string> of block comment content, but got a non-string value ' + appendType(str) + '.');
	}

	option = option || {};

	var start;

	if (option.start !== undefined) {
		if (typeof option.start !== 'string') {
			throw new TypeError('Expected `start` option to be a <string>, but got a non-string value ' + appendType(option.start) + '.');
		}

		if (/\r?\n/.test(option.start)) {
			throw new Error('start option must not include newlines.');
		}

		start = option.start;
	} else {
		start = '';
	}

	var lines = str.split(/\r?\n/);
	var content = '';

	for (var i = 0; i < lines.length; i++) {
		content += ' *' + (lines[i].length === 0 ? '' : ' ') + lines[i] + '\n';
	}

	return '/*' + start + '\n' + content + '*/';
}
