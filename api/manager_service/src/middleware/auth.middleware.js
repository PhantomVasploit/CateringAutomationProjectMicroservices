const jwt = require("jsonwebtoken");
// verify user token
module.exports.requireAuth = (req, res, next)=>{
  try {
    const bearerHeader = req.headers["authorization"];
    if(!bearerHeader){
      return res.status(401).json({"Message": "Authentication Header Not Set"});
    }else{
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      if(!token){
        return res.status(401).json({"Message": "Authentication Token unavailable"});
      }else {
        return  jwt.verify(token, process.env.SECRECT_KEY, (err, decodedToken)=>{
          if(err){
            return res.status(511).json({"Message": `User not authenticated: ${err.message}`});
          }
          if(decodedToken){
            return next();
          }
        });
      }
    }
  } catch (e) {
    console.log(`Error on the token  verification middleware: ${e.message}`);
  }
}
