var mongoose =  require("mongoose");
mongoose.connect('mongodb://localhost/blogtags');
var db = mongoose.connection;

var blogtagsSchema = {
    'blogs':[{'blogId':String}],
    'tags':String
};

var Blogtags = mongoose.model("blogtags",blogtagsSchema);

module.exports = Blogtags;