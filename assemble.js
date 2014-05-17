
var Base = require('class-extend');

var file = require('fs-utils');
var matter = require('gray-matter');
var _ = require('lodash');

var Engine = require('./engine.js');
var Page = require('./page.js');
var Partial = require('./partial.js');
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

  _loadComponents: function (patterns, Component) {
    var components = [];
    if (_.isEmpty(patterns)) {
      return components;
    }
    var files = file.find(patterns || '');
    files.forEach(function (filepath) {
      var component = new Component(matter.read(filepath, this._options));
      component.name = file.basename(filepath);
      components.push(component);
    }.bind(this));
    return components;
  },

  _loadPartials: function () {
    this._partials = this._loadComponents(this._options.partials, Partial);
    this._engine.registerPartials();
  },

  build: function () {
    var output = [];
    this._loadPartials();
    this._pages = this._loadComponents(this._patterns, Page);
    this._pages.forEach(function (page) {
      var f = new File();
      f.content = this._engine.render(page);
      output.push(f);
    }.bind(this));

    return output;
  }

});

module.exports = Assemble;
