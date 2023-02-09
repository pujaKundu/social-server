const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("la la la")
})

module.exports = router;
