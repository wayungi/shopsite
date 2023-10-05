const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path =  require('path');


const usersBD = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data
    }
}

const registerUser = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({"Message": "username & password are required"});

    const userExists = usersBD.users.find((user) => user.username === username);
    if(userExists) return res.status(409).json({"message": `username ${username} is already taken`});
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
        id: uuidv4(),
        username,
        password: hashedPassword
    }
    usersBD.setUsers([...usersBD.users, newUser]);

    console.log(usersBD.users)

    //write the registered user to file
    fs.writeFile( path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersBD.users), err => {
        console.log(err)
        }
    )

    res.status(201).json(newUser)   ; 
}


module.exports = {registerUser};
