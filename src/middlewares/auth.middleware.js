const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const authMiddleware = (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return next(new AppError("Unauthorized",401));
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new AppError("Invalid token",401));
    }
};

module.exports = authMiddleware;