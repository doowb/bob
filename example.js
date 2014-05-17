
var Assemble = require('.');

var options = {
  partials: 'src/templates/partials/**/*.hbs'
};

var assemble = Assemble('src/templates/pages/**/*.hbs', options);
var output = assemble.build();

console.log('output');
console.log(output);
