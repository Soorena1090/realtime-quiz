const jwt = require('jsonwebtoken');

const authMiddleware = (req,res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401);
    }
    const uncode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = uncode.id;
    next();
};

module.exports = authMiddleware