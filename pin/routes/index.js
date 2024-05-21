var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");

// Configure passport and local strategy
passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// Routes
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/profile', isLoggedIn, function(req, res) {
  res.render("profile");
});

router.post('/register', function(req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
  });

  userModel.register(data, req.body.password)
    .then(function(registeredUser) {
      passport.authenticate("local")(req, res, function() {
        res.redirect('/profile');
      });
    })
    .catch(function(err) {
      // Handle registration errors
      console.error(err);
      // Render an error page or redirect to a specific route
      res.render('error');
    });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}));

router.get("/logout",(req, res)=> {
  req.logout();
  res.redirect('/');
});
//JWT TOKEN


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;