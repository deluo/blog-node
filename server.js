var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/users.js")
var app = express();

// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

//给所有路由注册 /api前缀
app.use("/api",router);

router.get("/",function(req,res){
    res.json({message:"this is restful api get"});
});


//监听端口
app.listen(port);
console.log("begin with this port:"+port);

router.route("/user").post(function(req,res){
    var user = new User();
    user.name = req.body.name;

    user.save(function(err){
        if(err){
            return res.send(err);
        }
        res.json({message:"create a user Successed and name is "+req.body.name});
    });
}).get(function(req,res){
    User.find({},function(err,doc){
        res.json(doc);
    });
})

