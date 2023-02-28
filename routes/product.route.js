const mongoose=require("mongoose");
const express=require("express");
const { Prodmodule } = require("../model/product.model");
const prodRooute=express.Router();

prodRooute.get("/",(req,res)=>{
    res.send("get route")
})

prodRooute.post("/products",async(req,res)=>{
    const data=req.body;
    try{
        const prod=new Prodmodule(data);
        await prod.save();
        res.send({msg:"Product added to the list !"})

    }catch(err){
        res.send({"msg":"Somthing went wrong !"})
    }
});

prodRooute.get("/products",async(req,res)=>{
    const filter=req.query.category
    const sort=req.query.sort;
    const limit=req.query.limit || 4;
    const skip=req.query.skip || 0;
    let s;
    if(sort=="asc"){
        s=1;
    }else{
        s=-1;
    }
    try{
        if(filter&&sort){
            const prod=await Prodmodule.find({category:filter}).sort({"postedAt": s}).skip(skip).limit(limit);
            res.send(prod); 

        }else if(filter){
            const prod=await Prodmodule.find({category:filter});
            res.send(prod);
        }
        else if(sort){
            const prod=await Prodmodule.find().sort({"postedAt": s}).skip(skip).limit(limit);      
            res.send(prod); 
        }else{
            const prod=await Prodmodule.find();      
            res.send(prod); 
        }
       
    }catch(err){
        res.send({mag:"Somthing went Worong !"})
    }
})

prodRooute.delete("/products/:id",async(req,res)=>{
    const ID=req.params.id;
    try{
        const data= await Prodmodule.findByIdAndDelete({_id:ID});
        res.send({msg:`Product data delete with ID:${ID}`})
        
    }catch(err){
        res.send({msg:"Somthing went wrong !"})
    }
})


module.exports={prodRooute}