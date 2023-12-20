
import jwt from "jsonwebtoken";
import userCollection from "../model/userCollectionSchema.js";
export default async (req,res)=>{   ///// default export

    // res.send("Register/Login Page");
    try {
        let token = req.cookies.token;
        // console.log(token)
        if (!token) {
           return res.render("loginRegister");
        }
        let decodedDataOfToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });

        if (isUser) {
           
            res.render(`home`,{name:isUser.name,email:isUser.email});
            // res.redirect("/login/home")
        }
        /// if wrong token or token is present but empty then else block will run.
        else{
            return res.render("loginRegister");
        }
    }
    catch (err) {
        res.render("loginRegister");
    }

}

// export {showRegisterPage}  ////// named export