
import userCollection from "../model/userCollectionSchema.js";
import jwt from "jsonwebtoken";

export default async function(req,res,next){

    try {
        
        let tokenFromClient=req.cookies.token;
        if(tokenFromClient){
            let decodedDataOfToken=await jwt.verify(tokenFromClient,process.env.JWT_SECRET_KEY);
            /// check user is exist or not.
            let isUser =await userCollection.findOne({_id:decodedDataOfToken._id});

            if(isUser){
                next();
            }else{
                res.redirect("/");
                // res.status(400).json({
                //     message:"invalid Token/ Unauthorised"
                // }) 
            }

        }
        else{
            res.redirect("/");
            // res.status(400).json({
            //     message:"Token not found/ Unauthorised "
            // })
        }
    } catch (error) {
        res.status(500).json({
            message:"Authentication Failed/Unauthorised"
        })
    }
}