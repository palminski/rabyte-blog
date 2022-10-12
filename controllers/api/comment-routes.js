const router = require('express').Router();
const { User, Post, Comment } = require('../../models'); //grabs from index file
//<><><><><><><><><><><><>

router.post('/', (req,res) => {

    // if (req.session) {
        console.log(req.body)
        Comment.create(
            {
                text_content: req.body.text_content,
                user_id: req.session.user_id, //Replace with session ID
                post_id: req.body.post_id
            }
        )
        .then(commentData => {
            res.json(commentData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    // }
});

//<><><><><><><><><><><><>
module.exports = router;