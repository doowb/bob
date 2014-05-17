
var Base = require('class-extend');

var file = require('fs-utils');
var matter = require('gray-matter');

var Engine = require('./engine.js');
var Page = require('./page.js');
var File = require('./file.js');

var Assemble = Base.extend({

  constructor: function (patterns, options) {
    if (!(this instanceof Assemble)) {
      return new Assemble(patterns, options);
    }

    this._patterns = patterns || '';
    this._options = options || {};
    this._pages = [];

    this._engine = new Engine(this);
  },

  build: function () {
    var files = file.find(this._patterns, this._options);
    var output = [];

    files.forEach(function (filepath) {
      var page = new Page(matter.read(filepath, this._options));
      this._pages.push(page);
    }.bind(this));

    this._pages.forEach(function (page) {
      var f = new File();
      f.content = this._engine.render(page);
      output.push(f);
    }.bind(this));

    return output;
  }

});

module.exports = Assemble;
