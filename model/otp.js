const {model,Schema} =require("mongoose");

const otpschema=new Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true,
    },
    optExpiration:{
        type:Date,
        default:Date.now,
        get:(optExpiration)=>optExpiration.getTime(),
        set:(optExpiration)=> new Date(optExpiration)
    }
},{timestamps:true},)

const OTP=model("Otp",otpschema)

module.exports=OTP;