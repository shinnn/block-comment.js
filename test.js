'use strict';

const blockComment = require('.');
const test = require('tape');

test('blockComment()', t => {
	t.equal(blockComment('a'), `/*
 * a
*/`, 'should return a comment from a string.');

	t.equal(blockComment('a\nb\nc'), `/*
 * a
 * b
 * c
*/`, 'should return a multiline comment.');

	t.equal(blockComment('a\nb\r\nc'), `/*
 * a
 * b
 * c
*/`, 'should normalize newlines.');

	t.equal(blockComment(''), `/*
 *
*/`, 'should accept an empty string.');

	t.equal(blockComment('a\nb', {start: '!'}), `/*!
 * a
 * b
*/`, 'should prepend a string using `start` option.');

	t.throws(
		() => blockComment(1),
		/^TypeError.*Expected a <string> of block comment content, but got a non-string value 1 \(number\)\./u,
		'should throw an error when the first argument is not a string or an array.'
	);

	t.throws(
		() => blockComment('a', {start: true}),
		/^TypeError.*Expected `start` option to be a <string>, but got a non-string value true \(boolean\)\./u,
		'should throw an error when `start` option is not a string.'
	);

	t.throws(
		() => blockComment('a', {start: 'b\n'}),
		/^Error.*start option must not include newlines\./u,
		'should throw an error when `start` option includes \'\\n\'.'
	);

	t.throws(
		() => blockComment('a', {start: 'b\r\n'}),
		/^Error.*start option must not include newlines\./u,
		'should throw an error when `start` option includes \'\\r\\n\'.'
	);

	t.end();
});
