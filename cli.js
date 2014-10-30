#!/usr/bin/env node
'use strict';

var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    s: 'start',
    h: 'help',
    v: 'version'
  },
  boolean: ['help', 'version']
});
var pkg = require('./package.json');

function help() {
  var chalk = require('chalk');

  console.log([
    chalk.cyan(pkg.name) + chalk.gray(' v' + pkg.version),
    'Create multi-line block comment from string',
    '',
    'Usage1: ' + pkg.name + ' <string>',
    'Usage2: cat <file> | ' + pkg.name + ' <string>',
    '',
    'Options:',
    chalk.yellow('--start,   -s <string>') + '  Add something (i.e. `!`) to the first line',
    chalk.yellow('--help,    -h         ') + '  Print usage information',
    chalk.yellow('--version, -v         ') + '  Print version',
    ''
  ].join('\n'));
}

function run(str) {
  var blockComment = require('./');
  console.log(blockComment('' + str, {start: argv.start}));
}

if (argv.version) {
  console.log(pkg.version);
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
