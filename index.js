'use strict';

var appendType = require('append-type');

/*!
 * block-comment | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/block-comment
*/

function blockComment(lines, option) {
	if (typeof lines !== 'string') {
		throw new TypeError('Expected a <string> of block comment content, but got ' + appendType(lines) + '.');
	}

	lines = lines.split(/\r?\n/);
	option = option || {};

	var content = '';

	for (var i = 0; i < lines.length; i++) {
		var prefix = blockComment.linePrefix;
		if (lines[i] !== '') {
			prefix += ' ';
		}

		content += prefix + lines[i] + '\n';
	}

	var start = '';

	if (option.start !== undefined) {
		if (/\r?\n/.test(option.start)) {
			throw new Error('start option must not include newlines.');
		}

		start = option.start;
	}

	return blockComment.open + start + '\n' + content + blockComment.close;
}

blockComment.open = '/*';
blockComment.linePrefix = ' *';
blockComment.close = '*/';

module.exports = blockComment;
