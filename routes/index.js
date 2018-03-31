var bodyParser = require("body-parser");
var users = require("./users");
var blogs = require("./blogs");
var blogtags = require("./blogtags");

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/users",users);
    app.use("/blogs",blogs);
    app.use("/blogtags",blogtags);
}

