const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
const router=express.Router();
require('dotenv').config();

const secret=process.env.SECRET;

router.get('/sendToken', (req,res)=>{

    let token=jwt.sign({email:'karan@gmail.com'}, secret);

    res.cookie('token', token);

    res.send('Token sent');
});


router.get('/getToken', (req,res)=>{

    let data=jwt.verify(req.cookies.token, secret);

    console.log(data);

    res.send('Token fetched!');
})


module.exports=router;