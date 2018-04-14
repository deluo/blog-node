var bodyParser = require("body-parser");
var users = require("./users");
var blogs = require("./blogs");
var blogtags = require("./blogtags");

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
            //这段仅仅为了方便返回json而已
        res.header("Content-Type", "application/json;charset=utf-8");
        if(req.method == 'OPTIONS') {
            //让options请求快速返回
            res.sendStatus(200); 
        } else { 
            next(); 
        }
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/users",users);
    app.use("/blogs",blogs);
    app.use("/blogtags",blogtags);
}

