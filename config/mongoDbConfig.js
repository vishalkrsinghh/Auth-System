import mongoose from "mongoose";
let URI= process.env.MONGO_URI;
export default mongoose.connect(URI).then(()=>{
    console.log("connection Success");
}).catch((err)=>{
    console.log(" Error in Connection Db ","  ",err);
})