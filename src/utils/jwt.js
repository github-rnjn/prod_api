const jwt = require("jsonwebtoken");

const generateJWTToken = (user)=>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{"expiresIn":"1d"});
};

module.exports = generateJWTToken;