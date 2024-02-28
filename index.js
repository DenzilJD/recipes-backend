import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

const dot=dotenv.config();

const PORT=process.env.PORT||5000;
const MONGO_URI=process.env.MONGO_URI;

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    return res.send('Hello');
});

app.use('/users',userRoutes);
app.use('/recipes',recipeRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DB Connected.");
        app.listen(PORT, () => {
            console.log(`Running on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });