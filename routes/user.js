const { Router } = require("express");
const path = require("path");
const User = require("../model/user"); 
const {createjwtToken}=require("../service/authetication")
const router = Router();
const {otpverification}=require("../controller/otpverification")



router.get("/home", (req, res) => {
    //console.log(req.user)
    const dirName = path.join(__dirname, "../HTML", "index.html");
    return res.json(req.user).sendFile(dirName);
});

router.get("/signin", (req, res) => {
    //console.log(req.user)
    return res.sendFile(path.join(__dirname, "../HTML", "signin.html"));
});

router.get("/signup", (req, res) => {
    return res.sendFile(path.join(__dirname, "../HTML", "signup.html"));
});

router.get("/otpgenerator",(req,res)=>{
    return res.sendFile(path.join(__dirname, "../HTML", "emailverification.html"));
})

router.post("/signup", async (req, res) => {
    //console.log(req.body);
    const { fullname, email, password } = req.body;
    const isuser= User.findOne({email});
    
    if(isuser){
        console.log("user is exsist")
        return res.redirect("/home");
    }
    else{
        await User.create({
            fullname,
            email,
            password,
        });
        console.log("User created");
        return res.status(200).json({ message: "User created successfully" });
    }
});


router.post("/otpgenerator",otpverification)


router.post("/signin", async (req, res) => {
    const {email,password}=req.body;
    const isuser=await User.findOne({email:email,password:password});
    if(!isuser){
    return res.redirect("/signin");
    }else{
        const Token= await createjwtToken(isuser);
        return res.cookie("token",Token).redirect("/")
    }
});
module.exports = router;
