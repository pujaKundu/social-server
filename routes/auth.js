const router = require("express").Router();
const User = require("../models/User");

//Register
router.get("/register", async (req, res) => {
  const user = await new User({
    username: "jene",
    email: "jene@gmail.com",
    password: "1123456",
  });
  await user.save();
  res.send("ok")
});

module.exports = router;
