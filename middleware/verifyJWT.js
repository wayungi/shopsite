const jwt =  require('jsonwebtoken');
require('dotenv').config();

const verifyJWT =  (req, res, next) => {
    const authHeader =  req.headers['authorization']; // access token 
    if(!authHeader) return res.sendStatus(401) //Unauthorized 
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if(err) return res.sendStatus(403) // forbiden 403 .json({"err": err}); 
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT;
