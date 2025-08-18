const express= require("express");
const {generateShortUrl, deleteUrl, getUrl}=require('../controllers/url');
const { model } = require("mongoose");
const URL = require("../models/url");
const router=express.Router();

router.route('/url').post(generateShortUrl);
router.route('/:shortId').delete(deleteUrl)
.get(async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: { visitHistory: { timestamp: Date.now() } }
        },
        { new: true }
    );
    if (!entry) return res.status(404).json({ error: "Not found" });

    entry.visitCount = entry.visitHistory.length;
    await entry.save();

    return res.redirect(entry.ogUrl);
});

module.exports = router;