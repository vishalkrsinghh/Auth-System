

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

        req.flash('success', 'Email verified Successfully!')
        res.redirect("https://authsystem-dcod.onrender.com/")
        // res.send(`Email verified Successfully, Go To <a href="https://authsystem-dcod.onrender.com/">LINK</a>  for Login. `);

    }else{
    
        req.flash('error', 'Invalid URL/Link.')
        res.redirect("https://authsystem-dcod.onrender.com/")
        // res.status(200).json({
        //     message:"Invalid URL/Link."
        // })
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