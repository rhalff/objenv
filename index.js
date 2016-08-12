var traverse = require('traverse')

function objenv (obj, options, matchFn) {
  if (typeof options === 'function') {
    matchFn = options
    options = {}
  }
  if (!options) options = {}
  var sep = options && options.seperator || '_'
  var prefix = options && options.prefix || null

  traverse(obj).forEach(function (v) {
    var key
    if (this.isLeaf) {
      key = this.path.join(sep)
      if (options.camelCase) {
        key = key.replace(/[A-Z]+/g, function (match) {
          return '_' + match
        })
      }
      key = key.toUpperCase()
      key = prefix ? prefix + '_' + key : key

      if (process.env[key]) {
        if (!matchFn || matchFn(key, process.env[key]) !== false) {
          this.update(process.env[key])
        }
      }
    }
  })
  return obj
}

module.exports = objenv
