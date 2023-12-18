import express from "express";
import userCreateCont from "../controller/userCreate.js"

let router= express.Router();

router.post("/user", userCreateCont);

export default router;