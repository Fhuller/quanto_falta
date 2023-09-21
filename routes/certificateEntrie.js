const router = require("express").Router();
const certificateEntrie = require("../models/certificateEntries");
const upload = require("../middleware/upload.js")

//CREATE
router.post("/", upload.single("file"), (req, res) => {
  data = req.body;

  let certificate = new certificateEntrie({
    name: data.name,
    description: data.description,
    date: Date.now(),
  });

  if (req.file) {
    certificate.file = req.file.path;
  }

  certificate
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
});

module.exports = router;
