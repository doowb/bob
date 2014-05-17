
var Assemble = require('.');
var assemble = Assemble('src/templates/pages/**/*.hbs');
var output = assemble.build();

console.log('output');
console.log(output);
