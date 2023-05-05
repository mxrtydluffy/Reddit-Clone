const User = require("../models/user");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

module.exports = (app) => {
  // SIGN UP FORM
  app.get("/sign-up", (req, res) => res.render("sign-up"));

  // SIGN UP POST
  app.post("/sign-up", async (req, res) => {
    try {
      // CREATE USER
      const user = new User(req.body);
      await user.save();
      // JWT Token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: "60 days",
      });
      // COOKIES
      res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
      res.redirect("/");
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        // KEY ERROR
        return res.status(409).send("Username already taken");
      }
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  // LOGOUT
  app.get("/logout", (req, res) => {
    res.clearCookie("nToken");
    res.redirect("/");
  });

  // LOGIN FORM
  app.get("/login", (req, res) => res.render("login"));

  // LOGIN
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // LOCATE USERNAME
        const user = await User.findOne({ username }, "Username Password");
        if (!user) {
            // USER CAN'T BE LOCATED
            return res.status(401).send({ message: "Wrong Username or Password" });
        }
        // Check the passowrd
    user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
            // DOES NOT MATCH
            return res
                .status(401)
                .send({ message: "Wrong Username or Passowrd" });
        }
        // Create a token
      const token = jwt.sign(
        { _id: user._id, username: user.username },
        process.env.SECRET, 
        {
          expiresIn: "60 days",
        }
      );
      // Set a cookie and redirect to root
      res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
      return res.redirect("/");
    });
    } catch (err) {
        console.log(err);
    } 
  });
};