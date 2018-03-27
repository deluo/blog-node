var mongoose =  require("mongoose");
mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;
// db.once('open',function callback(){

// })

var userSchema = {
    'name':String
};

var User = mongoose.model("User",userSchema);

module.exports = User;