import test from 'tape'
import {objEnv} from '../src'
import {fixtures} from './fixtures'

let result
const debug = process.env.DEBUG || false
const tests = Object.keys(fixtures)

tests.forEach((name: string) => {
  test('objEnv', t => {
    const fixture = fixtures[name] as any

    // Set desired env variables
    Object.keys(fixture.env).forEach(key => {
      process.env[key] = fixture.env[key]
    })
    result = objEnv(
      fixture.orig,
      {
        prefix: fixture.prefix,
        separator: fixture.separator || '_',
        camelCase: fixture.camelCase,
      },
      (match, value) => {
        if (debug) {
          console.log('Replaced %s with %s', match, value)
        }
      }
    )

    t.deepEqual(result, fixture.expected, name + ': ' + fixture.description)
    t.end()
  })
})
