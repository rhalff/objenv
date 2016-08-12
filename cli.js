var program = require('commander')
var pkg = require('./package')
var objenv = require('./index')

program
.version(pkg.version)
.usage('[options] [file]')
.option('-c, --camelCase', 'Parse Camelcase')
.option('-p, --prefix [prefix]', 'Prefix')
.option('-s, --seperator [seperator]', 'Seperator')
.option('-d, --dockerize', 'Docker ENV variables')
.parse(process.argv)

var file = program.args[0]

if (file) {
  var config = require(file)
  objenv(config, {
    camelCase: program.camelCase,
    prefix: program.prefix,
    seperator: program.seperator,
    mode: 'report'
  }, function (key, val, env) {
    if (program.dockerize) {
      console.log(['ENV', key, val].join(' '))
    } else {
      console.log(key, val)
    }
  })
} else {
  console.error('Filename required')
}
