const jwt = require("jsonwebtoken")

// create a jwt
const maxAge = 3 * 24 * 60 * 60;
module.exports.createToken = (id)=>{
  return jwt.sign({id}, process.env.SECRECT_KEY, {
    expiresIn: maxAge
  });
}
