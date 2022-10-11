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
            res.status(404).json({ message: "Uh Oh, User not found"});
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
        //For session
        req.session.save(()=> {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: "No user found!" })
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword){
            res.status(400).json({ message: 'Password Incorrect!' });
            return;
        }

        //For session
        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({message: "logged in!"});
        });
    });
});

//logout 
router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    }
    else {
        res.status(404).end();
    }
})

//<><><><><><><><><><><><>
module.exports = router;