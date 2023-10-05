const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersBD = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data
    }
}

const login = (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(401).json({"message": "Fill in username & password fields"});

    console.log(usersBD.users)
    const currentUser = usersBD.users.find((user) => user.username === username);
    console.log(currentUser)
    if(!currentUser) return res.status(401).json({"message": `username ${username} does not exist`})

    const userExist = bcrypt.compare(password, currentUser.password);
    if(!userExist) return res.status(401).json({"message": "Inavlid password"});

    res.status(200).json({currentUser});
};

module.exports = { login };
