// Bước 1: gọi file kết nối tới mongodb, phải có () để thực thi hàm và  lấy được giá trị của return là đối tượng mongoose
const mongoose = require("../../common/database")();

// Bước 2: sử dụng schema để mô tả collection user
const orderdetailsSchema = mongoose.Schema({
    idorder: {
    type: String,
    // không được để trống
    required: true,
   // text: true,
    },
    img: {
        type: String,
        // không được trùng
        required: true,
    },
    name: {
        type: String,
        // không được trống
        required: true,
    },
    color: {
        type: String,
        // không được trống
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    importprice: {
        type: Number,
        required: true,
    },
    idprd: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        // người dùng chỉ được phép nhập giá trị thuộc tập mảng enum
        enum: ["Mua hàng","Hủy đơn hàng"],
        default: "Mua hàng",
      },
}, {
        timestamps: true,
});

// Bước 3: Biến lớp user schema thành Model
// có 3 tham số:
// tham số thứ 1: là bí danh của user khi được mô tả sang dạng model (đặt tên gì cũng được)
// tham số thứ 2: là đối tượng schema mới được khởi tạo
// tham số thứ 3: là tến collection mà schema quản lý (ở đây là collection user)
const OrderdetailsModel = mongoose.model("Orderdetails", orderdetailsSchema, "orderdetails");

module.exports = OrderdetailsModel;