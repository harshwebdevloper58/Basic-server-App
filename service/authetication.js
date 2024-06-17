const JWT=require("jsonwebtoken");

const secret ="harsh@2003";

function createjwtToken(user){

    const payload={
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
    };
    const token=JWT.sign(payload,secret);
    return token;
}


async function validatejwtToken(token){
    const payload=await JWT.verify(token,secret);
    return payload;
}

module.exports={
    createjwtToken,
    validatejwtToken,
}