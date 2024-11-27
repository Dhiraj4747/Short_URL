const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortId(req,res){
   const body = req.body;
   if(!body.url) return res.status(400).json({meassage:"url is required"})
   const shortID = shortid.generate();
   await URL.create({
      shortId:shortID,
      redirectURL:body.url,
      visitHistory:[],
   })
   return res.json({id:shortID});
}


//it is function develope for analytics route 

// async function handleGetAnalytics(req,res){
//    const shortId = req.params.shortId;
//    const result = URL.findOne({shortId})
//    return res.json({
//       totalClicks:result.visitHistory.length,
//       analytics:result.visitHistory,
//    })
// }

async function handleGetAnalytics(req, res) {
   const shortId = req.params.shortId;
   
   // Find the document using shortId
   const result = await URL.findOne({ shortId });
 
   // If result is null (shortId not found), return 404
   if (!result) {
     return res.status(404).json({ message: "Short URL not found" });
   }
 
   // Return analytics information if the document is found
   return res.json({
     totalClicks: result.visitHistory.length,
     analytics: result.visitHistory,
   });
 }

module.exports = {
   handleGenerateNewShortId,
   handleGetAnalytics
};
