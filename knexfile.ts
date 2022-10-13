export const development = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'db',
  },
  migrations: {
    tableName: 'project2_migrations',
    directory: `${__dirname}/src/database/migrations`,
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`,
  },
};
