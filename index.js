const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');
const userRoutes=require('../BackendPractice/routes/route');
const userSession=require('../BackendPractice/session/sessions');


//middleware

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cookieparser());


app.use('/users', userRoutes);

app.use('/session', userSession);

const port=2500;


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})