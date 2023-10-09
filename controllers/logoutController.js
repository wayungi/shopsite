const User =  require('../model/user');  

const logout = async (req, res) => {
    // delete the accessToken  on client when implementing log out

    // check if refreshToken exists in cookie
    const cookies =  req.cookies
    if(!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    //check if refreshToken exist in db 
    const currentUser = await User.findOne({refreshToken}).exec(); // usersDB.users.find((user) => user.refreshToken === refreshToken);
    if(!currentUser) {
        res.clearCookie('jwt', { httpOnly: true });
        res.sendStatus(204); // no content
    }


    //if we reach here, then we do have a refresh token in the db and need to delete it
    // User.updateOne({username: currentUser.username}, {refreshToken: ''})
    currentUser.refreshToken = '';
    const result =  await currentUser.save();

    res.clearCookie('jwt', {httpOnly: true, secure: true}); // clear the cookie === refreshToken
    res.sendStatus(204); //No content

}

module.exports = { logout };
