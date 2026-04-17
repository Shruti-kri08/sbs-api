
const express = require('express')
const Router = express.Router()
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')


//signup api
Router.post('/signup', async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email })
        if (user.length > 0) {
            console.log("user already signuped")
            return res.status(400).json({
                error: "email already registered"
            })
        }
        const hash = await bcrypt.hash(req.body.password, 10)

        const data = new User(
            {
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                password: hash

            }
        )
        const result = await data.save()
        console.log("new user signup");
        console.log(result);

        return res.status(200).json({
            fullName: result.fullName,
            email: result.email,
            phone: result.phone,

        })
    }
    catch (err) {

        res.status(500).json({
            err: "something is worng",
            error: err
        })
    }
})


//login api
Router.post('/login',async(req,res)=>{
    try{
        const data=await User.find({email:req.body.email})
        if( data.length==0){
            return res.status(400).json({error:"email not registered"})
        }
        const isMatch=await bcrypt.compare(req.body.password,data[0].password)
        if(!isMatch){
           return res.status(400).json({error:"password not matched"})
        }
        // console.log("you are logined");
        // console.log(data);
        
        //creating token
        const token=jwt.sign({
            fullName:data[0].fullName,
            email:data[0].email,
            userId:data[0]._id

        },'SBS-API-123',{expiresIn:"31d"})
        // console.log(token);

     res.status(200).json({
         fullName:data[0].fullName,
            email:data[0].email,
            userId:data[0]._id,
            token:token

        })
    }
    catch(err){
           res.status(500).json({
            err: "somthing is worng",
            error: err
        })
    }
})





module.exports = Router