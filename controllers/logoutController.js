const fs =  require('fs');
const path =  require('path');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){
        this.users = data
    }
}  

const logout = (req, res) => {
    // delete the accessToken  on client when implementing log out

    // check if refreshToken exists in cookie
    const cookies =  req.cookies
    if(!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    //check if refreshToken exist in db 
    const currentUser = usersDB.users.find((user) => user.refreshToken === refreshToken);
    if(!currentUser) {
        res.clearCookie('jwt', { httpOnly: true });
        res.sendStatus(204); // no content
    }

    //if we reach here, then we do have a refresh token in the db and need to delete it
    const otherUsers = usersDB.users.filter((user) => user.refreshToken !== currentUser.refreshToken);
    const updatedCurrentUser = {...currentUser, refreshToken: ''} // clear the refreshToken
    usersDB.setUsers([...otherUsers, updatedCurrentUser]);
    fs.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', {httpOnly: true, secure: true});
    res.sendStatus(204); //No content

}

module.exports = { logout };
