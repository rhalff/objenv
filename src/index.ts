import traverse from 'traverse'

export interface ObjEnvOptions {
  camelCase?: boolean
  separator?: string
  prefix?: string
  mode?: 'report'
  noCast?: boolean
}

type MatchFunction = (
  key: string,
  newValue: string,
  oldValue?: string
) => false | void

const decamelize = (str: string) =>
  str.replace(/[A-Z]+/g, (match: string) => `_${match}`)

export default objEnv

export function objEnv(
  obj: object,
  options: ObjEnvOptions = {},
  matchFn?: MatchFunction
) {
  if (typeof options === 'function') {
    matchFn = options
    options = {}
  }
  const separator = (options && options.separator) || '_'
  const prefix = (options && options.prefix) || null
  const report = options && options.mode === 'report'

  function doIt(this: traverse.TraverseContext, value: any) {
    let key: string
    if (this.isLeaf) {
      key = this.path.join(separator)
      if (options.camelCase) {
        key = decamelize(key)
      }
      key = prefix ? prefix + '_' + key : key
      key = key.toUpperCase()

      if (report) {
        if (matchFn) {
          matchFn(key, value, process.env[key])
        }
      } else if (process.env[key]) {
        if (!matchFn || matchFn(key, process.env[key] as string) !== false) {
          let writeValue: any

          if (options.noCast) {
            writeValue = process.env[key]
          } else {
            if (Number(value) === value) {
              writeValue =
                value % 1 !== 0
                  ? parseFloat(process.env[key] as string)
                  : parseInt(process.env[key] as string, 10)
            } else if (typeof value === 'boolean') {
              writeValue = !!process.env[key]
            } else {
              writeValue = process.env[key]
            }
          }
          this.update(writeValue)
        }
      }
    }
  }

  traverse(obj).forEach(doIt)

  return obj
}
