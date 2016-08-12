'use strict'

const test = require('tape')
const objenv = require('../index')
const fixtures = require('./fixtures')

let result
const debug = process.env.DEBUG || false
const tests = Object.keys(fixtures)

tests.forEach((name) => {
  test('objenv', (t) => {
    const fixture = fixtures[name]

    // Set desired env variables
    Object.keys(fixture.env).forEach((name) => {
      process.env[name] = fixture.env[name]
    })
    result = objenv(fixture.orig, {
      prefix: fixture.prefix,
      seperator: fixture.seperator || '_',
      camelCase: fixture.camelCase
    }, (match, value) => {
      if (debug) {
        console.log('Replaced %s with %s', match, value)
      }
    })

    t.deepEqual(
      result,
      fixture.expected,
      name + ': ' + fixture.description
    )
    t.end()
  })
})
