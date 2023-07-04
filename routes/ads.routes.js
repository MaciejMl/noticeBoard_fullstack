const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload');
const AdsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');

router.get('/ads', AdsController.getAll);

router.get('/ads/:id', AdsController.getSingle);

router.post(
  '/ads',
  authMiddleware,
  imageUpload.single('image'),
  AdsController.newAdd
);

router.delete('/ads/:id', AdsController.eraseAds);

router.put(
  '/ads/:id',
  authMiddleware,
  imageUpload.single('image'),
  AdsController.editAds
); // put or patch

router.get('/ads/search/:searchPhrase', AdsController.searchAds);

module.exports = router;
