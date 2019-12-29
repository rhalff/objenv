import program from 'commander'
import * as path from 'path'
import objenv from './index'

const pkg = require('../package.json')

program
  .version(pkg.version)
  .usage('[options] [file]')
  .option('-c, --camelCase', 'Parse Camelcase')
  .option('-p, --prefix [prefix]', 'Prefix')
  .option('-s, --separator [separator]', 'Separator')
  .option('-d, --dockerize', 'Docker ENV variables')
  .parse(process.argv)

let file = program.args[0]

if (file) {
  file = path.isAbsolute(file[0]) ? file : path.join(process.cwd(), file)
  const extension = path.extname(file)
  let config = require(file)

  if (extension === '.ts') {
    config = config[Object.keys(config)[0]]
  }

  objenv(
    config,
    {
      camelCase: program.camelCase,
      prefix: program.prefix,
      separator: program.separator,
      mode: 'report',
    },
    (key: string, val: string) => {
      if (program.dockerize) {
        console.log(['ENV', key, val].join(' '))
      } else {
        console.log(key, val)
      }
    }
  )
} else {
  console.error('Filename required')
}
