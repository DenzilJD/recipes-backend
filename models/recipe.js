import mongoose from 'mongoose';
import { User } from './users.js';

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        chef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        },
        ingredients: [{
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
            },
        },],
        steps: [{
            type: String,
        }],
    }
);
export const Recipe = mongoose.model('Recipe', recipeSchema);