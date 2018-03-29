var bodyParser = require("body-parser");
var users = require("./users.js");

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/users",users);
}

