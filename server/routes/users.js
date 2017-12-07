const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
mongoose.Promise = require('bluebird');

router.get('/', (req, res) => {
    User
        .find({})
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(users => {
            !users ? res.status(404).json(users).send() : res.status(200).json(users);
        });
});

router.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser.save();
        .then(user => {
            res.status(201).json(user)
    });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(users => res.status(204).json(users))
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(users => res.status(200).json(users))
});






module.exports = router;