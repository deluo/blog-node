var mongoose =  require("mongoose");
var config = require('../config');
mongoose.connect(config.db);
var db = mongoose.connection;

var blogtagsSchema = {
    'blogs':[{'blogId':String}],
    'tags':String
};

var Blogtags = mongoose.model("blogtags",blogtagsSchema);

module.exports = Blogtags;