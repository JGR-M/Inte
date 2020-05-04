const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// connect to mongoose
mongoose.connect('mongodb://localhost/27017', {
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

// body parser middleware ....                        access whatever is submited in form
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// index route
app.get('/', (req, res) => {
    const title = 'Welcome1';
    res.render('index', {
        title: title
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
    if(!req.body.phone){
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
        });
    } else {
        res.send('passed');
    }
});


// about route
app.get('/about', (req, res) => {
    res.render('about');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});