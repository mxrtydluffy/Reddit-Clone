const post = require('../models/post');
const Post = require('../models/post');

 module.exports = (app) => {
   app.post("/", (req, res) => {
    Post.find({}).lean()
    .then((posts) => res.render('posts-index', { posts }))
    .catch((err) => {
      console.log(err.message);
    })
  });

  // CREATE
  app.get('/post/new', (req, res) => {
    res.render("post-new");
  });

  app.post('/post/new', (req, res) => {
    console.log(req.body);
    const post = new Post(req.body);

    post.save()
      .then(() => res.redirect('/'))
      .catch(err => console.log(err));
  })

  // DISPLAY
  app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).lean()
    .then((post) => res.render('posts-show', { post }))
    .catch((err) => {
      console.log(err.message)
    })
  });   
 };