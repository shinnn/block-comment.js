/*!
 * block-comment | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/block-comment
*/
'use strict';

function blockComment(lines, option) {
  option = option || {};
  if (!Array.isArray(lines)) {
    lines = lines.split(/\r?\n/);
  }

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
      throw new Error('start option should not include newlines.');
    }
    start = option.start;
  }

  return blockComment.open + start + '\n' + content + blockComment.close;
}

blockComment.open = '/*';
blockComment.linePrefix = ' *';
blockComment.close = '*/';

module.exports = blockComment;
