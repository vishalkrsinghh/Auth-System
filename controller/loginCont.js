
import jwt from "jsonwebtoken";
import userCollectionSchema from "../model/userCollectionSchema.js";
import bcrypt from "bcrypt";

export default async function (req, res) {

    try {

        let { email, password } = req.body;

        let user = await userCollectionSchema.findOne({ email });

        if (user) {
            let dbPassword = user.password;
            let isPasswordEqual = bcrypt.compareSync(password, dbPassword);

            if(isPasswordEqual){

                let token = jwt.sign({_id:user._id}, process.env.JWT_SECRET_KEY, { expiresIn: "60m" })
                res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true }); 
                req.flash('success', 'Loged in success!')
                // res.render("home",{name:user.name,email:user.email});
                res.redirect("/");
            }else{
                res.status(400).json({
                    Error: "Email or Password are incorrect.",
                    data: {}
                })
            }

        } else {
            res.status(400).json({
                Error: "Account doesn't exist .",
                data: {}
            })
        }
        // console.log(req.cookies);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            Error: "Error in login, Error in Code, Server Side Error .",
            data: { error }
        })
    }
}