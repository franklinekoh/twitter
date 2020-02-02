require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    secret: process.env.APP_KEY,
    auth: {
        exp: process.env.AUTH_EXP || '1h'
    },
    post_upload_path: __dirname+'../../public/uploads/posts'
};