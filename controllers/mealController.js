const Express = require('express')
const router = require('express').Router()
const {MealModel} = require('../models')

router.get('/practice', (req, res) => {
    res.send('Practice Route is working!')
})

//create a Meal
router.post('/create', async (req, res) => {
    const{foodName, protein, carbs, fats, kCal, mealCat} = req.body;
    const{id} = req.user;
    const mealEntry = {
        foodName,
        protein,
        carbs,
        fats,
        kCal,
        owner: id,
        mealCat // 1: Breaky, 2: Lunch, 3: DinDin, 4: SnackySnacks
    } 

    try{
        const newMeal = await MealModel.create(mealEntry);
        res.status(200).json(newMeal);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Find all meals for logged in user
router.get('/:id', async (req, res) => {
    const {id} = req.params

    try {
        const results = await MealModel.findAll({
            where: {owner: id}
        });
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({error: err})
    }
});


router.put("/update/:mealId", async (req, res) => {
    const {foodName, protein, carbs, fats, kCal, mealCat} = req.body;
    const entryId = req.params.mealId;
    const userId = req.user.id;

    const query = {
        where: {
            id: entryId,
            owner: userId
        }
    };
    const updatedMeal = {
        foodName: foodName,
        protein: protein,
        carbs: carbs,
        fats: fats,
        kCal: kCal,
        mealCat: mealCat
    };

    try{
        const update = await MealModel.update(updatedMeal, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

router.delete("/delete/:id", async (req, res) => {
    const ownerId = req.user.id;
    const mealId = req.params.id;

    try {
        const query = {
            where: {
                id: mealId,
                owner: ownerId
            }
        };

        await MealModel.destroy(query)
        res.status(200).json({message: "Journal Entry Removed"});
    }   catch(err) {
        res.status(500).json({error: err})
    }
});

module.exports = router;