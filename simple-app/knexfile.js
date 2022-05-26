require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
          host: "localhost",
          user: "root",
          password: "root",
          database: "simpleapp",
          port: "3306"
        },
        migrations: {
          directory: __dirname + '/utility/db/mysql/migrations'
        },
        seeds: {
          directory: __dirname + '/utility/db/mysql/seeds'
        }
      },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    },
    migrations: {
      directory: __dirname + '/utility/db/mysql/migrations'
    },
    seeds: {
      directory: __dirname + '/utility/db/mysql/seeds'
    }
  }
};