const bcrypt = require('bcrypt');

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

    res.status(200).json({currentUser});
};

module.exports = login;
