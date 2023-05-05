// Main models & dependencies
const express = require("express");
require("dotenv").config();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const checkAuth = require("./middleware/checkAuth");

// SETUP
const app = express();
app.use(express.static("public"));
app.use(cookieParser());

// Initialize Database
require("./data/reddit-db");

// Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: false }));
app.set("views", "./views");
app.use(express.json());
app.use(checkAuth);

// HOME
// app.get('/', (req, res) => {
//     res.render('home');
// });

// // RESOURCES //

// const Post = require('./models/post');

// app.post('/posts/new', (req, res) => {
//     const post = new Post(req.body);
//     post.save()
//     .then(() => res.redirect('/'))
//     .catch(err => console.log(err));
// });

// // SHOW
// app.get('/cases/:id', (req, res) => {
//     const id = req.params.id;
//     const caseData = fetchCaseData(id);

//     res.render('cases-show', { case: caseData });
// });

// // EDIT
// app.get('/cases/:id/edit', (req, res) => {

// });

// // UPDATE
// app.put('/cases/:id', (req, res) => {

// });

// // DESTROY
// app.delete('/cases/:id', (req, res) => {

// });

// CONTROLLERS
require("./controllers/posts")(app);
require("./controllers/comments")(app);
require("./controllers/auth.js")(app);
require("./controllers/replies.js")(app);
require("./controllers/auth.js")(app);

// app.get("/posts/new", (req, res) => {
//     res.render("posts-new");
// });

// PORT
app.listen(3000);

// TESTING
module.exports = app;