const VoucherModel = require("../models/voucher");
const moment = require("moment");

const create = async (req, res) => { 
  var err;   
    res.render("admin/voucher/add_voucher",{err});
};
const store = async (req, res) => {  

  var err ;
  const {...voucherReq} = req.body;
  const todayDate = new Date().toISOString().slice(0, 10);
  /* console.log("date",todayDate); */
  console.log(voucherReq);
  const voucherCodeExisted = await VoucherModel.findOne({code:voucherReq.voucherCode});
  /* console.log(voucherCodeExisted); */
  if(voucherCodeExisted!=null){
    err="code bị trùng !";
    res.render("admin/voucher/add_voucher",{err});
  } else if((voucherReq.since>voucherReq.toDate)||(voucherReq.since<todayDate)||(voucherReq.toDate<todayDate)){
    err="Ngày bắt đầu và ngày hết hạn không hợp lệ ";
    res.render("admin/voucher/add_voucher",{err});
  } else if(voucherReq.since==voucherReq.toDate){
    const status = (voucherReq.status==0) ? "Có" : "Không";
    const type = (voucherReq.type==0) ? "Money" : "Percent";
    const voucher ={
      name:voucherReq.voucherName,
      code:voucherReq.voucherCode,
      type:type,
      quantity:voucherReq.quantity,
      status:status,
      quantityMoney: voucherReq.quantityMoney,
      quantityPercent: voucherReq.quantityPercent,
      quantityMoneyMax: voucherReq.quantityMoneyMax,
      timeStart:moment(voucherReq.since).toDate() ,
      timeEnd: moment(voucherReq.toDate).endOf('day').toDate(),

    }
    await new VoucherModel(voucher).save();
    res.render("admin/voucher/add_voucher",{err});
  } else{
    const status = (voucherReq.status==0) ? "Có" : "Không";
    const type = (voucherReq.type==0) ? "Money" : "Percent";
    const voucher ={
      name:voucherReq.voucherName,
      code:voucherReq.voucherCode,
      type:type,
      quantity:voucherReq.quantity,
      status:status,
      quantityMoney: voucherReq.quantityMoney,
      quantityPercent: voucherReq.quantityPercent,
      quantityMoneyMax: voucherReq.quantityMoneyMax,
      timeStart:moment(voucherReq.since).toDate(),
      timeEnd: moment(voucherReq.toDate).toDate(),

    }
    await new VoucherModel(voucher).save();
    res.render("admin/voucher/add_voucher",{err});
  }
};

module.exports = {
  create,
  store
};