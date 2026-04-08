const express=require('express')
const Router=express.Router()
const Contact=require('../Models/Contact')

// Router.post('/add-contact',(req,res)=>{
//     console.log(req.body);

//     const newContact=new Contact({
//         fullName:req.body.name,
//         phone:req.body.phone,
//         email:req.body.email,
//         address:req.body.add
//     })
//     newContact.save()
//     .then((result)=>{
//          console.log('data saved')
//          res.status(200).json({
//          msg:'data saved'
//          })
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).json({
//             error:"something is wrong"
//         })
        
//     })
// })

Router.post('/add-contact',async(req,res)=>{
    try{
        const newContact=new Contact({
        fullName:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.add  ,  
        gender:req.body.gender
        })
        const newData= await newContact.save();
        res.status(200).json({
            result:newData
        })


    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }

})

Router.get('/all-contact',async(req,res)=>{
    try{
        const allContact = await Contact.find().select("fullName phone email")
        res.status(200).json({
            contacts:allContact
        })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }

})

Router.get('/contactById/:id',async(req,res)=>{
    // console.log(req.params.id)
    try{
        const id=req.params.id;
        const data=await Contact.findById(id)
        res.status(200).json({
            contact:data
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
        
    }
})

Router.get('/gender/:g',async(req,res)=>{
    try{
        const data=await Contact.find({gender:req.params.g})
        res.status(200).json({
            contact:data
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }

})


Router.delete('/:d',async(req,res)=>{
    try{
        await Contact.deleteOne({_id:req.params.d})
        res.status(200).json({
            messege:"data deletd"
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
})


Router.delete('/byGender/:gender',async(req,res)=>{
    try{
       await Contact.deleteMany({gender:req.params.gender})
        // await Contact.deleteMany({find({gender:req.params.gender})})
        res.status(200).json({
            meg:"all coontact are delted of this gender"
        })
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err})
    }
})

module.exports=Router
