// Bước 1: gọi file kết nối tới mongodb, phải có () để thực thi hàm và  lấy được giá trị của return là đối tượng mongoose
const mongoose = require("../../common/database")();

// Bước 2: sử dụng schema để mô tả collection user
const orderSchema = mongoose.Schema({
  full_name: {
    type: String,
    // không được để trống
    required: true,
   // text: true,
  },

  email: {
    type: String,
    // không được trùng
    required: true,
  },
  phone: {
    type: String,
    // không được trống
    required: true,
  },
  address: {
    type: String,
    // không được trống
    required: true,
  },

  note: {
    type: String,
    default: null,
  },
  totalprd: {
    type: Number,
    required: true,
  },
  idorder: {
    type: String,
    required: true,
  },
  iduser: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    // người dùng chỉ được phép nhập giá trị thuộc tập mảng enum
    enum: ["Tiếp nhận đơn hàng","Đã xác nhận đơn hàng", "Vận chuyển","Đã hoàn thành đơn hàng","Hủy đơn hàng"],
    default: "Tiếp nhận đơn hàng",
  },
  payment: {
    type: String,
    enum: ["Đã thanh toán online","Chưa thanh toán","Đã thanh toán cod","Hoàn tiền"],
    default: "Chưa thanh toán",
  },
  totalprice: {
    type: Number,
    required: true,
  },
  totalimportprice: {
    type: Number,
    required: true,
  },
  
}, {
    timestamps: true, 
});

// Bước 3: Biến lớp user schema thành Model
// có 3 tham số:
// tham số thứ 1: là bí danh của user khi được mô tả sang dạng model (đặt tên gì cũng được)
// tham số thứ 2: là đối tượng schema mới được khởi tạo
// tham số thứ 3: là tến collection mà schema quản lý (ở đây là collection user)
const OrderModel = mongoose.model("Order", orderSchema, "orders");

module.exports = OrderModel;