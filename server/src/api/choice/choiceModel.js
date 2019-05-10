const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choiceSchema = new Schema({
  text: String,
  isAnswer: Boolean,
});

module.exports = mongoose.model('Choice', choiceSchema);