import express from "express";
import router from "./routes/registerLoginRoute.js";

import cookieParser from 'cookie-parser'
import envConfig from "./config/envConfig.js";
import MongoDbConfig from "./config/mongoDbConfig.js";
import nodemailer from "nodemailer";
import { fileURLToPath } from 'url';
import path from "path";
import {dirname} from "path";
import expressLayouts  from "express-ejs-layouts"


const __filename = fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
let app = express();

let PORT= process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(expressLayouts); 
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"view"));
app.use(express.static(path.join(__dirname,"assets")));

app.use("/", router);

app.listen(PORT, ()=>{
    console.log("RUN");
})