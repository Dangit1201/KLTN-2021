const AdvertisementsModel = require("../models/advertisement");
const CategoryModel = require("../models/category");
const ProductsModel = require("../models/product");
const UsersModel = require("../models/user");
const CommentsModel = require("../models/comment");
const BlogsModel = require("../models/blog");
const OrdersModel = require("../models/order");
const moment = require("moment");



const index = async (req, res) => {
    function mulMonth(dateObj, numDays) {
      dateObj.setMonth(dateObj.getMonth() + numDays);
      return dateObj;
  }

  const from = moment().startOf('month').toDate(); // Hàm lấy thời gian hôm nay
  const today = moment().startOf('month').toDate();
  var to = mulMonth(today , 1);

  const users = await UsersModel.find();
  const totalUsers = users.length;
  const products = await ProductsModel.find();
  const totalProducts = products.length;
  const categories = await CategoryModel.find();
  const totalCategories = categories.length;
  const comments = await CommentsModel.find();
  const totalComments = comments.length;
  const adv = await AdvertisementsModel.find();
  const totalAdv = adv.length;
  const blogs = await BlogsModel.find();
  const totalBlogs = blogs.length;
  const newOrder = await OrdersModel.find({status:"Tiếp nhận đơn hàng",createdAt:{ $gte:from , $lte:moment(to).endOf('month').toDate() }});
  const totalNewOrder = newOrder.length;
  const transport = await OrdersModel.find({status:"Vận chuyển",createdAt:{ $gte:from , $lte:moment(to).endOf('month').toDate() }});
  const totalTransport = transport.length;
  const del = await OrdersModel.find({status:"Hủy đơn hàng",createdAt:{ $gte:from , $lte:moment(to).endOf('month').toDate() }});
  const totalDel = del.length;
  


  res.render("admin/admin-index",{
    totalUsers,
    totalProducts,
    totalCategories,
    totalComments,
    totalAdv,
    totalBlogs,
    totalNewOrder,
    totalTransport,
    totalDel
  });
};

module.exports = {
  index: index,
};