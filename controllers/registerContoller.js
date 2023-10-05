const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const usersBD = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data
    }
}

const registerUser = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({"Message": "username & password are erquired"});

    const userExists = usersBD.users.find((user) => user.username === username);
    if(userExists) return res.status(409).json({"message": `username ${username} is not avaialable`});
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
        id: uuidv4(),
        username,
        password: hashedPassword
    }
    usersBD.setUsers([...usersBD.users, newUser]);
    console.log(usersBD.users)
    res.status(201).json(newUser)   ; 
}


module.exports = {registerUser};
