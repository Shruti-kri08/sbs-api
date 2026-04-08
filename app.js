
const express = require('express')
const app = express()
const mongoose=require('mongoose')
const bodyParser = require('body-parser')

const userRoutes=require('./Routes/user')
const contactRoutes=require('./Routes/contact')

// mongoose.connect('mongodb+srv://Shruti:sk1234@sbs.8hgwmie.mongodb.net/?appName=SBS')
// .then(()=>{
//     console.log(('connected with database'))
// })
// .catch((e)=>{
//     console.log("Something is wrong");
    
//     console.log(e);
    
// })

const connectWithDatabase= async()=>{
    try{
       await mongoose.connect('mongodb+srv://Shruti:sk1234@sbs.8hgwmie.mongodb.net/?appName=SBS')
         console.log("connected with database");

    }
    catch(err){
        console.log("Something is wrong");
        
    }


    
}

connectWithDatabase()

// app.get('/student', (req, res) => {
//     //  console.log("app run")
//     res.status(200).json({
//         student: [
            

//             { name: "Amit", id: 103, age: 19 },
//             { name: "Neha", id: 104, age: 22 },
//             { name: "Rohan", id: 105, age: 23 },
//             { name: "Sneha", id: 106, age: 20 },
//             { name: "Karan", id: 107, age: 24 }]
//     })

// })

// app.post('/student',(req,res)=>{
//     console.log("post method run");
//         res.status(200)
    
// })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


app.use('/user',userRoutes)

app.use('/contact',contactRoutes)


module.exports = app