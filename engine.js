
var Base = require('class-extend');
var Handlebars = require('handlebars');

var Engine = Base.extend({

  constructor: function (assemble) {
    this._assemble = assemble;
  },

  render: function (component) {
    console.log('component', component);
    var context = component.context();
    return Handlebars.compile(component._content, {data: context})(context);
  }

});

module.exports = Engine;
