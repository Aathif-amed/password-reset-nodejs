const mongoose =require("mongoose")


module.exports =connection = async()=>{
    try {

        await mongoose.connect(process.env.DB);
        console.log("Connected to Database");
    } catch (error) {
        console.log(error,"Database connection failed");
    }
} 