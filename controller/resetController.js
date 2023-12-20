
import jwt from "jsonwebtoken"
import userCollection from "../model/userCollectionSchema.js";
import myDetails from "../config/ownerDetailNodemail.js";

export default async function (req, res) {

    try {
        let tokenFromClient = req.cookies.token;
        if (!tokenFromClient) {
            return res.render("loginRegister");
        }
        let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);
        let isUser = await userCollection.findOne({ _id: decodedDataOfToken._id });
        if (isUser) {

            let jwtTokenCode = jwt.sign(
                { name: isUser.name, _id: isUser._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "15m" }
            )
            let allDetails = {
                form: process.env.EMAIL,
                to: `${isUser.email}`,
                subject: `Password Reset`,
                text: ` Click the link to Reset your Password. https://authsystem-dcod.onrender.com:${process.env.PORT}/resetpassword/${jwtTokenCode} . the link expires in 15 minutes.`
            }

            myDetails.sendMail(allDetails, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("mail Sent " + " " + info.response + " " + allDetails.messageId);
                }
            })
            ///// create a pop up message and send it to back page.
            req.flash('success', 'Password Reset link send to your registerd Email id.')
            res.redirect("back");  //// if error try to give full url of render / page
            // res.send("Password Reset link send to your registerd Email id.")
        }
        /// if wrong token or token is present but empty then else block will run.
        else {
            return res.render("loginRegister");
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            Error: "Error In Sending Password Reset Link Mail, Server Side Error .",
            data: { error }
        })
    }
}