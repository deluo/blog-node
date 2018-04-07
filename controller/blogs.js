var BlogModel = require("../models/blogs");
var moment = require('moment');

class Blogs{
    constructor(){

    }
    getAllBlogs(req,res,next){
        BlogModel.find({},function(err,doc){
            if(err){
                return res.send(err);
            }
            res.json(doc);
        });
    }
    getBlogById(req,res,next){
        BlogModel.findById({_id:req.params.id},function(err,doc){
            if(err){
                return res.send(err);
            }
            res.json(doc);
        });
    }
    getListByTag(req,res,next){
        BlogModel.find({tags:req.query.tags},function(err,doc){
            if(err){
                return res.send(err);
            }
            res.json(doc);
        });
    }
    getListByDate(req,res,next){
        var createMonth = moment(req.params.createTime).format();
        var firstDay = moment(createMonth).startOf("month").format("YYYY-MM-DD");
        var lastDay = moment(createMonth).endOf("month").format("YYYY-MM-DD");
        
        BlogModel.find({createTime:{"$gte":firstDay,"$lt":lastDay}},function(err,doc){
            if(err){
                return res.send(err);
            }
            res.json(doc);
        });
    }
    postBlog(req,res,next){
        const newBlog = {
            'createTime':new Date(),
            'title':req.body.title,
            'content':req.body.content,
            'comments':[],
            'author':req.body.author,
            'tags':req.body.tags
        }
        BlogModel.create(newBlog);
    }

    getDateGroup(req,res,next){
        BlogModel.aggregate([
            {
                $project:{
                    createTime:{year: { $year: "$createTime" }, month: { $month: "$createTime" }}
                }
            },
            {
                $group:{
                    _id:"$createTime",
                    blogCount:{$sum:1}
                }
            }
        ],function(err,doc){
            if(err){ return res.send(err)}
            res.json(doc);
        });
    }

    getTagsGroup(req,res,next){
        BlogModel.aggregate([
            {
                $group:{
                    _id:"$tags",
                    blogCount:{$sum:1}
                }
            }
        ],function(err,doc){
            if(err){return res.send(err)}
            res.json(doc);
        })
    }
}

module.exports = new Blogs();