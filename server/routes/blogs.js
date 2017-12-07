const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
require("mongoose").Promise = require("bluebird");

router.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where('/featured', { featured: true })
        .then(blogs => {
            res.status(200).json(blogs);

        });
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blogs => {
            !blogs ? res.status(404).send('bad') : res.status(200).json(blogs);

        });
});

router.post('/', (req, res) => {
    let userSpot = null;

    User
        .findById(req.query.userId)
        .then((user) => {
            userSpot = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();

        })
        .then(blog => {
            userSpot.blogs.push(blog);
            userSpot
            .save()
            .then(() => res.status(201).json(blog));
        })
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, {$set: req.body})
        .then(blogs => res.status(204).json(blogs));
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id) 
        .then(blogs => res.status(200).json(blogs))
});

// let dbUser = null;
// router.get('/', (req, res) => {
//     User
//         .findById(req.body.authorId)
//         .then(user => {
//             dbUser = user;
//             const newBlog = new Blog(req.body);
//             newBlog.author = user._id;
//             return newBlog.save();
//         })
//         .then(blog => {
//             dbUser.blogs.push(blog);
//             dbUser.save().then(() => res.status(201).json(blog));
//         });
// });


module.exports = router;