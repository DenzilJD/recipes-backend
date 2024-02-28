import express from 'express';
import { Recipe } from '../models/recipe.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find({}).populate('chef');
        return res.status(200).json(recipes);
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

//Get recipes by a particular chef
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await Recipe.find({ chef: id }).populate('chef');
        return res.status(200).json(recipe);
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

//Create recipe
router.post('/create', async (req, res) => {
    try {
        const name = req.body.name, chef = req.body.chef, ingredients = req.body.ingredients, steps = req.body.steps;
        if (!name || !chef || !ingredients || !steps)
            return res.status(400).send({ message: 'Send all parameters.' });
        const check = await Recipe.findOne({ name: name, chef: chef });
        if (check)
            return;
        const user = await Recipe.create({
            name: name,
            chef: chef,
            ingredients: ingredients,
            steps: steps,
        });
        return res.status(201).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        const name = req.body.name, chef = req.body.chef, ingredients = req.body.ingredients, steps = req.body.steps;
        const user = await Recipe.findOneAndUpdate({_id:req.body._id},{
            name: name,
            chef: chef,
            ingredients: ingredients,
            steps: steps,
        });
        return res.status(201).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const recipe = await Recipe.deleteOne({ _id: id });
        console.log(recipe);
        res.status(200).send('Deleted');
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;