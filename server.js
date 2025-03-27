const express=require('express');
const app=express();
const path=require('path');

app.get("/product",(req,res)=>{
    res.sendFile(path.join(__dirname,"view","product.html"));
})

app.listen(3000,()=>{
    console.log("Server is running");
})