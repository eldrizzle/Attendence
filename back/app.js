
const cors = require('cors')

const mongoose = require('mongoose')

const express = require('express');
const app = express()
app.use(cors())
mongoose.set('strictQuery', false);





//Connecting to database

mongoose.connect("mongodb+srv://rajat4661:Rajat1598@cluster0.ncboalk.mongodb.net/intershala",{useNewUrlParser:true}).then(()=>{
    console.log("DB Connected");
}).catch((err)=> console.log(err));

app.use(express.json())

//UserSchema

const userSchema = new mongoose.Schema({
    roll:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    checkin:{
        type:String,
        required:true
    },
    checkout:{
        type:String,
        required:true
    },
 
   


})







const User  = mongoose.model('USER',userSchema)






// routes

app.get('/',function(req, res){
    res.send("server started");
})




app.post('/register' , async (req,res)=>{
   
    const { roll , name , checkin , checkout} = req.body
    console.log(req.body.user)
    


   
        const user = new User({
                                          name: req.body.user.name,
                                          roll:req.body.user.roll,
                                          checkin:req.body.user.checkin,
                                         checkout:req.body.user.checkout,
                                       
                                      })

                                      
            //   const token  = jwt.sign({email:})
        
               user.save(function(err){
                 if(err){
                     console.log(err);
                  return res.status(422).json({error:"data not filled"});

                 }
                 else{
                     console.log("sucessfully saved to database")
                     return res.json({error:"saved to db"});

                 }
               })

  
    })
    

   

app.get('/attendence' , (req, res)=>{
    const projection = {_id:0, name:1}
    User.estimatedDocumentCount( (err, data)=>{
        let post = data;
        if(err){
        // res.status(500).send(err);
        console.log(err)
     }
        else{
            res.status(200).send({data});
            // console.log(post)
            // res.send(post)
            
        }
    })

   })



app.listen(5000 , function(req, res){
    console.log("server started at port 5000")
})