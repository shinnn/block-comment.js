# block-comment.js

[![Build Status](https://travis-ci.org/shinnn/block-comment.js.svg?branch=master)](https://travis-ci.org/shinnn/block-comment.js)
[![Build status](https://ci.appveyor.com/api/projects/status/o0c4g0gbgoa481mf?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/block-comment-js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/block-comment.svg)](https://coveralls.io/r/shinnn/block-comment)
[![Dependency Status](https://david-dm.org/shinnn/block-comment.svg)](https://david-dm.org/shinnn/block-comment)
[![devDependency Status](https://david-dm.org/shinnn/block-comment/dev-status.svg)](https://david-dm.org/shinnn/block-comment#info=devDependencies)

Create multi-line block comment from a string or an array

```javascript
var comment = blockComment('Hello\nworld.', {start: '!'})
console.log(comment);
```

yields:

```javascript
/*!
 * Hello
 * World
*/
```

## Installation

### Package managers

#### [npm](https://www.npmjs.org/) [![NPM version](https://badge.fury.io/js/block-comment.svg)](https://www.npmjs.org/package/block-comment)

```sh
npm install block-comment
```

#### [Bower](http://bower.io/) [![Bower version](https://badge.fury.io/bo/block-comment.svg)](https://github.com/shinnn/block-comment.js/releases)

```sh
bower install block-comment
```

#### [Duo](http://duojs.org/)

```javascript
var blockComment = require('shinnn/block-comment.js');
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/block-comment.js/master/block-comment.js)

## API

### blockComment(*content* [, *option*])

*content*: `String` or `Array` of `String`  
*option*: `Object`  
Return: `String`

It returns a string of ECMAScript multi-line comment.

When *content* is a string, the result reflects the newlines of *content*.

```javascript
blockComment('foo\nbar\r\nbaz'); //=> '/*\n * foo\n * bar\n * baz\n*/'
```

You can also specify *content* with an array.

```javascript
blockComment(['foo', 'bar']); //=> '/*\n * foo\n * bar\n*/'
```

#### option.start

Type: `String`
Default: `''`

Adds a string immediately after `/*`.

For example, if you use some JavaScript compression tools such as [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify#preservecomments) and [gulp-uglify](https://github.com/terinjokes/gulp-uglify), you can preserve the comment by adding `!`;

```javascript
blockComment('foo', {start: '!'}); //=> '/*!\n * foo\n*/'
```

### Properties

This function has three properties used as components of the comment template.

#### blockComment.open

Type: `String`
Default: `'/*'`

#### blockComment.linePrefix

Type: `String`
Default: `' *'`

#### blockComment.close

Type: `String`
Default: `'*/'`

You can overwrite these properties if you want to modify the comment template. However, you don't have to care about them in most cases.

```javascript
blockComment.open = '/**********';
blockComment.close = '**********/';

blockComment('foo'); //=> '/**********\n * foo\n**********/'
```

## CLI

You can use this module as a CLI tool by installing it [globally](https://www.npmjs.org/doc/files/npm-folders.html#global-installation).

### Usage

```
Usage1: block-comment <string>
Usage2: cat <file> | block-comment <string>

Options:
--start,   -s <string>  Add something (i.e. `!`) to the first line
--help,    -h           Print usage information
--version, -v           Print version
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
