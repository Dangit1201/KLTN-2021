//Bước 1: gọi file kết nối tới mongodb, phải có () để thực thi hàm và  lấy được giá trị của return là đối tượng mongoose
const mongoose = require("../../common/database")();

// Bước 2: sử dụng schema để mô tả collection
const blogSchema = new mongoose.Schema(
  {
    title:{
        type: String,
        required: true,
    },
    content: {
      type: String,
      default:null,
    },

    thumbnail:{
        type: String,
        required: true,
    },
    nameuser: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

// Bước 3: Biến lớp user schema thành Model
// có 3 tham số:
// tham số thứ 1: là bí danh của user khi được mô tả sang dạng model (đặt tên gì cũng được)
// tham số thứ 2: là đối tượng schema mới được khởi tạo
// tham số thứ 3: là tến collection mà schema quản lý
const BlogModel = mongoose.model("Blog", blogSchema, "blogs");

module.exports = BlogModel;