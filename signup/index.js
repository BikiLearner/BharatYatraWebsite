const express=require('express');
const path=require('path');
const mysql=require('mysql');
const app=express();
app.use(express.static(path.join(__dirname,'')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:'login'
});
connection.connect((err)=>{
    if(err) throw err;
    console.log('Database connected....');
})
app.post('/submit',(req,res)=>{
    const {name,email,password}=req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    const sql='INSERT INTO users(name,email,pass) VALUES (?,?,?)';
    let query=[name,email,password];
    connection.query(sql,query,(err,result)=>{
        if(err) throw err;
        console.log('VAlue inserted...');
    })
    res.sendFile(path.join(__dirname,'../FrontPage','FrontPage.html'));

})
app.listen(3000,()=>console.log('Port started at 3000'));
