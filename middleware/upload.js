const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 300,
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: function (req, file, callback) {
    if (file.mimetype == "application/pdf") {
      callback(null, true);
    } else {
      console.log("Somente arquivos do tipo PDF são suportados");
    }
  },
});

module.exports = upload;
