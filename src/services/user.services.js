const User = require("../models/user.model");
const AppError = require("../utils/appError");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/jwt");

const getAllUsersService = async ()=>{
    return await User.find().select("-password");
};

const createUserService = async (userData)=>{
    const {name,email,password,role} = userData;
    if(!name || !email || !password){
        throw new AppError("All fields are required.",400);
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new AppError("User already exists.",409);
    }
    const hashedPassword = await bcryptjs.hash(password,10);
    return await User.create({
        name,
        email,
        password:hashedPassword,
        role
    });
};

const loginService = async (userData)=>{
    const {email,password} = userData;
    if(!email || !password){
        throw new AppError("All fields are required.",400);
    }
    const userExists = await User.findOne({email});
    if(!userExists){
        throw new AppError("User does not exists.",404);
    }
    const token = generateToken(userExists);
    return token;
};

module.exports = {
    getAllUsersService,
    createUserService,
    loginService
};