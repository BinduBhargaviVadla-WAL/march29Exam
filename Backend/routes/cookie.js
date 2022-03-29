var express = require("express");
var router = express.Router();
router.get("/setcookie/:name/:age/:city", function (req, res) {
  let userData = {
    name: req.params.name,
    age: req.params.age,
    city: req.params.city,
  };
  res.cookie("UserDetails", JSON.stringify(userData));
  res.send(
    `cookie with name ${req.params.name} and value ${req.params.value} set`
  );
});
router.get("/viewcookies", function (req, res) {
  res.send(JSON.parse(req.cookies.UserDetails));
});
router.get("/delete/:name", function (req, res) {
  res.clearCookie(req.params.name);
  res.send(`cookie with name ${req.params.name} is defined`);
});
module.exports = router;
