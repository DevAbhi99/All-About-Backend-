const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const db=require('../databaseConfig/db');

//signup logic

router.post('/signup', (req,res)=>{

 const {username, email, password}=req.body;

  bcrypt.genSalt(10, function(err, salt) {

    if(err){
        console.log(`Could not generare salt due to error ${err}`);
    }

    bcrypt.hash(password, salt, function(err, hash) {
        
        console.log(hash);

 const sql='insert into signup (username, email, password) values(?,?,?);';

db.query(sql, [username, email, hash], (error, results)=>{
    if(error){
        console.log(`Could not send data to the database due to error ${error}`);
        res.status(500).json({message:'Error'});
       return;
    }

    res.status(200).json({message:'Successful'});
});

    });
});
    
   

});



//login logic

router.post('/login', (req,res)=>{

const {email, password}=req.body;

const sql='select * from signup where email=?;';

db.query(sql, [email], (error, results)=>{
    if(error){
        res.status(500).json({message:'error'});
        return;
    }

    if (results.length===0){
        res.status.json/({mesage:'invalid email or password'});
    }

    const hashedPassword=results[0].password;

    bcrypt.compare(password, hashedPassword, function(err, result) {
    // result == true
    if(err){
        console.log(`error occurred while validating due to error ${err}`);
       res.status(200).json({message:'Error'});
        return;
    }

    if(result){
        res.status(200).json({message:'Successfully Logged in'});
    }
    else{
        res.status(400).json({messsage:'Could not login'});
    }
});


})

} )




module.exports=router;