const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User =  require('../model/user');
 
const login = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(401).json({"message": "Fill in username & password fields"});

    const currentUser = await User.findOne({ username }).exec();// usersDB.users.find((user) => user.username === username);
    if(!currentUser) return res.status(401).json({"message": `username ${username} does not exist`})

    const userExist = await bcrypt.compare(password, currentUser.password);
    if(!userExist) return res.status(401).json({"message": "Inavlid password"});

    //get the roles associated to the signed in user
    const roles = Object.values(currentUser.roles) // get all the values from the roles object

    //when user exists, sign token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                username: currentUser.username, 
                roles
            }
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1m'}
    );

    const refreshToken = jwt.sign(
        {username: currentUser.username},
        process.env.REFRESH_TOKEN,
        { expiresIn: '1d' }
    ); 
    
    // saved to db
    currentUser.refreshToken = refreshToken;
    currentUser.save();
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000}); //{sameSite: 'None' secure: true }
    /*
        http, will be available in response header
        {secure: true} should  be added in production, it does not work in thunderclient
    */ 
    res.status(200).json({accessToken}); 
};

module.exports = { login };
