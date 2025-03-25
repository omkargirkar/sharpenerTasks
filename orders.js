const express=require('express');

const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Ordeer List");
})

router.post("/",(req,res)=>{
    res.send("Order created");
})

module.exports=router;