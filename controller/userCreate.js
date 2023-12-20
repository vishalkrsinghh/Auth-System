
import userCollectionSchema from "../model/userCollectionSchema.js";
import bcrypt from "bcrypt";
// import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import myDetails from "../config/ownerDetailNodemail.js";

export default async function (req, res) {
    // console.log(req.body);
    try {
        let { name, email, password, cnfpassword } = req.body;
        email = email.toLowerCase();
        let isUser = await userCollectionSchema.findOne({ email })
        if (isUser) {
            req.flash('success', 'Email already exist.')
            return res.redirect("/");  //// if error try to give full url of render.
            // return res.status(200).json({
            //     message: "Email already exist"
            // })
        }
        else {
            // create a jwt token by using email id, encrypted password and name all of them
            if (password == cnfpassword) {
                let saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashPassword = bcrypt.hashSync(password, salt);
                let jwtTokenCode = jwt.sign(
                    { name: name, email: email, paswd: hashPassword },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "10m" }
                )
                let allDetails = {
                    form: process.env.EMAIL,
                    to: `${email}`,
                    subject: `Email Verification`,
                    text: ` Click the link to verify your identity/Email. https://authsystem-dcod.onrender.com:${process.env.PORT}/verify/${jwtTokenCode} . the link expires in 10 minutes.`
                }

                myDetails.sendMail(allDetails, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("mail Sent " + " " + info.response + " " + allDetails.messageId);
                    }
                })

                req.flash('success', 'Go To Your Mail Account And Verify Yourself.')
                res.redirect("back");
                // res.send(`Go To Your Mail Account And Verify Yourself`);
            } else {
                req.flash('error', 'Password and Confirm password are not equal.')
                res.redirect("back");
                // res.status(400).json({
                //     Error: "Password and Confirm password are not equal.",
                //     data: {}
                // })
            }
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            Error: "Error in Sending Verification Mail, Server Side Error .",
            data: { error }
        })
    }

}