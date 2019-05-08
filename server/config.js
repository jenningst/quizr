const config = {
  production: {
    ssl: true,
    port: 443,
    hostname: "example.com"
  },
  development: {
    ssl: false,
    port: 4000,
    hostname: "localhost",
    database: {
      host: "ds151586.mlab.com",
      port: 51586,
      name: "quizr"
    }
  }
};

module.exports = config;