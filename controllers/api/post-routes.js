const router = require('express').Router();
const { User, Post, Comment } = require('../../models'); //grabs from index file
//<><><><><><><><><><><><><><><><>

//GET--------------------------
//Get all posts
router.get('/', (req,res) => {
    Post.findAll({

    })
    .then(postData => res.json(postData))
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//Get user by ID
router.get('/:id', (req,res) => {
    Post.findOne({
        include: [
            {
                model: Comment,
                attributes:['id', 'text_content', 'post_id', 'user_id', 'created_at'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            }
        ],
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: "Uh Oh, Post not found"});
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})
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