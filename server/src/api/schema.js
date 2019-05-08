const { mergeTypes } = require('merge-graphql-schemas');

const baseTypes = require('./baseSchema');
const questionTypes = require('./question/questionSchema');
const choiceTypes = require('./choice/choiceSchema');

const types = [baseTypes, questionTypes, choiceTypes];

module.exports = mergeTypes(types);