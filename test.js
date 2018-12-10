'use strict';

const blockComment = require('.');
const test = require('tape');

test(description, function(t) {
  t.equal(blockComment('a'), [
    '/*',
    ' * a',
    '*/'
  ].join('\n'), 'should create a comment from a string.');

  t.equal(blockComment('a\nb\nc'), [
    '/*',
    ' * a',
    ' * b',
    ' * c',
    '*/'
  ].join('\n'), 'should return a multi-line comment.');

  t.equal(blockComment('a\nb\r\nc'), [
    '/*',
    ' * a',
    ' * b',
    ' * c',
    '*/'
  ].join('\n'), 'should normalize newlines.');

  t.equal(blockComment(['a', 'b']), [
    '/*',
    ' * a',
    ' * b',
    '*/'
  ].join('\n'), 'should create a comment from an array.');

  t.equal(blockComment(''), [
    '/*',
    ' *',
    '*/'
  ].join('\n'), 'should accept an empty string.');

  t.equal(blockComment([]), [
    '/*',
    '*/'
  ].join('\n'), 'should accept an empty array.');

  t.equal(blockComment('a\nb', {start: '!'}), [
    '/*!',
    ' * a',
    ' * b',
    '*/'
  ].join('\n'), 'should prepend a string using `start` option.');

  blockComment.open = 'a';
  blockComment.linePrefix = 'b';
  blockComment.close = 'c';

  t.equal(blockComment(''), [
    'a',
    'b',
    'c'
  ].join('\n'), 'should modify template using its properties.');

  t.throws(
    blockComment.bind(null, 123),
    /TypeError/,
    'should throw an error when the first argument is not a string or an array.'
  );

  t.throws(
    () => blockComment('a', {start: 'b\n'}),
    /must not include newline/u,
    'should throw an error when `start` option includes \'\\n\'.'
  );

  t.throws(
    () => blockComment('a', {start: 'b\r\n'}),
    /must not include newline/u,
    'should throw an error when `start` option includes \'\\r\\n\'.'
  );
});
