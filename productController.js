const getProducts=(req,res)=>{
    res.send("Fetching all products")
}

const getProductsByID=(req,res)=>{
    const {id}=req.params;
    res.send(`Fetching product with ID:${id}`);
}

const postProducts=(req,res)=>{
    res.send("New product added");
}

const editProducts=(req,res)=>{
    res.send("Put request called")
}

const deleteProducts=(req,res)=>{
    res.send("Delete request called")
}

module.exports={
    getProducts,
    getProductsByID,
    postProducts,
    editProducts,
    deleteProducts
}