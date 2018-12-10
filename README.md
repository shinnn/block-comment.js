# block-comment

[![npm version](https://img.shields.io/npm/v/block-comment.svg)](https://www.npmjs.com/package/block-comment)
[![Bower version](https://img.shields.io/bower/v/block-comment.svg)](https://github.com/shinnn/block-comment.js/releases)
[![Build Status](https://travis-ci.com/shinnn/block-comment.js.svg?branch=master)](https://travis-ci.com/shinnn/block-comment.js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/block-comment.js.svg?label=cov)](https://coveralls.io/r/shinnn/block-comment.js)

Create a multiline block comment from a `string` or an `Array`

```javascript
const comment = blockComment('Hello\nworld.', {start: '!'})
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

#### [npm](https://www.npmjs.com/)

```
npm install block-comment
```

#### [Bower](https://bower.io/)

```
bower install block-comment
```

## API

```javascript
import blockComment from 'block-comment';
```

### blockComment(*content* [, *option*])

*content*: `string` or `string[]`  
*option*: `Object`  
Return: `string`

It returns a `string` of ECMAScript multi-line comment.

When *content* is a `string`, the result reflects the newlines of *content*.

```javascript
blockComment('foo\nbar\r\nbaz'); //=> '/*\n * foo\n * bar\n * baz\n*/'
```

You can also specify *content* with an `Array`.

```javascript
blockComment(['foo', 'bar']); //=> '/*\n * foo\n * bar\n*/'
```

#### option.start

Type: `string`
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

You can use this module as a CLI tool by installing it [globally](https://docs.npmjs.com/files/folders#global-installation).

### Usage

```
Usage1: block-comment <string>
Usage2: cat <file> | block-comment <string>

Options:
--start,   -s <string>  Add something (e.g. `!`) to the first line
--help,    -h           Print usage information
--version, -v           Print version
```

## License

Copyright (c) 2014 - 2018 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
