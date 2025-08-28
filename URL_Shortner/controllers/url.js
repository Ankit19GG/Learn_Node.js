const { nanoid } = require('nanoid');
const URL = require('../models/url'); // <-- Make sure this line matches the actual file casing
//=> "rxrsMW"

async function generateShortUrl(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).send("URL required");
    const shortId=nanoid(6);
    await URL.create({
        shortId:shortId,
        ogUrl:body.url,
        visitHistory:[],
    });

    const allUrls = await URL.find({});
    return res.render('home',{
        id:shortId,
        urls: allUrls, // <-- always pass urls
    })
}

async function Redirect(req,res) {
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
}

async function deleteUrl(req,res) {
    const shortId=req.params.shortId;
    await URL.findOneAndDelete({shortId});
    if(URL.findOne({shortId})){
        return res.json({'status':"success"})
    }
    else {
        return res.json('No record found')
    };
}

async function showAnalytics(req,res) {
    const shortId=req.params.shortId;
    entry= await URL.findOne({shortId});
    if (!entry) return res.status(404).Send(" Entry Not found" );
    return res.json({visitHistory: entry.visitHistory,
        visitCount: entry.visitCount});
}

module.exports={generateShortUrl,deleteUrl,Redirect,showAnalytics};