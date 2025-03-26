const getAllUsers=(req,res)=>{
    res.send("Fetching all users")
}

const getUserById=(req,res)=>{
    const {id}=req.params;
    res.send(`Fetching user with ID:${id}`);
}

const addUser=(req,res)=>{
    res.send("Adding a new user");
}

module.exports={
    getAllUsers,
    getUserById,
    addUser
}