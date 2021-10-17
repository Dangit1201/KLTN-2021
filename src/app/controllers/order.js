const OrdersModel = require("../models/order");
const OrderdetailsModel = require("../models/orderdetails");
const ProductsModel = require("../models/product");


const index = async (req, res) => {

  let sort = req.query.sort;

  if(sort=='receiveorders'){
    const orders = await OrdersModel.find({status:"Tiếp nhận đơn hàng"}).sort({_id:-1});
    res.render("admin/order/order",{
        orders:orders,
        sort
    });
  }else if(sort=='orderconfirmation'){
    const orders = await OrdersModel.find({status:"Đã xác nhận đơn hàng"}).sort({_id:-1});
    res.render("admin/order/order",{
        orders:orders,
        sort
    });
  } else{
    sort = null;
    const orders = await OrdersModel.find({status:["Tiếp nhận đơn hàng","Đã xác nhận đơn hàng"]}).sort({status:1}).sort({_id:-1});
    res.render("admin/order/order",{
        orders:orders,
        sort
    });
  }

    
};

const edit = async (req, res) => {
  const id = req.params.id;
  const order = await OrdersModel.findById(id);
  const orderdetails = await OrderdetailsModel.find({idorder:order.idorder});
  res.render("admin/order/edit_order",{
    order,
    orderdetails,
  });
};

const update = async (req,res)=>{
  const id = req.params.id;
  const body = req.body;

  const order = {
    full_name: body.full_name,
    phone: body.phone,
    address: body.address,
    } 
    await OrdersModel.updateOne({_id: id}, {$set: order});
    res.redirect("/admin/orders");
};

const dele = async (req, res) => {
    const id = req.params.id;
    const order = await OrdersModel.find({_id:id});
    for(let x of order){
        const orderdetails = await OrderdetailsModel.find({idorder:x.idorder});
        /* console.log(orderdetails); */
        for(let y of orderdetails){
            /* console.log(y.idprd); */
            /* console.log(y.qty); */
            const product = await ProductsModel.findById(y.idprd);
        /*  console.log(product);
            console.log(product.quantity); */
            
            let quantity = parseInt(product.quantity) + parseInt(y.qty);
            await ProductsModel.updateOne({_id:y.idprd}, {$set: {quantity:quantity}});
        }
        await OrderdetailsModel.updateMany({idorder: x.idorder}, {$set: {status:"Hủy đơn hàng"}});       
    }
    await OrdersModel.updateOne({_id: id}, {$set: {status:"Hủy đơn hàng"}});
    res.redirect("/admin/orders");
};
const shipping = async (req,res)=>{
    const id = req.params.id;
    await OrdersModel.updateOne({_id: id}, {$set: {status:"Vận chuyển"}});
    res.redirect("/admin/orders");
};

const indextransport = async (req, res) => {
    const orders = await OrdersModel.find({status:"Vận chuyển"}).sort({updatedAt:-1});
    res.render("admin/order/ordertransport",{
        orders:orders,
  });
};
const shippinguser = async (req,res)=>{
  const id = req.params.id;
  const order = await OrdersModel.findById(id);
  if(order.payment=="Đã thanh toán online"){
    await OrdersModel.updateOne({_id: id}, {$set: {status:"Đã hoàn thành đơn hàng"}});
      res.redirect("/admin/ordertransport");
  } else{
      await OrdersModel.updateOne({_id: id}, {$set: {status:"Đã hoàn thành đơn hàng",payment:"Đã thanh toán cod"}});
      res.redirect("/admin/ordertransport");
  }
};
const viewtransport = async (req, res) => {
  const id = req.params.id;
  const order = await OrdersModel.findById(id);
  const orderdetails = await OrderdetailsModel.find({idorder:order.idorder});
  res.render("admin/order/ordertransportdetail",{
    order,
    orderdetails,
   
  });
};
const deletransport = async (req, res) => {
  const id = req.params.id;
  const order = await OrdersModel.find({_id:id});
  for(let x of order){
      const orderdetails = await OrderdetailsModel.find({idorder:x.idorder});
      /* console.log(orderdetails); */
      for(let y of orderdetails){
          /* console.log(y.idprd); */
          /* console.log(y.qty); */
          const product = await ProductsModel.findById(y.idprd);
      /*  console.log(product);
          console.log(product.quantity); */
          
          let quantity = parseInt(product.quantity) + parseInt(y.qty);
          await ProductsModel.updateOne({_id:y.idprd}, {$set: {quantity:quantity}});
      }
      await OrderdetailsModel.updateMany({idorder:x.idorder}, {$set: {status:"Hủy đơn hàng"}});       
  }
  await OrdersModel.updateOne({_id: id}, {$set: {status:"Hủy đơn hàng"}});
  res.redirect("/admin/ordertransport");
};
const orderconfirmation = async (req,res)=>{
  const id = req.params.id;
  await OrdersModel.updateOne({_id: id}, {$set: {status:"Đã xác nhận đơn hàng"}});
  res.redirect("/admin/orders");
};
const refund = async (req,res)=>{
  const orders= await OrdersModel.find({status:"Hủy đơn hàng",payment:"Đã thanh toán online"});
  res.render("admin/order/refund",{orders});
};
const orderdetail= async (req,res)=>{
  const id = req.body.data;
  const orderdetail = await OrderdetailsModel.find({idorder:id});
  const order = await OrdersModel.findOne({idorder:id});
  res.render("admin/order/detail",{orderdetail,order});
}
const refundsuccess= async (req,res)=>{
  const id = req.params.id;
  console.log(id);
  await OrdersModel.updateOne({idorder:id}, {$set: {payment:"Hoàn tiền"}});
  res.redirect("/admin/refund");
}

module.exports = {
  index: index,
  edit: edit,
  dele: dele,
  update:update,
  shipping:shipping,
  indextransport:indextransport,
  shippinguser:shippinguser,
  viewtransport:viewtransport,
  deletransport:deletransport,
  orderconfirmation:orderconfirmation,
  refund:refund,
  orderdetail:orderdetail,
  refundsuccess:refundsuccess,
};