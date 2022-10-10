const router = require('express').Router();
const { User, Post, Comment } = require('../../models'); //grabs from index file
//<><><><><><><><><><><><><><><><>

//GET--------------------------

//POST-------------------------
//create a new post
router.post('/',(req,res) => {
    Post.create({
        title: req.body.title,
        text_content: req.body.text_content,
        user_id: req.body.user_id //This will change to session ID once that is set up
    })
    .then(postData => {
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//<><><><><><><><><><><><>
module.exports = router;