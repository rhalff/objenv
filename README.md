OBJENV
======

objenv overrides an object with it's corresponding environment variables.

[![Build Status](https://travis-ci.org/rhalff/objenv.svg?branch=master)](https://travis-ci.org/rhalff/objenv/)
[![Dependency Status](https://david-dm.org/rhalff/objenv.png?theme=shields.io)](https://david-dm.org/rhalff/objenv)
[![Development Dependency Status](https://david-dm.org/rhalff/objenv/dev-status.png?theme=shields.io)](https://david-dm.org/rhalff/objenv#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/rhalff/objenv/badge.svg?branch=master&service=github)](https://coveralls.io/github/rhalff/objenv?branch=master)

Install:

```bash
npm install objenv --save
```

Quick usage example:
```javascript
const envEnrichedObject = objenv(obj, {prefix: 'psichi'})
```

## objenv(obj, [options], [matchFn])

Will traverse `obj` and test whether an environment variable is set to replace it's value.

`matchFn(key, newValue)` can be used to execute a function whenever a value is replaced.
This is can be useful to report about the environment override.

If you return false from `matchFn` the value will not be overwritten.

Available `options` options are:
- options.prefix: defaults to none.
- options.seperator: defaults to '_'

Both `options` and `matchFn` are optional, if `options` are omitted,
the `matchFn` will be the second argument.

objenv alters `obj` in place, if this is not desired create a copy of the object first.

## Example Usage

Example object:
```javascript
const config = {
  database: {
    host: 'localhost',
    port: '8000'
  }
};
```

The initial object defines what values can be set.

Occording to the above the following environment variables will be considered:

```bash
DATABASE_HOST
DATABASE_PORT
```

If you provide a `prefix` option the environment variables must start with this
prefix. e.g. when the prefix is `MYORG`, the following env vars are tested:

```bash
MYORG_DATABASE_HOST
MYORG_DATABASE_PORT
```

Script:
```javascript

const objenv = require('objenv');

const options = {
  prefix: 'myorg',
  seperator: '_' // is the default
};

objenv(config, options, (key, value) => {
  console.log('Env key %s found value is now %s', key, value)
});

console.log(config);
```

Run:
```bash
$ MYORG_DATABASE_HOST=0.0.0.0 node script.js
{ "database": { "host": "0.0.0.0", "port": "8000"} }
```

