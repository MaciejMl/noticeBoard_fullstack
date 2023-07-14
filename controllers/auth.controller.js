const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const sanitize = require('mongo-sanitize');
const getImageFileType = require('../utils/getImageFileType');
const path = require('path');
const deleteFile = require('../utils/deleteFile');

exports.register = async (req, res) => {
  try {
    let { login, passwd, tel } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    login = sanitize(login);
    passwd = sanitize(passwd);
    tel = sanitize(tel);
    avatar = sanitize(req.file.filename);

    const filePath = path.join(
      __dirname,
      `../client/public/img/avatars/${avatar}`
    );

    if (
      login &&
      typeof login === 'string' &&
      passwd &&
      typeof passwd === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const loginExist = await User.findOne({ login });
      if (loginExist) {
        deleteFile(filePath);
        return res
          .status(409)
          .send({ message: 'User with this login already exists' });
      }

      const user = await User.create({
        login,
        passwd: await bcrypt.hash(passwd, 10),
        avatar,
        tel,
      });
      res.status(201).send({ message: `User created ${user.login}` });
    } else {
      deleteFile(filePath);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    if (!req.file) {
      res.status(400).send({ message: 'No file attached' });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { login, passwd } = req.body;

    if (
      login &&
      typeof login === 'string' &&
      passwd &&
      typeof passwd === 'string'
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(passwd, user.passwd)) {
          req.session.user = user;
          res.status(200).send({ message: 'Login succesful' });
        } else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.json("Yeah! I'm logged");
};

exports.logout = async (req, res) => {
  const userLogin = req.session.user.login;

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'An error accurred during logout' });
    } else {
      res.send({ message: `User ${userLogin} is logged off` });
    }
  });
};
