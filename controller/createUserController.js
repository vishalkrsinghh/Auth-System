

import jwt from "jsonwebtoken";
import userCollectionSchema from "../model/userCollectionSchema.js";

export default async function(req,res){

    try {
    // console.log(req.params.Jwt);
    let tokenDetail = await jwt.verify(req.params.Jwt, process.env.JWT_SECRET_KEY);
    // console.log(tokenDetail);
    // console.log(tokenDetail.name);
    if(tokenDetail){
        await userCollectionSchema.create({name:tokenDetail.name,email:tokenDetail.email,password:tokenDetail.paswd})
        res.send(`Email verified Successfully, Go To <a href="https://authsystem-h113.onrender.com/">LINK</a>  for Login. `,tokenDetail,tokenDetail.name);

    }else{
    
        res.status(200).json({
            message:"Invalid URL/Link."
        })
    }
    /// create user here;
    // decode jwt token and get from that name, email password.
    } catch (error) {
        // console.log(" er "," ",error);
        res.status(200).json({
            message:"Invalid URL/Link."
        })
        // res.status(500).json({
        //     Error: "Error in login, Error in Code, Server Side Error .",
        //     data: { error }
        // })
    }

}