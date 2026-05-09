const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const fileFilter = (req,file,cb)=>{
    if(!file.mimetype.startsWith("image")){
        return cb(new Error("Only images are allowed"),false);
    }
    cb(null,true);
};

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"prod-api-uploads",
        allowed_formats:["jpg","jpeg","png"]
    },
});

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 2* 1024 * 1024},
});

module.exports = upload;