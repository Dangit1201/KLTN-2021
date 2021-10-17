const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const paginate = require("../../common/paginate");
const CommentModel = require("../models/comment");
const AdvertisementsModel = require("../models/advertisement");
const UserModel = require("../models/user");
const OrderModel = require("../models/order");
const OrderdetailsModel = require("../models/orderdetails");
const BlogsModel = require("../models/blog");
const transporter = require("../../common/transporter");
const config = require("config");
const ejs = require("ejs");
const path = require("path");
const dateFormat = require('dateformat');
const sha256 = require('sha256');
const querystring = require('qs');


const home = async (req, res)=>{
    
    const LatestProducts = await ProductModel.find().sort({_id: -1}).limit(6);
    const sliders = await AdvertisementsModel.find({typeofadv:"slider"}).sort({_id: -1}).limit(3);
    const FeaturedProducts = await ProductModel.find({
        featured: true,
    }).sort({_id: -1}).limit(6);
    res.render("site/index", {
        LatestProducts:LatestProducts,
        FeaturedProducts:FeaturedProducts,
        sliders:sliders,
    });
}
const category = async (req, res)=>{
    const id = req.params.id;
    let ram = req.query.ram;
    let memory = req.query.memory;
                                        
    const category = await CategoryModel.findById({_id:id});
    const title = category.title
    
        let sort = req.query.sort || null;
        if(sort==='14'){
            
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
            const total = await ProductModel.find({cat_id:id,price:{ $gte:1000000 , $lte:4000000}}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:1000000 , $lte:4000000}})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category,
                ram,
                memory
                });
        }else if(sort=='48'){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
    
            
            const total = await ProductModel.find({cat_id:id,price:{ $gte:4000000 , $lte:8000000}}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:4000000 , $lte:8000000}})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
    
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category,
                ram,
                memory
                });
        }else if(sort==='815'){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
    
            const total = await ProductModel.find({cat_id:id,price:{ $gte:8000000 , $lte:15000000}}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:8000000 , $lte:15000000}})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category,
                ram,
                memory
                });
        }else if(sort==='1522'){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
    
            const total = await ProductModel.find({cat_id:id,price:{ $gte:15000000 , $lte:22000000}}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:15000000 , $lte:22000000}})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category,
                ram,
                memory
                });
        }else if(sort==='gte22'){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
            const total = await ProductModel.find({cat_id:id,price:{ $gte:22000000 }}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:22000000 }})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": -1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category,
                ram,
                memory
                });
        }else if(ram){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
            const total = await ProductModel.find({cat_id:id,ram:ram}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,ram:ram})
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                category:category,
                title:title,
                sort,
                ram,
                memory,
                });
        } else if(memory){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
            const total = await ProductModel.find({cat_id:id,memory:memory}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,memory:memory})
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                title:title,
                totalPage: totalPage,
                category:category,
                sort,
                ram,
                memory,
                });
        } else{
            sort = null;
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
            const total = await ProductModel.find({cat_id:id}).countDocuments();
            const totalPage = Math.ceil(total/limit);
            
            const products = await ProductModel.find({cat_id:id})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"_id": -1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category,
                ram,
                memory
                });
        }




}
const product = async (req, res)=>{
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    skip = page * limit - limit;

    const total = await CommentModel.find({prd_id: id}).countDocuments();
    const totalPage = Math.ceil(total/limit);
    const product = await ProductModel.findById(id).populate('color_id');
    const comments = await CommentModel.find({prd_id: id}).skip(skip)
                                                        .limit(limit);
    const relatedProducts = await ProductModel.find(
        {$and:[{'price': {$gte: product.price-(product.price/10) , $lte: product.price+(product.price/10)}}]}
    ).sort({_id: -1}).limit(5);
    
    res.render("site/product-detail", {
        product,
        relatedProducts,
        comments,
        pages: paginate(page, totalPage),
        page: page,
        totalPage: totalPage,
    });
}


const success = (req, res)=>{
    res.render("site/success");
}
const comment = async (req, res)=>{
    const id = req.params.id.toString();
    const productcomment = await ProductModel.findById(id);
    const comment = {
        prd_id: id,
        rating: req.body.star,
        full_name: req.body.full_name,
        email: req.body.email,
        body: req.body.body,
        name: productcomment.name,
    }
    await new CommentModel(comment).save();
    res.redirect(req.path);
}

