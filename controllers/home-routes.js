const router = require('express').Router();

router.get('/',(req, res) => {
    res.render('homepage'); //name of template to use
});

router.get('/login',(req, res) => {
    res.render('login'); //name of template to use
});

module.exports = router;