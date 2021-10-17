const AdvertisementsModel = require("../models/advertisement");
const fs = require("fs");
const path = require("path");

const index = async (req, res) => {
    let sort = req.query.sort || null;
     if(!(sort==null)){ 
      const advertisements = await AdvertisementsModel.find({typeofadv:sort}).sort({"_id": -1});
      res.render("admin/advertisement/advertisement",{advertisements,sort});
     } else{
      const advertisements = await AdvertisementsModel.find().sort({"_id": -1});
      res.render("admin/advertisement/advertisement",{advertisements,sort});
    } 
};
const create = async (req, res) => {
    res.render("admin/advertisement/add_advertisement");
};

const store = async (req,res)=>{
  const body = req.body;
  const file = req.file;

  const advertisement = {
    content: body.content,
    link: body.link,
    typeofadv: body.typeofadv,
    } 
    /* console.log('advertisement',advertisement); */

    if(file){
  
      const thumbnail = "products/"+file.originalname;
      advertisement["thumbnail"] = thumbnail;
      fs.renameSync(file.path, path.resolve("src/public/images", thumbnail)); 
      await AdvertisementsModel(advertisement).save();
      res.redirect("/admin/advertisements");
    }
 
};

const edit = async (req, res) => {
  const id = req.params.id;
  const advertisement = await AdvertisementsModel.findById(id);
  res.render("admin/advertisement/edit_advertisement",{
    advertisement
  });
};

const update = async (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  const file = req.file;

  const advertisement = {
    content: body.content,
    link: body.link,
    typeofadv: body.typeofadv,
    } 
    if(file){
      const thumbnail = "products/"+file.originalname;
      advertisement["thumbnail"] = thumbnail;
      fs.renameSync(file.path, path.resolve("src/public/images", thumbnail)); 
    }
    await AdvertisementsModel.updateOne({_id: id}, {$set: advertisement});
    res.redirect("/admin/advertisements");
};

const dele = async (req, res) => {
  const id = req.params.id;
  await AdvertisementsModel.deleteOne({_id: id});
  res.redirect("/admin/advertisements");
};


module.exports = {
  index: index,
  create: create,
  edit: edit,
  dele: dele,
  store:store,
  update:update,
};