const allcategory = async (req, res)=>{
    let sort = req.query.sort;
    let ram = req.query.ram;
    let memory = req.query.memory;
    if(sort=='14'){
        
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;
        const total = await ProductModel.find({price:{ $gte:1000000 , $lte:4000000}}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:1000000 , $lte:4000000}})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            ram,
            memory,
            });
    }else if(sort=='48'){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;

        console.log('sort48',typeof(sort))
        const total = await ProductModel.find({price:{ $gte:4000000 , $lte:8000000}}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:4000000 , $lte:8000000}})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        console.log("product.js",products);
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            ram,
            memory,
            });
    }else if(sort==='815'){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;

        const total = await ProductModel.find({price:{ $gte:8000000 , $lte:15000000}}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:8000000 , $lte:15000000}})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            ram,
            memory,
            });
    }else if(sort=='1522'){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;

        
        const total = await ProductModel.find({price:{ $gte:15000000 , $lte:22000000}}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:15000000 , $lte:22000000}})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        console.log("product.js",products);
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            ram,
            memory,
            });
    }else if(sort==='gte22'){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;
        const total = await ProductModel.find({price:{ $gte:22000000 }}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:22000000 }})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            ram,
            memory,
            });
    }else if(ram){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;
        const total = await ProductModel.find({ram:ram}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({ram:ram})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            ram,
            memory,
            });
    } else if(memory){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;
        const total = await ProductModel.find({memory:memory}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({memory:memory})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            ram,
            memory,
            });
    } else { 
        sort = null;
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;
        const total = await ProductModel.find().countDocuments();
        const totalPage = Math.ceil(total/limit);
        
        const products = await ProductModel.find()
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"_id": -1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            ram,
            memory,
            });
    }
 
}

const autocomplete = async (req, res)=>{
    var regax = new RegExp(req.query["term"],'i'); 
   try{
       let result = await ProductModel.find({name:regax}).sort({"updatedAt":-1}).sort({"createdAt":-1}).limit(8); 
       res.send(result);
   } catch(e){
       res.status(500).send({message:e.message});
   }
    
}
const search = async(req, res)=>{
    var keyword = req.query.term;
    var regax = new RegExp(req.query["term"],'i');

    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    skip = page * limit - limit;
    let total = await ProductModel.find({name:regax}).countDocuments();
    const totalPage = Math.ceil(total/limit);

    let products = await ProductModel.find({name:regax}).sort({"updatedAt":-1}).sort({"createdAt":-1}).skip(skip)
    .limit(limit); 
     
    res.render("site/search",{products,
        keyword,
        pages: paginate(page, totalPage),
        page: page,
        totalPage: totalPage,
    });
}
const searchallcat = async (req, res)=>{
    const keyword = req.body.data || "";
    
    var regax = new RegExp(keyword,'i');
    let products = await ProductModel.find({name:regax}).sort({"updatedAt":-1}).sort({"createdAt":-1});

    res.render("site/components/table",{products,keyword});
}
const cart = (req, res)=>{
    const products = req.session.cart;
    var err='';
    res.render("site/cart",{products, totalPrice: 0,totalprd:0,totalPricePrd:0,err});
}

const addToCart = async (req, res)=>{
    const body = req.body;
    const items = req.session.cart;

    //	Sản phẩm mua rồi thì tăng số lượng
	let isUpdate = false;
    items.map((item)=>{
        if(body.id === item.id && body.color=== item.color){
            isUpdate = true;
            item.qty += parseInt(body.qty);
        }
        return item;
    });

    //	Sản phẩm chưa mua thì thêm mới
	if(!isUpdate){
        const product = await ProductModel.findById(body.id);
        items.push({
            id: product._id,
            name: product.name,
            price: product.price,
            img: product.thumbnail,
            importprice:product.importprice,
            qty: parseInt(body.qty),
            color: body.color,
        });
    }
    req.session.cart = items;
    console.log("items",items);
    res.redirect("/cart");
}

