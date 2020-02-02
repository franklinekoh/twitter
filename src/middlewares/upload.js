const multer  = require('multer');
const uploadPath = require('../config').post_upload_path;

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG|GIF)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    // Other checks like file size can be done. but for the sake of time...
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null , new Date().getTime()+'-'+file.originalname);
    }
});

const upload = multer({ fileFilter: imageFilter, storage: storage });

module.exports.image = upload.array('photos', 4);