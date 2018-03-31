var express = require("express");
var Blog = require("../controller/blogs");
var router = express.Router();

router.get("/all",Blog.getAllBlogs);

router.get("/getOne",Blog.getBlogById);

router.get("/getListByTag",Blog.getListByTag);

router.get("/getListByDate",Blog.getListByDate);

router.post("/postBlog",Blog.postBlog);
