var mongoose =  require("mongoose");
mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;

var userSchema = {
    'name':String,
    'password':String
};

var User = mongoose.model("User",userSchema);

module.exports = User;