export const fixtures: {[key: string]: any} = {
  simple: {
    description: 'Simple override',
    prefix: 'ORG',
    env: {
      ORG_DATABASE_HOST: 'db.example.com',
      ORG_DATABASE_NAME: 'mydb',
    },
    orig: {
      database: {
        host: 'localhost',
        name: 'testdb',
      },
    },
    expected: {
      database: {
        host: 'db.example.com',
        name: 'mydb',
      },
    },
  },
  camelCase: {
    description: 'camelCase',
    prefix: 'ORG',
    camelCase: true,
    env: {
      ORG_DATABASE_HOST: 'db.example.com',
      ORG_DATABASE_NAME: 'mydb',
      ORG_NES_TED_OPTION: 'true',
    },
    orig: {
      databaseHost: 'localhost',
      databaseName: 'testdb',
      nesTed: {
        option: 'false',
      },
    },
    expected: {
      databaseHost: 'db.example.com',
      databaseName: 'mydb',
      nesTed: {
        option: 'true',
      },
    },
  },
}
