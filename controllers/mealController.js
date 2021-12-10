const Express = require('express')
const router = require('express').Router()
const {mealModel} = require('../models/mealModel')

router.get('/practice', (req, res) => {
    res.send('Practice Route is working!')
})

// create a Meal
// router.post('/create', async (req, res) => {

//     const {
//         foodName,
//         protein,
//         carbs,
//         fats,
//         kCal,
//     } = req body

//     console.log()

//     try{
//         const newMeal = await mealModel.create(mealEntry);
//         res.status(200).json(newMeal);
//     } catch (err) {
//         res.status(500).json({error: err});
//     }

// });

module.exports = router;