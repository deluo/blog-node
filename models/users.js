var mongoose =  require("mongoose");
var config = require('../config');
mongoose.connect(config.db);
var db = mongoose.connection;

var userSchema = {
    'name':String,
    'password':String
};

var User = mongoose.model("User",userSchema);

module.exports = User;