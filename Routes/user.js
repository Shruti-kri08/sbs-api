
const express = require('express')
const Router=express.Router()

//login api
Router.post('/login',(req,res)=>{
    res.json({
        messege:"login done"
    })
})


//signup api
Router.post('/signup',(req,res)=>{
    res.json({
        messege:"signup done"
    })
})




module.exports = Router