const BlogsModel = require("../models/blog");
const fs = require("fs");
const path = require("path");
const UserModel = require("../models/user");

const index = async (req, res) => {

    const blogs = await BlogsModel.find().sort({"_id": -1});
    console.log(blogs);
    res.render("admin/blog/blog",{blogs});
};
const create = async (req, res) => {
    res.render("admin/blog/add_blog");  
};

const store = async (req,res)=>{
    const body = req.body;
    const file = req.file;
    const email= req.session.email_admin; 
    const user = await UserModel.find({email:email});
    for(let y of  user){
        const blog = {
            content: body.content,
            title: body.title,
            nameuser: y.full_name,
        } 
        if(file){
          const thumbnail = "products/"+file.originalname;
          blog["thumbnail"] = thumbnail;
          fs.renameSync(file.path, path.resolve("src/public/images", thumbnail)); 
          await BlogsModel(blog).save();
          res.redirect("/admin/blogs");
        }
    }
};

const edit = async (req, res) => {
  const id = req.params.id;
  const blog = await BlogsModel.findById(id);
  res.render("admin/blog/edit_blog",{blog});
};

const update = async (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  const file = req.file;
  const email= req.session.email_admin; 
    const user = await UserModel.find({email:email});
    for(let y of  user){
        const blog = {
            content: body.content,
            title: body.title,
            nameuser: y.full_name,
            } 
        if(file){
        const thumbnail = "products/"+file.originalname;
        blog["thumbnail"] = thumbnail;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail)); 
        }
        await BlogsModel.updateOne({_id: id}, {$set: blog});
        res.redirect("/admin/blogs");
    }
};

const dele = async (req, res) => {
  const id = req.params.id;
  await BlogsModel.deleteOne({_id: id});
  res.redirect("/admin/blogs");
};

module.exports = {
  index: index,
  create: create,
  edit: edit,
  dele: dele,
  store:store,
  update:update,
};