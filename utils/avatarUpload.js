const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../client/public/img/avatars'));
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
  limits: {
    fieldSize: 1500 * 1024, // 1.5MB ; default is 1MB no need to write anything
  },
});

const avatarUpload = multer({ storage });

module.exports = avatarUpload;
