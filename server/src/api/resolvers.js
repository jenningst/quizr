const { mergeResolvers } = require('merge-graphql-schemas');

const questionResolver = require('./question/questionResolver');
const choiceResolver = require('./choice/choiceResolver');

const resolvers = [questionResolver];

module.exports = mergeResolvers(resolvers);