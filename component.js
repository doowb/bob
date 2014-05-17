
var Base = require('class-extend');

var Component = Base.extend({
  constructor: function (obj) {
    obj = obj || {};
    this._data = obj.context; // until gray-matter is updated
    this._content = obj.content;
    this._orig = obj.orig;

    //this._context = new Context(this._data);
    this._context = this._data;
  },

  context: function () {
    return this._context;
  }

});

Component.extend = Base.extend;
module.exports = Component;
