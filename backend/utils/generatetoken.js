const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({email: user.email , id: user._id, role: user.role} , process.env.JWT_KEY,{expiresIn: 604800}) // 7 days in seconds
}
module.exports.generateToken=generateToken;