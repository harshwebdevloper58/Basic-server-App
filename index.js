const express=require("express");
const path=require("path")
const userRoutes=require("./routes/user")
const mongoose=require("mongoose")
const app=express();
const cookieparser = require("cookie-parser");
const {checkForAuthenticationcookies}=require("./middleware/authentication")

PORT=8000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "HTML")));
app.use(cookieparser());


app.use(checkForAuthenticationcookies("token"));

app.use("/",userRoutes)

mongoose.connect('mongodb://localhost:27017/nodepractics')
.then(()=>console.log("mongodb is connected"))
.catch(err=>console.log("mongodb connection error :",err))

app.listen(PORT,()=>{
    console.log(`server started at PORT ${PORT}`);
})
