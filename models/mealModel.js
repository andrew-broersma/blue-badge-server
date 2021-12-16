const {DataTypes} = require("sequelize")
const db = require("../db")

const Macro = db.define("macro", {
    foodName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    protein: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    carbs: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    fats: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    kCal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER
    },
    mealCat: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Macro;
