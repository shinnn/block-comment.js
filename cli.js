#!/usr/bin/env node
'use strict';

var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    s: 'start',
    h: 'help',
    v: 'version'
  },
  string: ['_', 'start'],
  boolean: ['help', 'version']
});

function help() {
  var sumUp = require('sum-up');
  var yellow = require('chalk').yellow;

  var pkg = require('./package.json');
  pkg.description = 'Create multi-line block comment from string';

  console.log([
    sumUp(pkg),
    '',
    'Usage1: ' + pkg.name + ' <string>',
    'Usage2: cat <file> | ' + pkg.name + ' <string>',
    '',
    'Options:',
    yellow('--start,   -s <string>') + '  Add something (i.e. `!`) to the first line',
    yellow('--help,    -h         ') + '  Print usage information',
    yellow('--version, -v         ') + '  Print version',
    ''
  ].join('\n'));
}

function run(str) {
  var blockComment = require('./');
  console.log(blockComment(str, {start: argv.start}));
}

if (argv.version) {
  console.log(require('./package.json').version);
} else if (argv.help) {
  help();
} else if (process.stdin.isTTY) {
  if (argv._.length === 0) {
    help();
  } else {
    run(argv._[0]);
  }
} else {
  require('get-stdin')(run);
}
