const sendToken= (user,statusCode,res) =>{
   const token =user.getJwtToken();

//    console.log("your getJwtToken is given below",token)
//    option for Cookies
const options = {
    httponly:true,
    expires:new Date(Date.now()  + 90*24*60*60*1000)
}

res
.status(statusCode)
.cookie("token",token,options)
.json({
    message:"successfully verified user",
    success:true,
    user,
    token
})
}

module.exports = {sendToken}