const UserModel = require("../models/user");
const paginate = require("../../common/paginate");


const index = async (req, res) => {
    let sort = req.query.sort;

    if(sort=='admin'){
      const users = await UserModel.find({role:'admin'}).sort({"_id": -1});
      res.render("admin/user/user2", 
      { 
          users: users,
          data: {},
          sort
      });
    }else if(sort=='user'){
      const users = await UserModel.find({role:'member'}).sort({"_id": -1});
      res.render("admin/user/user2", 
      { 
          users: users,
          data: {},
          sort
      });
    } else{
      sort = null;
      const users = await UserModel.find().sort({"_id": -1});
      res.render("admin/user/user2", 
      { 
          users: users,
          data: {},
          sort
      });
    }
    
    
};
  
const create = async (req, res) => {
    res.render("admin/user/add_user", {
      data: {},
    });
};
  
const store = async (req,res)=>{
  const body = req.body;
  let error;
  const email = body.email;
  const emailduplicate = await UserModel.find({email:email});
  if(emailduplicate.length>0){
    error = "Email đã tồn tại !";
  }
  else{
    const user = {
      full_name: body.full_name,
      email: body.email.toLowerCase(),
      phone: body.phone,
      address: body.address,
      password: body.pass,
      role: body.role,
      }
      console.log("user",user);
      
      await new UserModel(user).save();
      res.redirect("/admin/users");
  }

  res.render("admin/user/add_user",{data: {error: error}});
   
};
  
const edit = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.render("admin/user/edit_user",{
        user:user,
        data: {},
    });
};
  
const update = async (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  const user = {
      full_name: body.full_name,
      email: body.email.toLowerCase(),
      phone: body.phone,
      address: body.address,
      password: body.pass,
      role: body.role,
      } 
      await UserModel.updateOne({_id: id}, {$set: user});
      res.redirect("/admin/users");
};
  
const dele = async (req, res) => {
  const id = req.params.id;
  const users = await UserModel.find().sort({"_id": -1});
 // const productid = await UserModel.findById(id);
 // const colorIdUpdate= productid.color_id;
 // await ColorModel.deleteOne({_id: colorIdUpdate});
  await UserModel.deleteOne({_id: id});
  res.redirect("/admin/users");   
};

/* const searchUser = async (req, res) => {
  const keyword = req.body.data || "";
 // console.log("keyword",keyword)
  const filter = {};
  if(keyword){
      filter.$text = {$search: keyword}
  }
  // console.log(filter);
  const page = parseInt(req.query.page) || 1;
  const limit = 100;
  skip = page * limit - limit;

  const total = await UserModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total/limit);
  const users = await UserModel.find(filter).skip(skip)
                                            .limit(limit);
                                            
    res.render("admin/user/table_search", {
    keyword:keyword,
    users:users,
    pages: paginate(page, totalPage),
    page: page,
    totalPage: totalPage,
    });
 // console.log("users",users); 
};
const searchUserPagi = async (req, res) => {
  const keyword = req.body.data || "";
 // console.log("keyword",keyword)
  const filter = {};
  if(keyword){
      filter.$text = {$search: keyword}
  }
  // console.log(filter);
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  skip = page * limit - limit;

  const total = await UserModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total/limit);
  const users = await UserModel.find(filter).skip(skip)
                                            .populate()
                                            .limit(limit);
                                            // (paginate(page, totalPage);
    console.log('pages',paginate(page, totalPage));
    console.log('page',page);
    console.log('totalPage',totalPage);
    res.render("admin/user/pagi", {
    keyword:keyword,
    users:users,
    pages: paginate(page, totalPage),
    page: page,
    totalPage: totalPage,
    });
 // console.log("users",users); 
}; */

  
module.exports = {
    index: index,
    create: create,
    edit: edit,
    dele: dele,
    store:store,
    update:update,
    /* searchUser:searchUser,
    searchUserPagi:searchUserPagi, */
};