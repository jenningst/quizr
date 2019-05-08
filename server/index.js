const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const configurations = require('./config');
const typeDefs = require('./src/api/schema');
const resolvers = require('./src/api/resolvers');

// mlab setup; read config and create connection string
const environment = process.env.NODE_ENV || 'production';
const config = configurations[environment];
const { database: { host: dbHost, port: dbPort, name: dbName } } = config;
const { port: appPort } = config;
const connectionString = `mongodb://${process.env.DB_USER}:${
  process.env.DB_PASSWORD
}@${dbHost}:${dbPort}/${dbName}`;

// setup express app
const app = express();

// setup apollo server
const schema = makeExecutableSchema({ typeDefs, resolvers });
const apollo = new ApolloServer({ schema });

// opt-in middleware; in this case, express itself
// this is how we use Apollo and express together
apollo.applyMiddleware({ app, path: '/graphql' });

// allow cross-origin requests
app.use(cors());
// (OPTIONAL) for logging and bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', (req, res) => res.send('Oh hello there from Express!'));

// mongoose setup; connect to mlab data
mongoose.connect(connectionString, { useNewUrlParser: true });

// log once connected to db
mongoose.connection.once('open', () =>
  console.log(`Mongoose now connected to db: ${dbHost}:${dbPort}/${dbName}`)
);

// check if connection with the database was successful
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

// launch express backend into a port
app.listen(appPort, () => {
  console.log(
    `Apollo Server listening at url: http://localhost:${appPort}/graphql`
  );
});