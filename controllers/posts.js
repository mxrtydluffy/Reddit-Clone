const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const checkAuth = require("../middleware/checkAuth");

module.exports = (app) => {
  app.user(checkAuth);

  // ROOT PATH
  app.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).lean().populate("author");
    const currentUser = req.user;
    return res.render("posts-index", { posts, currentUser });
  } catch (err) {
    console.log(err.message);
  }
  });

  // CREATE
  app.get("/posts/new", (req, res) => {
    if (req.user) {
      res.render("posts-new");
    } else {
      return res.redirect("401").send("Unauthorized");
    }
  });

  // CREATE POST
  app.post("/post/new", checkAuth, async (req, res) => {
    try {
      if (req.user) {
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = userId;
        post.upVotes = [];
        post.downVotes = [];
        post.voteScore = 0;

        await post.save();

        const user = await User.findById(userId);
        user.posts.unshift(post);
        await user.save();

        // REDIRECT TO NEW EXISTING POST
        return res.redirect(`/posts/${post._id}`);
      } else {
        return res.status(401).send("Unauthorized");
      }
    } catch (err) {
      console.log(err.message);
    }
  });


  // DISPLAY
  app.get("/posts/:id", async (req, res) => {
    const currentUser = req.user;

    try {
      const post = await Post.findById(req.params.id)
        .populate("comments")
        .lean();
      return res.render("posts-show", { post, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // SUBREDDIT
  app.get("/n/:subreddit", async (req, res) => {
    const currentUser = req.user;

    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render("posts-index", { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // VOTE UP
  app.put("/posts/:id/vote-up", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.upVotes.push(req.user._id);
      post.voteScore += 1;
      await post.save();
      return res.status(200);
    } catch (err) {
      console.log(err);
    }
  });

  // VOTE DOWN
  app.put("/posts/:id/vote-down", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.downVotes.push(req.user._id);
      post.voteScore -= 1;
      await post.save();
      return res.status(200);
    } catch (err) {
      console.log(err);
    }
  });
};