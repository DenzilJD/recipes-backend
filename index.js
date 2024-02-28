import express from 'express';
import { PORT, mongoURI } from './config.js';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    return res.send('Hello');
});

app.use('/users',userRoutes);
app.use('/recipes',recipeRoutes);

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});

mongoose.connect(mongoURI)
    .then(() => {
        console.log("DB Connected.");
    })
    .catch((error) => {
        console.log(error);
    });