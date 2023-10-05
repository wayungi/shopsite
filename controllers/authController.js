const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config(); // 


const usersBD = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data
    }
}



const login = (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(401).json({"message": "Fill in username & password fields"});

    const currentUser = usersBD.users.find((user) => user.username === username);
    if(!currentUser) return res.status(401).json({"message": `username ${username} does not exist`})

    const userExist = bcrypt.compare(password, currentUser.password);
    if(!userExist) return res.status(401).json({"message": "Inavlid password"});

    //when user exists, sign token
    const accessToken = jwt.sign({username: currentUser.username}, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
    const refreshToken = jwt.sign({username: currentUser.username}, process.env.REFRESH_TOKEN, { expiresIn: '1d' }); // saved to db

    //save refresh token with current user
    const otherUsers =  usersBD.users.filter((user) => user.username !== currentUser.username);
    const LoggedInUser = {...currentUser, refreshToken}
    usersBD.setUsers([...otherUsers, LoggedInUser]);

    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000}); // 1 day
    res.status(200).json({accessToken});
};

module.exports = { login };
