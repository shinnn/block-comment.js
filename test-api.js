'use strict';

var test = require('tape');

function runTest(description, main) {
  test(description, function(t) {
    t.plan(11);

    t.equal(main('a'), [
      '/*',
      ' * a',
      '*/'
    ].join('\n'), 'should create a comment from a string.');

    t.equal(main('a\nb\nc'), [
      '/*',
      ' * a',
      ' * b',
      ' * c',
      '*/'
    ].join('\n'), 'should return a multi-line comment.');

    t.equal(main('a\nb\r\nc'), [
      '/*',
      ' * a',
      ' * b',
      ' * c',
      '*/'
    ].join('\n'), 'should normalize newlines.');

    t.equal(main(['a', 'b']), [
      '/*',
      ' * a',
      ' * b',
      '*/'
    ].join('\n'), 'should create a comment from an array.');

    t.equal(main(''), [
      '/*',
      ' *',
      '*/'
    ].join('\n'), 'should accept an empty string.');

    t.equal(main([]), [
      '/*',
      '*/'
    ].join('\n'), 'should accept an empty array.');

    t.equal(main('a\nb', {start: '!'}), [
      '/*!',
      ' * a',
      ' * b',
      '*/'
    ].join('\n'), 'should prepend a string using `start` option.');

    main.open = 'a';
    main.linePrefix = 'b';
    main.close = 'c';

    t.equal(main(''), [
      'a',
      'b',
      'c'
    ].join('\n'), 'should modify template using its properties.');

    t.throws(
      main.bind(null, 123),
      /TypeError/,
      'should throw an error when the first argument is not a string or an array.'
    );

    t.throws(
      main.bind(null, 'a', {start: 'b\n'}),
      /must not include newline/,
      'should throw an error when `start` option includes \'\\n\'.'
    );

    t.throws(
      main.bind(null, 'a', {start: 'b\r\n'}),
      /must not include newline/,
      'should throw an error when `start` option includes \'\\r\\n\'.'
    );
  });
}

runTest('require(\'block-comment\')', require('./'));

global.window = {};

var bowerMain = require('./bower.json').main;
require('./' + bowerMain);

runTest('window.blockComment', window.blockComment);
