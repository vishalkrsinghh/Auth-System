
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
            return res.reditect("/");  //  //  give here full address of render. if error comes. or try to give redirect back
            // return res.render("loginRegister");   ///// look at here if error
        }

    } catch (error) {
        console.log(error);
        // popup message and back to previous page 
        res.send("Provide a valid URL.")
        // res.status(500).json({
        //     Error: "Error In resetPage, Server Side Error .",
        //     data: { error }
        // })
    }
}