const express = require("express"); 
const router = express.Router();
const registrationController = require("../controllers/registration");

router.post("/register",(req,res)=>{
    console.log(req.body);
    let {  Name , Email , Usertype , Password } = req.body;
    registrationController.storeUserData( Name, Email, Usertype, Password, req ,res);
});
router.post("/usertype",(req,res)=>{
    console.log("bshjcd");
    registrationController.fetchUserType(req,res);
});


module.exports = router;