const UserModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");


const checkValidUser=async(req,res)=>{
    const token =req.header("x-auth-token");
    if(!token)return res.json(false);
    const verified=jwt.verify(token,"raj1234")
    if(!verified)return res.json(false);
    const user=await UserModel.findById(verified.id);
    if(!user)return res.json(false);
    return res.json;
}


const userSave = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const User = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        console.log(name, email, password);     
        res.status(201).send({ msg: "Registration Successful" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send({ msg: "Registration Failed" });
    }
};

const userLogin= async(req,res)=>{
    const {email,password}=req.body;
    const User=await UserModel.findOne({
        email:email
    });

    if(!User)
    {
        res.status(404).json({
            message:"Email not found",
            status:"404 Not Found",

   
        })
        return;
    }
    const validPassword=await bcrypt.compare(  
        password,
        User.password
    )
    if(!validPassword)
    {
        res.status(404).json({
            message:"Invalid Password!",
            status:"404 Bad Request!", 

        }) 
        return;
    }
    const token=jwt.sign({id: User._id ,name:User.name, email:User.email},"raj1234");
    res.json({ token,user:{id: User._id, username:User.name}});

}


module.exports = {
    userSave,
    userLogin,
    checkValidUser
};
