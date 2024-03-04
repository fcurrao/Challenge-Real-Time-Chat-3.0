var express = require("express");
var router = express.Router();
const { db } = require("../db/db");

/* GET messages listing. */
router.get("/:id", function (req, res, next) {
  db.all(
    "SELECT * FROM chats where sender = $uuid OR receiver = $uuid",
    { $uuid: req.params.id },
    (err, row) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        console.log(row);
        res.send(row);
      }
    }
  );
});

module.exports = router;