const delCart = (req, res)=>{
    const id = req.params.id;
    const items = req.session.cart;
    items.map((item, key)=>{
        if(item.id === id){
            items.splice(key, 1);
        }
        return item;
    });
    req.session.cart = items;
    res.redirect("/cart");
} 
const updateCart = async(req, res) => {
    const products = req.body.products;
    const body = req.body;   
    const items = req.session.cart;
    
    await items.map((item,key) => { 
        if (products[item.color][item.id]) {
            
            item.qty = parseInt(products[item.color][item.id]);
        }
        if (item.qty=='0') {
            
            items.splice(key, 1);
        }
        return item;
    });
   /*  console.log(items); */
    res.redirect("/cart"); 
}
const checkout = async (req, res)=>{

        const products = req.session.cart;
        var err="";
        var price=0;
        var idprdduplicateid ="";
        var totalPrice=0;
        var totalprd=0;

        const lookup = products.reduce((a, e) => {
            a[e.id] = ++a[e.id] || 0;
            return a;
        }, {});
        const duplicateids = products.filter(e => lookup[e.id])
       /*  console.log(duplicateids); */
        for(let duplicateid of duplicateids){
            const prd = await ProductModel.findById(duplicateid.id);
            if(prd.id==duplicateid.id){
                price +=duplicateid.qty;
                if(price>prd.quantity){
                    err=`Bạn đã mua quá số lượng còn lại ${prd.name} !!!`;
                  /*   console.log(err); */
                    res.render("site/cart",{products, totalPrice: 0,totalprd:0,totalPricePrd:0,err});
                }/* else{
                    totalPrice += product.qty * product.price
                    totalprd += product.qty
                } */
            }
            
        }

        
        for(let product of products){
            const prd = await ProductModel.findById(product.id);
            if(product.qty>prd.quantity){
                err=`Bạn đã mua quá số lượng còn lại ${prd.name} !!!`;
                console.log(err);
                res.render("site/cart",{products, totalPrice: 0,totalprd:0,totalPricePrd:0,err});
            }else{
                totalPrice += product.qty * product.price
                totalprd += product.qty
            }
            
        }
        const pass = req.session.pass_user;
        const email = req.session.email_user;
        const user = await UserModel.find({password: pass, email: email});
        res.render("site/checkout",{user,totalPrice,totalprd});
  
    
}
const successcheckout = async (req, res)=>{

    const body = req.body;
    const products = req.session.cart;
    if(body.pay==0){
        var today = new Date();
        const iduser = await  UserModel.findOne({email:req.session.email_user,password:req.session.pass_user});
        var totalimportprice =0;
        const idorder = iduser.id+'-'+today.getDate()+''+(today.getMonth()+1)+''+today.getFullYear()+''+today.getHours() + "" + today.getMinutes()+""+ today.getSeconds();
        for(let product of products){
            totalimportprice +=product.qty*product.importprice; 
            if(product.id){
                const productid = await ProductModel.findById(product.id);
                const quantity = productid.quantity-product.qty;
                await ProductModel.updateOne({_id:product.id}, {$set: {quantity:quantity}});
            }    
            orderdetails ={
                qty:parseInt(product.qty),
                price:parseInt(product.price),
                color:product.color,
                img:product.img,
                name:product.name,
                importprice:parseInt(product.importprice),
                idorder:idorder,
                idprd:product.id,
            }
            await OrderdetailsModel(orderdetails).save();
        
        }
        const order = {
            full_name: body.full_name,
            email: body.email.toLowerCase(),
            phone: body.phone,
            address: body.address,
            note:body.note,
            totalprd:parseInt(body.totalprd),
            totalprice:parseInt(body.totalPrice),
            totalimportprice:parseInt(totalimportprice),
            idorder:idorder,
            iduser:iduser.id,
            payment:"Chưa thanh toán",
            }
        await OrderModel(order).save();
        //gui mail
            // Lấy ra đường dẫn đến thư mục views
            const viewPath = req.app.get("views");
            // Compile template EJS sang HTML để gửi mail cho khách hàng
            const html = await ejs.renderFile(
                path.join(viewPath, "site/email-order.ejs"),
                {
                    full_name: body.full_name,
                    phone: body.phone,
                    email: body.email,
                    address: body.address,
                    /* url: config.get("app.url"), */
                    totalPrice: 0,
                    products,
                    pay:body.pay,
                }
            );
            // Gửi mail
            await transporter.sendMail({
                to: body.email,
                from: "Đăng Khoa Shop",
                subject: "Xác nhận đơn hàng từ Đăng Khoa Shop",
                html,
            });
        

        req.session.cart=[];
        res.redirect("/success"); 
    } else{

        var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
        
        var tmnCode = config.get("vnpay").vnp_TmnCode;//1
        var secretKey = config.get("vnpay").vnp_HashSecret;//2
        var vnpUrl = config.get("vnpay").vnp_Url;//3
        var returnUrl = config.get("vnpay").vnp_ReturnUrl;//4

        var today = new Date();
        
        const iduser = await  UserModel.findOne({email:req.session.email_user,password:req.session.pass_user});
        var totalimportprice =0;
        const idorder = iduser.id+'-'+today.getDate()+''+(today.getMonth()+1)+''+today.getFullYear()+''+today.getHours() + "" + today.getMinutes()+""+ today.getSeconds();
        for(let product of products){
            totalimportprice +=product.qty*product.importprice; 
            if(product.id){
                const productid = await ProductModel.findById(product.id);
                const quantity = productid.quantity-product.qty;
                await ProductModel.updateOne({_id:product.id}, {$set: {quantity:quantity}});
            }    
            orderdetails ={
                qty:parseInt(product.qty),
                price:parseInt(product.price),
                color:product.color,
                img:product.img,
                name:product.name,
                importprice:parseInt(product.importprice),
                idorder:idorder,
                idprd:product.id,
            }
            await OrderdetailsModel(orderdetails).save();
        
        }
        const order = {
            full_name: body.full_name,
            email: body.email.toLowerCase(),
            phone: body.phone,
            address: body.address,
            note:body.note,
            totalprd:parseInt(body.totalprd),
            totalprice:parseInt(body.totalPrice),
            totalimportprice:parseInt(totalimportprice),
            idorder:idorder,
            iduser:iduser.id,
            payment:"Đã thanh toán online",
            }
        await OrderModel(order).save();
        //gui mail
            // Lấy ra đường dẫn đến thư mục views
            const viewPath = req.app.get("views");
            // Compile template EJS sang HTML để gửi mail cho khách hàng
            const html = await ejs.renderFile(
                path.join(viewPath, "site/email-order.ejs"),
                {
                    full_name: body.full_name,
                    phone: body.phone,
                    email: body.email,
                    address: body.address,
                    /* url: config.get("app.url"), */
                    totalPrice: 0,
                    products,
                    pay:body.pay,
                }
            );
            // Gửi mail
            await transporter.sendMail({
                to: body.email,
                from: "Đăng Khoa Shop",
                subject: "Xác nhận đơn hàng từ Đăng Khoa Shop",
                html,
            });
        
        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = req.body.totalPrice;//5
        var bankCode = '';//6
        var orderInfo = idorder;//7
        var currCode = 'VND';
        var vnp_Params = {};
    
        vnp_Params['vnp_Version'] = '2';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = 'topup';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var querystring = require('qs');
        var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

        var sha256 = require('sha256');

        var secureHash = sha256(signData);

        vnp_Params['vnp_SecureHashType'] =  'SHA256';
        vnp_Params['vnp_SecureHash'] = secureHash;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });

        res.redirect(vnpUrl);
    }
    
    
}
const vnpayreturn= async (req,res,next)=>{
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = config.get("vnpay").vnp_TmnCode;
    var secretKey = config.get("vnpay").vnp_HashSecret;

   
    var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

    var checkSum = sha256(signData);

    if(secureHash === checkSum){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        if(vnp_Params['vnp_ResponseCode']==24){
            const id= vnp_Params['vnp_OrderInfo'];
            const order = await OrderModel.findOne({idorder:id});
            const orderdetails = await OrderdetailsModel.find({idorder:id});
                for(let y of orderdetails){
                    const product = await ProductModel.findById(y.idprd);
                    let quantity = parseInt(product.quantity) + parseInt(y.qty);
                    await ProductModel.updateOne({_id:y.idprd}, {$set: {quantity:quantity}});
                }
            await OrderdetailsModel.deleteMany({idorder:id});
            await OrderModel.deleteOne({idorder:id});
            res.render('site/success1', {code: vnp_Params['vnp_ResponseCode']})
        }
        else{
            req.session.cart=[];
            res.render('site/success1', {code: vnp_Params['vnp_ResponseCode']});
        }
        
    } else{
        req.session.cart=[];
        res.render('site/success1', {code: '97'});
        
       
    }
}
const vnpayipn= async (req,res,next)=>{
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = config.get("vnpay").vnp_HashSecret;
    
    var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
    
    var sha256 = require('sha256');

    var checkSum = sha256(signData);

    if(secureHash === checkSum){
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({RspCode: '00', Message: 'success'})
    }
    else {
        res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
    }
}
function sortObject(o) {
    var sorted = {},
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}
const contact = (req, res)=>{
    res.render("site/contact");
}

