var UserModel = require("../models/users");
var crypto = require("crypto");


class Users{
    constructor(){
       
    }
    login(req,res,next) {
        var encryptPwd = Users.encryptFn(req.body.password);
        var query = UserModel.where({name:req.body.name});
        query.findOne(function(err,userModel){
            if(err){
                res.send("该用户不存在")
                return;
            }
            if(userModel && userModel.password === encryptPwd){
                res.send("登录成功");
                return;
            }
            res.send("密码错误");
        });
    }
    register(req,res,next){
        var encryptPwd = Users.encryptFn(req.body.password);

        var userModel = new UserModel({
            name:req.body.name,
            password:encryptPwd
        });
        
        userModel.save(function(err){
            if(err){
                return res.send(err);
            }
            res.json({message:"success create a new user: "+req.body.name});
        });
    }
    getAllUsers(req,res,next){
        UserModel.find({},function(err,doc){
            res.json(doc);
        });
    }
    static encryptFn(param){
        var md5 = crypto.createHash('md5');
        return md5.update(param).digest('base64');
    }
}

module.exports = new Users();