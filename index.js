var express = require("express");
var users = require("./routes/users.js");
var app = express();

var port = process.env.PORT || 8080;

//给所有路由注册 /api前缀
app.use("/users",users);

//监听端口
app.listen(port);
console.log("begin with this port:"+port);

