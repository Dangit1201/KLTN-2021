const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const AdvertisementsModel = require("../models/advertisement");
const BlogsModel = require("../models/blog");
const UserModel = require("../models/user");
module.exports = async (req, res, next)=>{

    if(req.session.email_user && req.session.pass_user){
        res.locals.usershare = 1;
    }else{
        res.locals.usershare = 2;
    }
    res.locals.categoriesshare = await CategoryModel.find({status:true}).sort({cout:1});
    res.locals.blogshare = await BlogsModel.find().sort({_id:-1}).limit(5);
    res.locals.advertisementsshare = await AdvertisementsModel.find({typeofadv:'banner'}).sort({_id:-1}).limit(8);
    res.locals.FeaturedProductsshare = await ProductModel.find({
        featured: true,
    }).sort({_id: -1}).limit(6);
    res.locals.totalCartItems = await req.session.cart.reduce((total, product)=>total + product.qty, 0);
    next();
}
