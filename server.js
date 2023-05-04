const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const posts = require('./controllers/posts')(app);
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

// Initialize Database
const db = require('./data/reddit-db');

// Middleware
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(express.urlencoded({ extended: true }));

// HOME
app.get('/', function (req, res) {
    res.render('home');
});

// RESOURCES //
app.post('/posts/new', (req, res) => {
    const post = new Post(req.body);

    // SAVE POST MODEL TO DATABASE
    post.save()
    .then(() => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
});

const Post = require('./models/post');

module.exports = (app) => {
    // CREATE
    app.post('/posts/new', (req, res) => {

        // POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE
        post.save(() => res.redirect('/'));
    });
};

// SHOW
app.get('/cases/:id', (req, res) => {
    const id = req.params.id;
    const caseData = fetchCaseData(id);

    res.render('cases-show', { case: caseData });
});

// EDIT
app.get('/cases/:id/edit', (req, res) => {

})

// UPDATE
app.put('/cases/:id', (req, res) => {

})

// DESTROY
app.delete('/cases/:id', (req, res) => {

})

// PORT
app.listen(3000);