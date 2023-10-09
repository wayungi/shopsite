/* NOTE: this middleware only terminates the request if its not allowed with Unauthhorized but lets the request
 propagate if its allowed */

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) return res.sendStatus(401); //Unauthorized
        const rolesArray = [...allowedRoles]

        /* map will return an array of true/false returned by the includes(), we the look through this array to find 
        an instance of true which means the user is allowed to access this route */
        const result = req.roles.map((role) => allowedRoles.includes(role)).find((bool) => bool === true)
        if(!result) return res.sendStatus(401); //Unauthorized
        next()

    }
};

module.exports = verifyRoles
