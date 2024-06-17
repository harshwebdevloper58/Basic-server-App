const {model,Schema} =require("mongoose");

const userSchema=new Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
},{timestamps:true},)

const User=model("user",userSchema);

module.exports=User;