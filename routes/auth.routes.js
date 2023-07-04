const express = require('express');
const router = express.Router();
const avatarUpload = require('../utils/avatarUpload');
const authMiddleware = require('../utils/authMiddleware');

const auth = require('../controllers/auth.controller');

router.post('/register', avatarUpload.single('avatar'), auth.register);
router.post('/login', avatarUpload.none(), auth.login);
router.get('/user', authMiddleware, auth.getUser);
router.delete('/user', authMiddleware, auth.logout);

module.exports = router;
