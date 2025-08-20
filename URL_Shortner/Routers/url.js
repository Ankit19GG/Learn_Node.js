const express= require("express");
const {generateShortUrl, deleteUrl, Redirect, showAnalytics}=require('../controllers/url');
const { model } = require("mongoose");
const URL = require("../models/url");
const router=express.Router();

router.route('/url').post(generateShortUrl);
router.route('/:shortId').delete(deleteUrl)
.get(Redirect);

router.get('/url/analytics/:shortId',showAnalytics);

module.exports = router;    