const express = require('express');
const logger = require('morgan');
const router = require("../routers/web");
const config = require("config");
const session = require("express-session");


const app = express();


//middlewares
//app.use(logger('dev'));

// cấu hình
// cấu hình key "views" và đường dẫn tới folder views
// bắt đầu từ trong thư mục views
app.set("views", config.get("app").views_folder);
// thông báo cho app là sử dụng template ejs
app.set("view engine", config.get("app").view_engine);

// đường dẫn tới các file tĩnh (css,....)
// /static đang là thư mục public
app.use("/static", express.static(config.get("app").static_folder));

// doc data tu form voi 2 loai data la text, json
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// config session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("app").session_key,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: config.get("app").session_secure }
}));

// Share
app.use(require("../app/middlewares/cart"));
app.use(require("../app/middlewares/share"));



//routers
app.use(router);

//cath 404 errors
/* app.use((req,res,next)=>{
    const err = new Error('Not found');
    err.status = 404;
    next(err);
}); */

//error handler function
/* app.use((err,req,res,next)=>{
    //err loi,lay status ko mac dinh 500
    const error = app.get('env') ==='development'? err:{};
    const status = err.status || 500;
    
    //response to client
     return res.status(status).json({
        error:{
            message : error.message
        }
    });
}); */


// export app để file www.js dùng
module.exports = app;


