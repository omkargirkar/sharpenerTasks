const path=require('path');


const getAllProducts=(req,res)=>{
    res.sendFile(path.join(__dirname,"..","view","product.html"));
}

const getProductById=(req,res)=>{
    const id=req.params.id;
    res.send(`Fetching product with ID:${id}`);
}

const addProduct=(req,res)=>{
    res.send("Adding a new product");
}

module.exports={
    getAllProducts,
    getProductById,
    addProduct
}