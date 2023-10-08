const bcrypt = require('bcrypt');
const User = require('../model/user');

const registerUser = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({"Message": "username & password are required"}); //bad request

    // check if username is already used, ensures that usernames are unique
    const userExists = await User.findOne({ username }).exec();
    if(userExists) return res.status(409).json({"message": `Account with username ${username} already exists`});// conflict
    
    const saltRounds = 10;
    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await User.create(
            { 
                username,
                password: hashedPassword // javascript key names can be with "" - not valid / without  "" - valid
            }
        );
        res.status(201).json({"success": result})
    }catch (err) {
        res.status(500).json({ 'message': err.message })
    }

}


module.exports = {registerUser};
