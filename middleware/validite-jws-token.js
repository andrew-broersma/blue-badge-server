const jwt = require("jsonwebtoken")
const { UserModel } = require("../models")

const validateSession = async (req, res, next) => {
    try {
        if (req.method == "OPTIONS") {
            console.log(req.headers);
            next()
        } else if (req.headers.authorization) {
            // console.log(req.headers)
            const {authorization} = req.headers
        
            const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined
            console.log(payload);
            // this is where our server checks to see if the token is valid for our application. it compares the secret
            // we have in the config variables to the secret that is buried in the token. This is used called in every
            // /meals path so that we can check to make sure they are a valid user or not.
            if (payload) {
                const foundUser = await UserModel.findOne({where: { id: payload.id}});
    
                if (foundUser) {
                    req.user = foundUser
                    next()
                } else {
                    res.status(400).json({
                        message: "User not found"
                    })
                }
            } else {
                res.status(401).json({
                    message: "Invalid Token"
                })
            }
        } else {
            res.status(403).json({
                message: "Forbidden"
            })
        }
    } catch (err) {
        res.json({
            message: `${err}`
        })
    }
}

module.exports = validateSession