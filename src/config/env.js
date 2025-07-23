require('dotenv').config();

module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expire: process.env.JWT_EXPIRES_IN,
    
    }
};