const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

mongoose.Promise = global.Promise;
// connect to mongoose                              database
mongoose.connect('mongodb://localhost/intercodetinental', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log('mongodb connected'))
.catch(err => console.log(err));

//load user model
require('./models/User');
const User = mongoose.model('user');

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// how to add images
app.use(express.static('public'));    // to add images in site,, must use this



// body parser middleware ....                        access whatever is submited in form
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// index route
app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {
        title: title.localeCompare(ideas => ideas.toJSON())
    });
});

// contact form send link
app.get('/contactMe', (req, res) => {
    res.render('user/contact');           // goes to folder user and into file contact
});

//process form
app.post('/user', (req, res) => {
    let errors = [];

    if(!req.body.user){
        errors.push({text:'Please add your Name'});
    }
    if(!req.body.phone){                            // text will appear as popup
        errors.push({text:'Please add your Phone Number'});
    }
    if(!req.body.email){        
        errors.push({text:'Please add your E-mail'});
    }

     if(errors.length > 0){                 // this will make pop up windows, saying to please add something to the text
        res.render('user/contact', {
            errors: errors,
            user: req.body.user,
            phone: req.body.phone,
            email: req.body.email,
        });                              // if all is good and it submits correctly,, it says passed
    } else {
        const newUser = {
            user: req.body.user,
            phone: req.body.phone,
            email: req.body.email,
            message: req.body.message
        }
        new User(newUser)
        .save()
        .then(user => {
            res.redirect('/');
        })                                   // have to put another saying ''submit was successdful,, 
    }                                       // and back to main page
});


// about route
app.get('/about', (req, res) => {
    res.render('about');
});

// website page
app.get('/websites', (req, res) => {
    res.render('websites');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});








// udemy course
// node.js express, mongoDB, to deply
// traversmedia



// to make it connect to mongodb
// fixed       mongoose.connect('mongodb://localhost/intercodetinental', {
//             useUnifiedTopology: true,
//             useNewUrlParser: true

//             opened comand prompt,,, 
//             made sure everything was connected 



// if error happends on terminal
// just delete and then put it again in ConvolverNode,,, save and make sure all errors run