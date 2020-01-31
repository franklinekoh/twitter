
module.exports.login = async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            
        }catch (e) {
            next(e);
        }
};