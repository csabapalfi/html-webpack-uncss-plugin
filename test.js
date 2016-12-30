const expect = require('chai').expect;

const HtmlWebpackUncssPlugin = require('./index.js');

const htmlWithUnusedCss = `
    <html>
      <style>
        h1 {
          font-size: 3em;
        }
        .test {
          color: red;
        }
      </style>
      <p class="test">hello</p>
    </html>
`;

const htmlWithoutUnusedCss = `
    <html>
      <style>
        .test {
          color: red;
        }
      </style>
      <p class="test">hello</p>
    </html>
`;

describe('plugin', () => {
  it('takes no options', () => {
    expect(() => new HtmlWebpackUncssPlugin({})).to.throw();
  });

  it('removes unused CSS', function (done) {
    this.timeout(10000);
    const plugin = new HtmlWebpackUncssPlugin();
    plugin.apply({
      plugin: (name, callback) => callback({
        plugin: (name, callback) =>
          callback({ html: htmlWithUnusedCss }, (err, data) => {
            expect(data.html).to.equal(htmlWithoutUnusedCss);
            done();
          }),
      }),
    });
  });
});
