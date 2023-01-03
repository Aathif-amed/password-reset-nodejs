const { user,validate}= require("../models/users")
const express = require("express")
const router = express.Router();

router.post("/",async(req,res)=>{
    try {
        const {error}= validate(req.body);
        if(error){
            return res.status(401).send(error.details[0].message);
        }

        const User = await new user(req.body).save();
        res.status(200).send(User)

    } catch (error) {
        return res.status(401).send(error);
        
    }
})

module.exports = router;