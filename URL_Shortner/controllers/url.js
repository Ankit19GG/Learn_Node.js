const { nanoid } = require('nanoid');
const URL = require('../models/url'); // <-- Make sure this line matches the actual file casing
//=> "rxrsMW"

async function generateShortUrl(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});
    const shortId=nanoid(6);
    await URL.create({
        shortId:shortId,
        ogUrl:body.url,
        visitHistory:[],
    })

    return res.json({id:shortId});
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

module.exports={generateShortUrl,deleteUrl};