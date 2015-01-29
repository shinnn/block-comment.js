'use strict';

var spawn = require('child_process').spawn;

var test = require('tape');

var pkg = require('./package.json');

test('"block-comment" command inside TTY context', function(t) {
  t.plan(9);

  var cmd = function(args) {
    var cp = spawn('node', [pkg.bin].concat(args), {
      stdio: [process.stdin, null, null]
    });
    cp.stdout.setEncoding('utf8');
    cp.stderr.setEncoding('utf8');
    return cp;
  };

  cmd(['a\n\r\nb']).stdout.on('data', function(output) {
    t.equal(output, [
      '/*',
      ' * a',
      ' *',
      ' * b',
      '*/\n'
    ].join('\n'), 'should print a comment.');
  });

  cmd([1, '--start', '!']).stdout.on('data', function(output) {
    t.equal(output, [
      '/*!',
      ' * 1',
      '*/\n'
    ].join('\n'), 'should prepend a string using `start` option.');
  });

  cmd(['a', '-s', '!']).stdout.on('data', function(output) {
    t.equal(output, [
      '/*!',
      ' * a',
      '*/\n'
    ].join('\n'), 'should use `-s` as an alias of `--start` flag.');
  });

  cmd(['--version']).stdout.on('data', function(output) {
    t.equal(output, pkg.version + '\n', 'should print version using `--version` flag.');
  });

  cmd(['-v']).stdout.on('data', function(output) {
    t.equal(output, pkg.version + '\n', 'should use `-v` as an alias of `--version`.');
  });

  cmd(['--help']).stdout.on('data', function(output) {
    t.ok(/Usage/.test(output), 'should print usage information using `--help` flag.');
  });

  cmd(['-h']).stdout.on('data', function(output) {
    t.ok(/Usage/.test(output), 'should use `-h` as an alias of `--help`.');
  });

  var err = '';

  cmd(['a', '--start', '\n'])
    .on('close', function(code) {
      t.notEqual(code, 0, 'should fail when `--start` includes a newline.');
      t.ok(/must not include newlines/.test(err), 'should print a valid error massage.');
    })
    .stderr.on('data', function(output) {
      err += output;
    });
});

test('"block-comment" command outside TTY context', function(t) {
  t.plan(2);

  var cmd = function(args) {
    var tmpCp = spawn('node', [pkg.bin].concat(args), {
      stdio: ['pipe', null, null]
    });
    tmpCp.stdout.setEncoding('utf8');
    tmpCp.stderr.setEncoding('utf8');
    return tmpCp;
  };

  var cp = cmd([]);
  cp.stdout.on('data', function(output) {
    t.equal(output, [
      '/*',
      ' * a',
      ' * b',
      ' *',
      '*/\n'
    ].join('\n'), 'should print a comment.');
  });
  cp.stdin.end('a\nb\r\n');

  var cpEmpty = cmd([]);
  cpEmpty.stdout.on('data', function(output) {
    t.equal(output, [
      '/*',
      ' *',
      '*/\n'
    ].join('\n'), 'should print a comment even if stdin is empty.');
  });
  cpEmpty.stdin.end('');
});
