const sendShopToken= (seller,statusCode,res) =>{
    // console.log("welcome at send token function");
   const token =seller.getJwtToken();

//    console.log("your getJwtToken is given below",token)
//    option for Cookies
const options = {
    httponly:true,
    expires:new Date(Date.now()  + 90*24*60*60*1000)
}

res
.status(statusCode)
.cookie("seller_token",token,options)
.json({
    message:"successfully verified seller",
    success:true,
    seller,
    token
})
}

module.exports = {sendShopToken}