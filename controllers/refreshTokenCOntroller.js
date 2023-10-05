const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config(); 

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data
    }
}  

const handleRefreshToken = (req, res) => {
    // check for the refreshToken from cookies & set it's value because it was set in there & in db at login
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); //Unauthorized
    const refreshToken = cookies.jwt

    //compare refreshToken in cookie with refreshToken in db & find the user
    const currentUser = usersDB.users.find((user) => user.refreshToken === refreshToken);
    if(!currentUser) return res.sendStatus(403);// forbidden

    //decode the refreshToken to get the user  name
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
           if (err || currentUser.username !== decoded.username) return res.sendStatus(403);
           //generate a new access token and pass in back to the client
           const accessToken = jwt.sign({"username": decoded.username}, process.env.ACCESS_TOKEN, {expiresIn: '1h'});
           res.json({accessToken})
        }
    )
};

module.exports = { handleRefreshToken };
