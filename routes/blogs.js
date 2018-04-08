var express = require("express");
var Blog = require("../controller/blogs");
var router = express.Router();

router.get("/all",Blog.getAllBlogs);

router.get("/getOne/:id",Blog.getBlogById);

router.get("/getListByTag",Blog.getListByTag);

router.get("/getListByDate/:createTime",Blog.getListByDate);

router.post("/postBlog",Blog.postBlog);

router.delete("/deleteBlog/:id",Blog.deleteBlog);

router.put("/updateBlog/:id",Blog.updateBlog);

router.get("/groupByDate",Blog.getDateGroup);

router.get("/groupByTags",Blog.getTagsGroup);

module.exports = router;
