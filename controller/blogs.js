var BlogModel = require("../models/blogs");
var moment = require('moment');
var marked = require('marked');

class Blogs{
    constructor(){

    }
    getAllBlogs(req,res,next){
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize);
        BlogModel.find({}).limit(pageSize).skip((pageNo-1)*pageSize).sort({'createTime':-1}).exec(
            function(err,doc){
                if(err){
                    return res.send({status:0,err:err});
                }
                res.json(Blogs.mdToHtml(doc,['content','title']));
            }
        );
    }
    getBlogById(req,res,next){
        BlogModel.findById({_id:req.params.id},function(err,doc){
            if(err){
                return res.send({status:0,err:err});
            }
            res.json(Blogs.mdToHtml(doc,['content','title']));
        });
    }
    getListByTag(req,res,next){
        let pageNo = parseInt(req.query.pageNo) || 1;
        let pageSize = parseInt(req.query.pageSize) || 10;
        BlogModel.find({tags:req.query.tags}).limit(pageSize).skip((pageNo-1)*pageSize).sort({'createTime':-1}).exec(
            function(err,doc){
                if(err){
                    return res.send({status:0,err:err});
                }
                res.json(Blogs.mdToHtml(doc,['content','title']));
            }
        );
    }
    getListByDate(req,res,next){
        let createMonth = moment(req.query.createTime).format();
        let firstDay = moment(createMonth).startOf("month").format("YYYY-MM-DD");
        let lastDay = moment(createMonth).endOf("month").format("YYYY-MM-DD");

        let pageNo = parseInt(req.query.pageNo) || 1;
        let pageSize = parseInt(req.query.pageSize) || 10;
        BlogModel.find({createTime:{"$gte":firstDay,"$lt":lastDay}}).limit(pageSize).skip((pageNo-1)*pageSize).sort({'createTime':-1}).exec(
            function(err,doc){
                if(err){
                    return res.send({status:0,err:err});
                }
                res.json(Blogs.mdToHtml(doc,['content','title']));
            }
        );
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
    deleteBlog(req,res,next){
        BlogModel.findByIdAndRemove(req.params.id,function(err,doc){
            if(err){return res.send({status:0,err:err})}
            res.send({status:1,message:"删除成功"});
        })
    }
    updateBlog(req,res,next){
        const updateBlog = {
            'title':req.body.title,
            'content':req.body.content,
            'comments':[],
            'author':req.body.author,
            'tags':req.body.tags
        }
        BlogModel.findOneAndUpdate({_id:req.params.id},updateBlog,function(err,doc){
            if(err){return res.send(err)}
            res.send({status:1,message:"更新成功"});
        })
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

    static mdToHtml(mdDoc,attrArray){
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
        try {
            if(Array.isArray(mdDoc)){
                mdDoc.forEach((item,index) => {
                    attrArray.forEach((attr,i)=>{
                        item[attr] = marked(item[attr]);
                    });
                });
            }else{
                attrArray.forEach((attr,i)=>{
                    mdDoc[attr] = marked(mdDoc[attr]);
                });
            }
            
        } catch (error) {
            return mdDoc;
        }
        return mdDoc;
    }
}

module.exports = new Blogs();