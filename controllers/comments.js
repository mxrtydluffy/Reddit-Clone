const Post = require("../models/post");
const Comment = require("../models/comment");

// CREATE Comment
app.post('/posts/:postId/comments', async (req, res) => {
    try {
        if (req.user) {
            // INSTANTIATE INSTANCE OF MODEL
            const comment = new Comment(req.body);
            const userId = req.user._id;
            comment.author = userId;

            // SAVE INSTANCE OF Comment MODEL TO DB
            await comment.save();

            // REFER BACK TO POST
            const post = await Post.findById(req.params.postId);

            // COMMENT REFERING BACK TO POST
            post.comments.unshift(comment);

            await post.save();

            // REFER BACK TO ROOT
            res.redirect("/");
        } else {
            // UNAUTHORIZED USER
            return res.status(401);
        }
    } catch (err) {
        console.log(err);
    }
});