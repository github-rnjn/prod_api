const AppError = require("../utils/appError")

const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError("Forbidden: Access Denied",403));
        }
        next();
    };
};

module.exports = authorizeRoles;