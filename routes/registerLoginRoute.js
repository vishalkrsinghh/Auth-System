
import express from "express";
// import {showRegisterPage} from "../controller/showLoginSignupPage.js" // named import
import showRegisterPage from "../controller/showLoginSignupPage.js"    ///// default import.
import create from "./createUser.js";
import login from "./login.js";
import createUser from "../controller/createUserController.js";
import auth from "../middleware/authMiddleware.js";
import logoutUser from "../controller/logoutController.js";
import reset from "./reset.js";
import resetPswd from "../controller/resetPage.js";

let router= express.Router();

router.get("/",showRegisterPage);
router.use("/create", create);
router.get("/logout", auth, logoutUser);
router.use("/login", login);
router.get("/verify/:Jwt", createUser);
router.get("/resetpassword/:JwtToken", resetPswd);
router.use("/password", auth, reset);
export default router;

