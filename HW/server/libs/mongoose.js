const mongoose = require('mongoose');
const log = require(INCPATH + '/log')(module);
const config = require(INCPATH + '/config');

mongoose.connect(config.get('db'));
const db = mongoose.connection;

db.on('error', function(err) {
  log.error('connection error:', err.message);
});

db.once('open', function callback() {
  log.info('Connected to DB!');
});

const Article = new mongoose.Schema(
  {
    type: {type: String, default: 'text'},
    title: String,
    name: {type: String, default: 'John Doe'},
    date: {type: String, default: new Date()},
    mediaLink: String,
    description: String,
    text: Object,
  },
  {
    versionKey: false,
  }
);

module.exports.ArticleModel = mongoose.model('articles', Article);
