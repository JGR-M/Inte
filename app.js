const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// connect to mongoose
mongoose.connect('mongodb://localhost/27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log('mongodb connected'))
.catch(err => console.log(err));

//load ideas model


//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// index route
app.get('/', (req, res) => {
    const title = 'Welcome1';
    res.render('index', {
        title: title
    });
});

// about route
app.get('/about', (req, res) => {
    res.render('about');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});