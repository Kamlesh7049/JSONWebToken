const express=require("express");
const router=express.Router();

const userController=require("../controllers/userControllers");

router.post("/registration",userController.userSave)
router.post("/userlogin",userController.userLogin)





module.exports=router;