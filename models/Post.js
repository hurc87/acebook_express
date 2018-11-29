const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var date = new Date();
// Creat Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: date.getDate()
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
