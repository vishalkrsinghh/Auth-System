
import jwt from "jsonwebtoken";
import userCollection from "../model/userCollectionSchema.js";
export default async (req, res) => {

    try {

        let tokenId = req.params.JwtToken;
        if (!tokenId) {
            return res.render("loginRegister");
        }
        let decodedDataOfToken = await jwt.verify(tokenId, process.env.JWT_SECRET_KEY);
        let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });
        if (isUser) {
            res.render("resetPage", {id:isUser._id});
        } else {
            req.flash('error', 'invalid User.')
            return res.reditect("/");  
            // return res.render("loginRegister");   ///// look at here if error
        }

    } catch (error) {
        // console.log(error);
        req.flash('error', 'Provide a valid URL.')
        return res.reditect("back");  
        // res.send("Provide a valid URL.")
        // res.status(500).json({
        //     Error: "Error In resetPage, Server Side Error .",
        //     data: { error }
        // })
    }
}