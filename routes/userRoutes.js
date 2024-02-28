import express from 'express';
import { User } from '../models/users.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users.map(t=>{
            const temp=t;
            temp.password='';
            return temp;
        }));
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

router.post('/validate', async (req, res) => {
    try {
        const email = req.body.email, password = req.body.password;
        const users = await User.findOne({ email: email });
        console.log(users);
        if (users) {
            if (users.password === password)
                return res.status(201).send(users);
            return res.status(401).send('Failure');
        }
        return res.status(401).send('Missing');
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        const name = req.body.name, email = req.body.email, password = req.body.password, cPassword = req.body.cPassword;
        if (!name || !email || !password || !cPassword)
            return res.status(400).send({ message: 'Send all parameters.' });
        if (password !== cPassword)
            return res.status(400).send({ message: 'Password and confirmation password mismatch.' });
        
        //Condition to check if user already exists, using email
        const check=await User.findOne({email:email});
        if(check)
            return;

        const user = await User.create({
            name: name,
            email: email,
            password: password,
        });
        return res.status(201).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;