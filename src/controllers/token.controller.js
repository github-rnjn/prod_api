const tokenService = require("../services/token.service")

const refreshToken = async (req,res,next)=>{
    try {
        const accessToken = await tokenService.refreshTokenService(req.body);
        res.json({accessToken});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    refreshToken
};