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
    type: String,
    default: function formatDate() {
      var d = new Date()
      day = d.getDate()
      month = d.getMonth() + 1
      year = d.getFullYear()
      return `${day}/${month}/${year}`
    }
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
