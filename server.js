const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const posts = require('./controllers/posts')(app);
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

// Initialize Database
const db = require('./data/reddit-db');

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('home');
});


// RESOURCES //


// NEW
app.get('/cases/new', (req, res) => {
res.render('cases-new', { case: {} });
})

// CREATE
app.post('/cases', (req, res) => {
console.log("hiya")

const caseId = "3";
res.redirect(`/cases/${caseId}`)
});

// INDEX //

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

app.listen(3000);