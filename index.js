'use strict';
const assert = require('assert');
const cheerio = require('cheerio');
const uncss = require('uncss');

function HtmlWebpackUncssPlugin (options) {
  assert.equal(options, undefined,
    'The HtmlWebpackUncssPlugin does not accept any options');
}

HtmlWebpackUncssPlugin.prototype.apply = (compiler) => {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-html-processing',
      (data, callback) => {
        const $ = cheerio.load(data.html);
        const styles = [];
        $('style').each(function() {
          const style = $(this).html();
          if (style) {
            styles.push(style);
          }
        });

        uncss($.html(), { raw: styles.join(' ') }, (error, output) => {
          if (error) {
            return callback(error);
          }
          $('style').slice(1).remove();
          $('style').text(output);
          data.html = $.html();
          return callback(null, data);
        });
      });
  });
};

module.exports = HtmlWebpackUncssPlugin;
