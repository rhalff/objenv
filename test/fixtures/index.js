module.exports = {
  simple: {
    description: 'Simple override',
    prefix: 'ORG',
    env: {
      ORG_DATABASE_HOST: 'db.example.com',
      ORG_DATABASE_NAME: 'mydb'
    },
    orig: {
      database: {
        host: 'localhost',
        name: 'testdb'
      }
    },
    expected: {
      database: {
        host: 'db.example.com',
        name: 'mydb'
      }
    }
  }
}
