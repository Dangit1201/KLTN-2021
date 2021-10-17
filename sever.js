require('dotenv').config();
const nodemailer= require("nodemailer");

//test email
//step1
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});
//step2
let mailOptions ={
    from:'Dangkhoashopdt@gmail.com',
    to:'dangit1201@gmail.com',
    subject:'testing and testing',
    text:'It works'
}
//step3
transporter.sendMail( mailOptions,function(err,data) {
    if(err){
        console.log("error sent",err);
    } else{
        console.log("email sent");
    }
});