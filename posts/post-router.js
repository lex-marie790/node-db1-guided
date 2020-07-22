const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

//api/posts
router.get('/', (req, res) => {
    //SELECT * FROM posts;
    db.select('*')
    .from('posts')
    .then((postsArray) => res.status(200).json({ data:postsArray }))
    .catch( err => console.log(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    //SELECT * FROM posts WHERE id = id;
    db('posts')
    // .where("id", "=", id)
    // .where({ id: 1});
    .where('id',id)
    .first()
    .then(post => res.status(200).json({ data:post }))
    .catch( err => console.log(err));
});

router.post('/', (req, res) => {
    const postData = req.body;
    // INSERT INTO posts (fields...) VALUES (values...)
    db('posts')
    .insert(postData)
    .then(id => res.json(201).json({ data:id }))
    c
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    //UPDATE posts SET field = "new value" WHERE id = id;
    db('posts')
    .where('id', id)
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ data: count })
        } else {
            res.status(404).json({
                message: 'there was no record updated'
            })
        }
    })
    .catch( err => console.log(err));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    //DELETE posts SET field = "new value" WHERE id = id;
    db('posts')
    .where('id', id)
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({ data: count })
        } else {
            res.status(404).json({
                message: 'there was no record deleted'
            })
        }
    })
    .catch( err => console.log(err));

});

module.exports = router;