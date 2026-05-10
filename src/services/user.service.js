const User = require("../models/user.model");
const AppError = require("../utils/appError");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {generateAccessToken,generateRefreshToken} = require("../utils/jwt");

const getAllUsersService = async (query)=>{
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;
    const skip = (page-1)*limit;
    const search = query.search || "";
    const filter = {
        name:{$regex:search,$options:"i"}
    };
    const users = await User.find(filter)
    .select("-password")
    .skip(skip)
    .limit(limit)

    const countUsers = await User.countDocuments(filter);
    return {countUsers,page,pages:Math.ceil(countUsers/limit),users};
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
    const isMatch = await bcryptjs.compare(password,userExists.password);
    if(!isMatch){
        throw new AppError("Password does not match",401);
    }
    const accessToken = generateAccessToken(userExists);
    const refreshToken = generateRefreshToken(userExists);
    userExists.refreshToken = refreshToken;
    await userExists.save();
    return {accessToken,refreshToken};
};

const updateUserService = async (userId,newData)=>{
    const {name,email} = newData;
    const existingUser = await User.findById(userId);
    if(!existingUser){
        throw new AppError("User not found",404);
    }
    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    await existingUser.save();
    existingUser.password = undefined;
    return existingUser;
};

const changePasswordService = async (userId,newData)=>{
    const {oldPassword,newPassword} = newData;
    if(!oldPassword || !newPassword){
        throw new AppError("All fields are required.",400);
    }
    if(oldPassword===newPassword){
        throw new AppError("Old and new password are same.",400);
    }
    const existingUser = await User.findById(userId);
    if(!existingUser){
        throw new AppError("User not found",404);
    }
    const isMatch = await bcryptjs.compare(oldPassword,existingUser.password);
    if(!isMatch){
        throw new AppError("Old password is incorrect",400);
    }
    existingUser.password = await bcryptjs.hash(newPassword,10);
    await existingUser.save();
    existingUser.password = undefined;
    return existingUser;
};

const logoutService = async (userId)=>{
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User doesn't exists.",404);
    }
    user.refreshToken = null;
    await user.save();
};

module.exports = {
    getAllUsersService,
    createUserService,
    loginService,
    updateUserService,
    changePasswordService,
    logoutService
};