const ProductsModel = require("../models/product");
const CategoriesModel = require("../models/category");
const slug = require("slug");
const paginate = require("../../common/paginate");
const fs = require("fs");
const path = require("path");
const ColorModel = require("../models/color");
const CommentModel = require("../models/comment");
const CategoryModel = require("../models/category");


const index = async (req, res) => {
    const categories = await CategoryModel.find().sort({"cout":1});
    const sort = req.query.sort;
    for(x in categories){
    if(sort==categories[x].id){
    const products = await ProductsModel.find({cat_id:sort})
                                        .populate({ path: "cat_id" })
                                        .sort({"_id": -1});
    res.render("admin/product/product", 
    { 
        products: products,
        categories:categories,
        data: {}
    });
  } 
}
  if(sort==null){
    const products = await ProductsModel.find()
                                        .populate({ path: "cat_id" })
                                        .sort({"_id": -1});
    res.render("admin/product/product", 
    { 
        products: products,
        categories:categories,
        data: {}
    });
  }


}

const create = async (req, res) => {
  const categories = await CategoriesModel.find().sort({cout:1});
    res.render("admin/product/add_product", {
      categories:categories,
      data: {},
    });
};

const store = async (req,res)=>{
  const body = req.body;
  const file = req.file;
  let error;
  const slugname = slug(body.name);
  const slugduplicate = await ProductsModel.find({slug:slugname});
  const categories = await CategoriesModel.find().sort({cout:1});
    if(slugduplicate.length > 0){
      error = "Sản phẩm đã tồn tại !";
    }
    else{
      const color={
        red: body.red === "on",
        while: body.while === "on",
        blue: body.blue === "on",
        yellow: body.yellow === "on",
        black: body.black === "on",
      }
      const product = {
        description: body.description,
        cat_id: body.cat_id,
        price: body.price,
        memory:body.memory,
        ram:body.ram,
        importprice:body.importprice,
        quantity: body.quantity,
        featured: body.featured === "on",
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        name: body.name,
        slug: slug(body.name),
        }
        if(file){
          const thumbnail = "products/"+file.originalname;
          product["thumbnail"] = thumbnail;
          fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
          const addcolor = await new ColorModel(color).save();
          product.color_id = addcolor.id;
          //console.log("cat_id",product.cat_id);
          //console.log("ColorModel(color)._id",product);
          await ProductsModel(product).save();
          res.redirect("/admin/products");
        }
  }
  res.render("admin/product/add_product", {
    data: {error: error},
    categories:categories
  });
 
};

const edit = async (req, res) => {
  const categories = await CategoriesModel.find();
  const id = req.params.id;
  const product = await ProductsModel.findById(id).populate({ path: "color_id" })
  //console.log("product",product.color_id.yellow);
  res.render("admin/product/edit_product",{
    product:product,
    categories:categories
  });
};

const update = async (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  const file = req.file;
  const productid = await ProductsModel.findById(id);
  var quantityupdate=  Number(productid.quantity) + Number(body.quantity);
  const colorIdUpdate= productid.color_id;

  const color={
    red: body.red === "on",
    while: body.while === "on",
    blue: body.blue === "on",
    yellow: body.yellow === "on",
    black: body.black === "on",
  }
  const product = {
    description: body.description,
    cat_id: body.cat_id,
    price: body.price,
    memory:body.memory,
    ram:body.ram,
    importprice:body.importprice,
    quantity: quantityupdate,
    featured: body.featured === "on",
    promotion: body.promotion,
    warranty: body.warranty,
    accessories: body.accessories,
    name: body.name,
    slug: slug(body.name),
    color_id:colorIdUpdate,
    }
     //console.log('product',product);
    if(file){
        const thumbnail = "products/"+file.originalname;
        product["thumbnail"] = thumbnail;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
      }
      const editcolor = await ColorModel.updateOne({_id: colorIdUpdate}, {$set: color});
      await ProductsModel.updateOne({_id: id}, {$set: product});
      res.redirect("/admin/products");
};

const dele = async (req, res) => {
  const id = req.params.id;
  const productid = await ProductsModel.findById(id);
  const colorIdUpdate= productid.color_id;
  await ColorModel.deleteOne({_id: colorIdUpdate});
  await ProductsModel.deleteOne({_id: id});
  await CommentModel.deleteOne({prd_id:id });
  res.redirect("/admin/products");
};
const test = async (req, res) => {
  const products = await ProductsModel.find()                                   
  res.render("admin/product/test",{products})
};

//comment
const commentindex = async (req, res) => {
  const comments = await CommentModel.find().sort({"_id": -1});
  res.render("admin/comment/comment", 
  { 
      comments: comments,
  });
};
const commentdele = async (req, res) => {
  const id = req.params.id;
  await CommentModel.deleteOne({_id: id });
  res.redirect("/admin/comments");
};



module.exports = {
  index: index,
  create: create,
  edit: edit,
  dele: dele,
  store:store,
  update:update,
  test:test,
  commentindex:commentindex,
  commentdele:commentdele,
}