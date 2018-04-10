var mongoose =  require("mongoose");
var config = require('../config');
mongoose.connect(config.db);
var db = mongoose.connection;

var blogSchema = {
    'createTime':Date,
    'title':String,
    'content':String,
    'comments':[{'commentator':String,'commentTime':Date,'comment':String}],
    'author':String,
    'tags':String
};

var Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;