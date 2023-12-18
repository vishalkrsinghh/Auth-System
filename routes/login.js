
import express from "express";
import loginController from "../controller/loginCont.js"

let router= express.Router();

router.post("/home",loginController);

export default router;