const Post = require('../models/post');

 module.exports = (app) => {
   // CREATE
   app.post("/posts/new", (req, res) => {
     console.log(req.body);
   });
 };

 app.get('/', (req, res) => {
  Post.find({}).lean()
  .then((posts) => res.render('posts-index', { posts }))
  .catch((err) => {
    console.log(err.message);
  })
})