var traverse = require('traverse')

function decamelize (str) {
  return str.replace(/[A-Z]+/g, function (match) {
    return '_' + match
  })
}

function objenv (obj, options, matchFn) {
  if (typeof options === 'function') {
    matchFn = options
    options = {}
  }
  if (!options) options = {}
  var sep = options && options.seperator || '_'
  var prefix = options && options.prefix || null
  var report = options && options.mode === 'report'

  function doIt (v) {
    var key
    if (this.isLeaf) {
      key = this.path.join(sep)
      if (options.camelCase) {
        key = decamelize(key)
      }
      key = prefix ? prefix + '_' + key : key
      key = key.toUpperCase()

      if (report) {
        if (matchFn) {
          matchFn(key, v, process.env[key])
        }
      } else if (process.env[key]) {
        if (!matchFn || matchFn(key, process.env[key]) !== false) {
          this.update(process.env[key])
        }
      }
    }
  }

  traverse(obj).forEach(doIt)

  return obj
}

module.exports = objenv
