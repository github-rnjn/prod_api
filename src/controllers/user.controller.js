const User = require("../models/user.model")
const userServices = require("../services/user.service")

const getAllUsers = async(req,res,next)=>{
    try {
        const users = await userServices.getAllUsersService();
        res.status(200).json({users});
    } catch (error) {
        next(error);
    }
};

const registerUser = async (req,res,next)=>{
    try {
        const user = await userServices.createUserService(req.body);
        user.password = undefined;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req,res,next)=>{
    try {
        const token = await userServices.loginService(req.body);
        res.status(200).json({token});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    registerUser,
    loginUser
};