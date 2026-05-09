const AppError = require("../utils/appError");

const uploadService = (uploadedFile)=>{
    if(!uploadedFile){
        return next(new AppError("No file uploaded",400));
    }
    return uploadedFile.path;
};

module.exports = uploadService;