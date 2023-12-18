
import express from "express";
import resetController from "../controller/resetController.js"
import saveNewPassController from "../controller/updatePassword.js"

let router = express.Router();

router.get("/reset", resetController);
router.post("/newpassword", saveNewPassController);

export default router;