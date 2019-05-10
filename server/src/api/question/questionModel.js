const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choiceSchema = new Schema({
  text: String,
  isAnswer: Boolean,
});

const questionSchema = new Schema({
  title: String,
  choices: [choiceSchema],
});

module.exports = mongoose.model('Question', questionSchema);