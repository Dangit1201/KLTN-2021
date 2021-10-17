require('dotenv').config();
const UserModel = require("../models/user");
const nodemailer= require("nodemailer");

const Login = (req, res) => {
  res.render("site/login/login", { data: {} });
};

const postLogin = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const pass = req.body.pass;
  var error;
  
  /**
   * email,password: là tên 2 trường trong collection user
   * lấy ra data và lưu vào user
   */
  const user = await UserModel.find({ email: email, password: pass });
  const totalCartItems1 = await req.session.cart.reduce((total, product)=>total + product.qty, 0);

  //console.log(user);

   if (user.length > 0 && totalCartItems1 > 0) {
    req.session.email_user = email;
    req.session.pass_user = pass; 
    res.redirect("/checkout");
    } else if (user.length > 0 ) {
      req.session.email_user = email;
      req.session.pass_user = pass; 
      res.redirect("/");
      }
    else{
      error = "Tài khoản không hợp lệ!";
    }
  res.render("site/login/login", { data: { error: error } });
};


const register = (req, res)=>{
    res.render("site/login/register",{ data: {} });
}
const registersuccess = async (req, res)=>{
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
        email: body.email,
        phone: body.phone,
        address: body.address,
        password: body.pass,
        }
        
        await new UserModel(user).save();
        res.render("site/login/registersuccess");
    }
  
    res.render("site/login/register",{data: {error: error}});
}

const adminLogin = (req, res) => {
  res.render("admin/login", { data: {} });
};
const adminPostLogin = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const pass = req.body.pass;
  let error;
  console.log(email)
  
  /**
   * email,password: là tên 2 trường trong collection user
   * lấy ra data và lưu vào user
   */
 
  const roleadmin = await UserModel.find({password: pass, email: email, role:"admin" });

  //console.log(user);

   if(roleadmin.length>0){
    // khoi tao session mail, pass
    req.session.email_admin = email;
    req.session.pass_admin = pass; 

    res.redirect("/admin");
    }
    else{
      error = "Tài khoản không hợp lệ hoặc bạn không phải admin!";
    }
    
  
  res.render("admin/login", { data: { error: error } });
};
const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
 
};
const adminlogout = async(req, res) => {
  await req.session.destroy();
  res.redirect("/adminlogin");
};
const forgetpass = (req,res)=>{
  var error;
  res.render("site/login/forgetpassword",{error});
}
const postFoget = async (req,res)=>{
  var error;
  const email = req.body.email;
  const duplicatemail = await UserModel.findOne({email:email});
  
  if(duplicatemail)
  {
    //step1
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:process.env.EMAIL,
          pass:process.env.PASSWORD
      }
    });
    //step2
    let mailOptions ={
      from:'Dangkhoashopdt@gmail.com',
      to:'dangit1201@gmail.com',
      subject:'Lấy lại mật khẩu Đăng Khoa Shop',
      text: `Để đặt lại mật khẩu của bạn, vui lòng nhấp vào liên kết này: http://localhost:3001/reset/${duplicatemail.id}`
      
    }
    //step3
    transporter.sendMail( mailOptions,function(err,data) {
      if(err){
          console.log("error sent",err);
      } else{
          console.log("email sent");
      }
    });
    res.render("site/login/forgetsuccess");
  } else{
    error="Email không chính xác !";
    res.render("site/login/forgetpassword",{error});
  }
 
}
const resetpass = (req,res)=>{
  var error;
  res.render("site/login/reset",{error});
}
const resetpass2 = async (req,res)=>{
  const id = req.params.id;
  var error;
  const user = await UserModel.findOne({_id:id});
  const body = req.body;
  if(body.newpass==body.new2pass){
        const user1 = {
            password: body.newpass,
        } 
        await UserModel.updateOne({_id: id}, {$set: user1});
        res.render("site/login/forgetsuccess2");
  } else{
        var error ="Mật khẩu nhập vào không trùng nhau!";
        res.render("site/login/reset",{error});
  }
}


module.exports = {
    Login: Login,
    postLogin: postLogin,
    register:register,
    registersuccess:registersuccess,
    adminLogin:adminLogin,
    adminPostLogin:adminPostLogin,
    adminlogout:adminlogout,
    logout:logout,
    forgetpass:forgetpass,
    postFoget:postFoget,
    resetpass:resetpass,
    resetpass2:resetpass2,
};