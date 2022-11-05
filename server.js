const express = require('express');
const app = express();
const dotenv = require('dotenv').dotenv;
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const {check,validationresultat} = require('express-validator');
const morgan = require('morgan');
const path = require('path');


// connection à la base de donnée
const mongoose = require('mongoose');
const connectioninternet = require('./db/db');
const connectionlocal = require('./db/db');

// les middelwairs
app.use(express.urlencoded({ extended:false}));
app.use(express.json());
app.use(session(
  {
    secret : 'ma cle secrete',
    saveUninitialized :true,
    resave :false
  }
));
app.use((req, res, next)=>
{
res.locals.message = req.session.message;
delete req.session.message;
next();
}
);


app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/images', express.static(path.join(__dirname, 'view/images')));
app.use(express.static('public'));
app.use(express.static('./public/uploads/images'));
// temmplet engine
app.set('view engine', 'ejs');

//les routes
app.use('', require('./routes/Candidat/candidat'));

app.listen(process.env.PORT || 3000, () => {
    console.log('ecoute sur le port ', process.env.PORT || 3000);
  });