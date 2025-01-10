const express = require('express');
const routers = express.Router();
const { body,validationResult } = require('express-validator');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


routers.get('/register', (req, res) => {
    res.render('register');
})

routers.post('/register', 
    body('email').trim().isEmail().isLength({min: 15}),
    body('password').trim().isLength({min: 8}),
    body('username').trim().isLength({min:5}),
    async (req, res) => {

        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message: 'invalid data'
            });
        }

    const {username, email, password} = req.body;

    const hashpassword = await bcrypt.hash(password, 10)
    
    const newuser = await user.create({
        username : username,
        email : email,
        password : hashpassword
    })
    res.json(newuser);
})

routers.get('/login', (req,res)=>{
    res.render('login');    
})
routers.post('/login',  
        body('username').trim().isLength({min:5}),
        body('password').trim().isLength({min: 8}),
        async (req,res)=>{

            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array(),
                    message: 'invalid data'
                });
            }

            const {username, password} = req.body;

            const userfound = await user.findOne({
                username
            })

            if(!userfound){
                return res.status(400).json({
                    message: 'username or password is incorrect'
                });
            }
            
            const isMatch = await bcrypt.compare(password, userfound.password);

            if(!isMatch){
                return res.status(400).json({
                    message: 'username or password is incorrect'
                });
            }

            const token = jwt.sign({
                userId: userfound._id,
                email : userfound.email,
                username : userfound.username
            },process.env.JWT)

            res.cookie('token', token);

            res.send('logged in');


})

module.exports = routers;