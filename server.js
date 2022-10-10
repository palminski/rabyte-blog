//Requirements for Sequelize
const sequelize = require('./config/connection');
//Requirements for Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
//Requirements for routers
const routes = require('./controllers/')
//Requrements for Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
//Requirements for path
const path = require('path');
//<><><><><><><><><><><><><><><><><><><><><><><><><><><>

//handlebars
app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');


//Allows for public folder to be used
app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routers
app.use(routes);

//Sets up sequelize and starts server
sequelize.sync({ force:false }).then(()=> {
    app.listen(PORT, () => console.log(`
=====================================================

            SERVER IS ON AT ${PORT}
    
=====================================================
    `));
});