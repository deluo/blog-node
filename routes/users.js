var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var User = require("../models/users.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send('this is RESTful blogapi');
});

router.route("/getusers").post(function(req,res){
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

router.post("/register",function(req,res){
  var user = new User();
  user.name = req.body.name;

  user.save(function(err){
      if(err){
          return res.send(err);
      }
      res.json({message:"create a user Successed and name is "+req.body.name});
  });
});

router.get("/login",function(req,res){
  //加密 req.body.password
  //查询 findOne({username})
  //if 没查到到,return {该用户不存在}
  //elif 查到了,比较密码, if 一致 return 登录成功,用户名保存到session
    // elif return 密码错误
});


module.exports = router;
