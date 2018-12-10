# block-comment

[![npm version](https://img.shields.io/npm/v/block-comment.svg)](https://www.npmjs.com/package/block-comment)
[![Build Status](https://travis-ci.com/shinnn/block-comment.js.svg?branch=master)](https://travis-ci.com/shinnn/block-comment.js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/block-comment.js.svg)](https://coveralls.io/github/shinnn/block-comment.js)

Generate a multiline block comment from a `string`

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

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install block-comment
```

## API

```javascript
import blockComment from 'block-comment';
```

### blockComment(*content* [, *option*])

*content*: `string`  
*option*: `Object`  
Return: `string`

It returns a `string` of ECMAScript multi-line comment.

When *content* is a `string`, the result reflects the newlines of *content*.

```javascript
blockComment('foo\nbar\r\nbaz'); //=> '/*\n * foo\n * bar\n * baz\n*/'
```

#### option.start

Type: `string`  
Default: `''`

Add a given `string` immediately after `/*`.

```javascript
// terser preserves comments with @preserve directive
// https://github.com/terser-js/terser#keeping-copyright-notices-or-other-comments
blockComment('foo', {start: '!'}); //=> '/* @preserve\n * foo\n*/'
```

## License

Copyright (c) 2014 - 2018 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
