const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const {generateAccessToken} = require("../utils/jwt");

const refreshTokenService = async (data)=>{
    const {refreshToken} = data;
    if(!refreshToken){
        throw new AppError("Refresh token required",401);
    }
    const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if(!user || user.refreshToken!==refreshToken){
        throw new AppError("Invalid refresh token",403);
    }
    const accessToken = generateAccessToken(user);
    return accessToken;
};

module.exports = {
    refreshTokenService
};