var template = require('art-template')

var ret = template.render('hello {{ name }}',{ name: 'John'})

console.log(ret)