const { nanoid } = require('nanoid');
const URL = require('../Models/URL'); // <-- Make sure this line matches the actual file casing
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

module.exports={generateShortUrl,};