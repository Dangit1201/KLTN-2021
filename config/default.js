require('dotenv').config()
// bat buoc phai export ra Object
module.exports = {
    // config cho app
    app: {
      port: 3001,
      // dường dẫn tới folder views để lấy giao diện
      // __dirname: đường dẫn đang ở trong folder config,
      // "/../src/app/views": đường dẫn để lấy views từ folder config
      views_folder: __dirname + "/../src/app/views",
      view_engine: "ejs",
      static_folder: __dirname + "/../src/public",
      session_key: "Dang",
      session_secure: false,
      tmp: __dirname+"/../temp",
    },
    mail: {
      host: "smtp.gmail.com",
      post: 587,
      secure: false,
      auth: {
          user: "dangkhoashopdt@gmail.com",
          pass: "Dangit1201",
      }
  },
  vnpay:{
      vnp_TmnCode:"BNA7XSDT",
      vnp_HashSecret:"EMBZEVYPRELTTBLYFBNEHCDYFXDBEBAH",
      vnp_Url:"http://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
      vnp_ReturnUrl: "http://localhost:3001/vnpay_return"
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET,
    google: {
      CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
    },
    facebook: {
      CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
      CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET
    }
  }

  };