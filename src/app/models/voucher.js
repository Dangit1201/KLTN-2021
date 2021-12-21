const mongoose = require("../../common/database")();

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantityPercent: {
    type: Number,
    
  },
  quantityMoneyMax: {
    type: Number,
    
  },
  quantityMoney: {
    type: Number,
    
  },
  timeStart: {
    type: Date,
    required: true,
    trim: true,
  },
  timeEnd: {
    type: Date,
    required: true,
    trim: true,
  },
  status:{
    type: String,
    enum: ["Có", "Không"],
    default: "Có",
  },
  type:{
    type: String,
    enum: ["Money", "Percent"],
    default: "Money",
  }
 }, {
    timestamps: true,
});

const VoucherModel = mongoose.model("Voucher", voucherSchema, "vouchers");
module.exports = VoucherModel;