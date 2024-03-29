

import bcrypt from "bcrypt";
import userCollection from "../model/userCollectionSchema.js";

export default async function(req,res){

    try {

        let {newpassword,cnfnewpassword,submit}= req.body;
        if(newpassword!=cnfnewpassword){
            req.flash('error', 'Password and Confirm password is not same.')
            res.redirect("back")
            // res.send("Password and confirm password is not same");
        }else{
            let user=await userCollection.findOne({_id:submit})
            if(user){

                let saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashPassword = bcrypt.hashSync(newpassword, salt);
                //await userCollection.findByIdAndUpdate({_id:user._id},{password:hashPassword});
                await userCollection.findByIdAndUpdate(user._id,{password:hashPassword});

                req.flash('success', 'Password changed successfully!')
                res.redirect("https://authsystem-dcod.onrender.com/");
                // res.send(`Password Updated successfully. Go and Login Yourself, <a href="https://authsystem-dcod.onrender.com/">LINK</a>`);
                // res.redirect("/");
            }else{
                req.flash('error', 'invalid User.')
                res.redirect("back"); 
                // res.send("Invalid user id/invalid User.")
            }
        }
        
    } catch (error) {
                // console.log(error);
                res.status(500).json({
                    Error: "Error in Updating password, Server Side Error .",
                    data: { error }
                })
    }
}