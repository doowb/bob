
var Base = require('class-extend');
var Handlebars = require('handlebars');

var Engine = Base.extend({

  constructor: function (assemble) {
    this._assemble = assemble;
  },

  render: function (component) {
    var context = component.context();
    return Handlebars.compile(component._content, {data: context})(context);
  },

  registerPartials: function () {
    this._assemble._partials.forEach(function (partial) {
      Handlebars.registerPartial(partial.name, partial._content);
    });
  }

});

module.exports = Engine;
