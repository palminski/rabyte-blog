const router = require('express').Router();
const { User, Post, Comment } = require('../../models'); //grabs from index file
//<><><><><><><><><><><><>
//GET-------------------
//Get all users
router.get('/', (req,res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//Get user by ID
router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'text_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'text_content', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
        ],
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            req.status(404).json({ message: "Uh Oh, User not found"});
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

//POST------------------
//Make new user
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//<><><><><><><><><><><><>
module.exports = router;