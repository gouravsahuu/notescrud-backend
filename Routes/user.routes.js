const express = require("express");
const {UserModel} = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoutes = express.Router();

//User registration (email should be unique for every account)
userRoutes.post("/register",async (req,res) => {
    const {name,email,phone_number,password} = req.body;
    try{
        const existingUser = await UserModel.find({email});
        if(existingUser.length == 0){
            bcrypt.hash(password, 5, async (err,hash) => {
                const user = new UserModel({name,email,phone_number,password:hash});
                await user.save();
                res.send({"message":"User has been successfully registered"});
            })
        }
        else{
            res.send({"message":"A user with same email address is already present, please use different email to register"});
        }
    }
    catch(err){
        res.send({"message":"Something Went Wrong","error":err.message});
    }
})

//user login (this generates token for the user as well)
userRoutes.post("/login",async (req,res) => {
    const loginData = req.body;
    try{
        const user = await UserModel.find({email:loginData.email});
        if(user.length>0){
            bcrypt.compare(loginData.password, user[0].password, (err,result) => {
                if(result){
                    const token = jwt.sign({userID:user[0]._id},"secretkey",{expiresIn:"1h"});
                    res.send({"username":`${user[0].name}`,"message":"Login Successful","token":token,"help":"You can use this token to access protected routes"});
                }
                else{
                    res.send({"message":"Login Failed, Invalid Credentials"});
                }
            })
            
        }
        else{
            res.send({"message":"Login Failed, Invalid Credentials"});
        }
    }
    catch(err){
        res.send({"message":"Something Went Wrong","error":err.message});
    }
})

module.exports = {userRoutes};