const blogdetail =async (req, res)=>{
    const id = req.params.id;
    const blog = await BlogsModel.findById(id);
    res.render("site/blogdetail",{blog});
}
const blog = async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    skip = page * limit - limit;
    const total = await BlogsModel.find().countDocuments();
    
    const totalPage = Math.ceil(total/limit);

    const blogs = await BlogsModel.find().sort({_id:-1})
                                        .skip(skip)
                                        .limit(limit);
    res.render("site/blog",{
        pages: paginate(page, totalPage),
        page: page,
        totalPage: totalPage,
        blogs,
    });
}
const account = async (req, res)=>{
    var err=null;
    const user = await UserModel.findOne({email:req.session.email_user})
    const orders = await OrderModel.find({iduser:user.id}).sort({createdAt:-1});
    res.render("site/my-account",{user,
        orders,
        err
    });
}
const editif = async (req, res)=>{
    
    const id = req.params.id;
    const body = req.body;
    const user = {
      full_name: body.full_name,
     
      phone: body.phone,
      address: body.address,
      } 
      await UserModel.updateOne({_id: id}, {$set: user});
      res.redirect("/account");
}
const editpass = async (req, res)=>{
    const user = await UserModel.findOne({email:req.session.email_user});
    const orders = await OrderModel.find({iduser:user.id}).sort({createdAt:-1});
    const id = req.params.id;
    const body = req.body;
    if(user.password==body.password&&body.newpass==body.new2pass){
        const user1 = {
            password: body.newpass,
        } 
        await UserModel.updateOne({_id: id}, {$set: user1});
        res.redirect("/account");
    } else{
        var err ="Mật khẩu cũ chưa chính xác hoặc mật khẩu mới không trùng nhau!";
        res.render("site/my-account",{user,
            orders,
            err
        });
    }
   
}
const orderdetail= async (req,res)=>{
    const id = req.body.data;
    const orderdetail = await OrderdetailsModel.find({idorder:id});
    const order = await OrderModel.findOne({idorder:id});
    res.render("site/components/tableprd",{orderdetail,order});
}
const orderdelete= async (req,res)=>{
    const id = req.params.id;
    const order = await OrderModel.findOne({idorder:id});
    
    const orderdetails = await OrderdetailsModel.find({idorder:order.idorder});
        /* console.log(orderdetails); */
    for(let y of orderdetails){
            /* console.log(y.idprd); */
            /* console.log(y.qty); */
            const product = await ProductModel.findById(y.idprd);
        /*  console.log(product);
            console.log(product.quantity); */
            
            let quantity = parseInt(product.quantity) + parseInt(y.qty);
            await ProductModel.updateOne({_id:y.idprd}, {$set: {quantity:quantity}});
    }
    await OrderdetailsModel.updateMany({idorder:order.idorder}, {$set: {status:"Hủy đơn hàng"}});       
    await OrderModel.updateOne({idorder: id}, {$set: {status:"Hủy đơn hàng"}});
    res.redirect("/account");
}


module.exports = {
    home:home,
    category:category,
    product:product,
    search:search,
    cart:cart,
    success:success,
    comment:comment,
    allcategory:allcategory,
    contact:contact,
    account:account,
    blog:blog,
    autocomplete:autocomplete,
    searchallcat:searchallcat,
    addToCart:addToCart,
    delCart:delCart,
    updateCart:updateCart,
    checkout:checkout,
    successcheckout:successcheckout,
    blogdetail:blogdetail,
    editif,
    editpass,
    orderdetail,
    orderdelete,
    vnpayreturn,
    vnpayipn,
    
}