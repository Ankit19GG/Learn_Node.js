const express= require("express");
const {generateShortUrl}=require('../controllers/url');
const { model } = require("mongoose");
const router=express.Router();

router.post('/URL',generateShortUrl);

module.exports = router;