const router = require('express').Router();
const { User, Post, Comment } = require('../../models'); //grabs from index file
const authenticate = require('../../utils/auth');
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
router.post('/',authenticate,(req,res) => {
    Post.create({
        title: req.body.title,
        text_content: req.body.text_content,
        user_id: req.session.user_id //This will change to session ID once that is set up
    })
    .then(postData => {
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT---------------------------
//update post
router.put('/:id', authenticate, (req,res) => {
    Post.update(
        {
            title: req.body.title,
            text_content:req.body.text_content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'post not found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE--------------------------
//delete post
router.delete('/:id', authenticate, (req,res) => {
    Post.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'post not found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//<><><><><><><><><><><><>
module.exports = router;