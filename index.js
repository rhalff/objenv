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
    var path, key
    if (this.isLeaf) {
      path = prefix ? [prefix].concat(this.path) : this.path
      key = path.join(sep).toUpperCase()
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
