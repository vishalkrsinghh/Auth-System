
import nodemailer from "nodemailer"

let email= process.env.EMAIL;
let Emailpassword=process.env.PASSWORD

export default nodemailer.createTransport({

    service: "gmail",
    auth: {
        user: email,
        pass: Emailpassword
    }
});