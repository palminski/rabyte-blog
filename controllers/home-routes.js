const { Post, User, Comment } = require('../models');
const authenticate = require('../utils/auth');
const router = require('express').Router();

//Homepage
router.get('/',(req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {

        const posts = postData.map(post => post.get({plain:true}));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            user: req.session.username
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//single post
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'text_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id','text_content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        //
        if (!postData) {
            res.status(404).json({message: "No post found"});
            return;
        }
        const post = postData.get({plain: true});
        console.log('<><><>SINGLE PAGE<><><>');
        console.log(post);
        res.render('single-post', {post, loggedIn: req.session.loggedIn, user: req.session.username});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Edit post
router.get('/post/edit/:id',authenticate, (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'text_content',
            'created_at',
            'user_id'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id','text_content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        //
        
        if (!postData) {
            res.status(404).json({message: "No post found"});
            return;
        }
        const post = postData.get({plain: true});
        if (post.user_id !== req.session.user_id) {
            console.log('WRONG USER');
            res.redirect('/');
        }
        res.render('edit-post', {post, loggedIn: req.session.loggedIn, user: req.session.username});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Dashboard
router.get('/dashboard',authenticate,(req, res) => {
    if (!req.session.loggedIn) {
        console.log("REDIRECTED");
        res.redirect('/');
        return;
    }

    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {

        const posts = postData.map(post => post.get({plain:true}));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            user: req.session.username
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login',(req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login'); //name of template to use
});

router.get('/signup',(req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup'); //name of template to use
});

module.exports = router;