const router = require('express').Router()
const { UniqueConstraintError } = require('sequelize/dist');
const { UserModel } = require('../models')

router.post('/register', async (req, res) => {

    let { firstName, lastName, email, password } = req.body;

    try {
        await UserModel.create({
            firstName,
            lastName,
            email,
            password
        });

        res.status(200).json({
            message: "User successfully registered"
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
            message: "Email already in use",
    });
    } else {
        res.status(500).json({
        message: "User failed to register"
    })
    }
    }
});

module.exports = router;