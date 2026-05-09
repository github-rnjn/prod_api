const uploadService = require("../services/upload.service");

const uploadFile = (req,res,next)=>{
    try {
        const url = uploadService(req.file);
        res.json({
            url,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = uploadFile;