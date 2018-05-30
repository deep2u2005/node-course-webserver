const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var logInfo = `${now}: method: ${req.method}, path: ${req.url}`;

    console.log(logInfo);
    fs.appendFile('server.log', logInfo + '\n', (err) => {
        if (err) {
            console.log('Unable to log to the server');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        pageTxt: 'Welcome to Home page',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        pageTxt: 'About text here',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessege: 'Unable to handle request'
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Project Page',
        pageTxt: 'Project text here',
    });
});
app.listen(port, () => {
    console.log('server is running on port: ', port);
});
