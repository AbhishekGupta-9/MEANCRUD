import multer from "multer";
const path = require("path");
let fs = require("fs-extra");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = `./uploads/`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    let fileName = file.fieldname + "-" + Date.now() + "." + ext;

    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

// Pets Media
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/pets");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
export const uploads = multer({ storage: storage2 }).any();

// pets profilePic 
var storage3 = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/pets/petProfile");
  },
  filename: function (req, file, cb) {
    // console.log(file.mimetype);
    console.log("profilePic added successfully");

    const ext = file.mimetype.split("/")[1];

    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});
export const profilePic = multer({ storage: storage3 });
