const multer = require("multer");
const utils = require("../utils");
const { Path } = require("./presets");
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (req.route.path === "/upload/photos") {
      cb(null, Path.images);
    }
  },
  filename: function(req, file, cb) {
    const extension = file.mimetype.split("/");
    cb(null, utils.key() + "." + extension[1]);
  }
});
module.exports = app => {
  let upload = multer({ storage: storage });

  app.post("/upload/photos", upload.any(), (req, res) => {
    res.json({ file: "/photos/" + req.files[0].filename });
  });
};
